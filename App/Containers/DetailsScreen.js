import { find, get, startCase } from 'lodash';
import { Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AppointmentActions from '../Redux/AppointmentRedux';
// Styles
import styles from './Styles/DetailsScreenStyle';

class DetailsScreen extends ValidationComponent {
  constructor(props) {
    super(props)
    const { appointments, navigation } = this.props
    const appointmentId = this.props.navigation.getParam('appointmentId')
    const appointment = find(appointments, { id: appointmentId })
    this.state = {
      firstName: get(appointment, 'firstName', ''),
      lastName: get(appointment, 'lastName', ''),
      phoneNumber: get(appointment, 'phoneNumber', ''),
      description: 'Occupied',
      isSlotAvailable: false
    }
    this.validationRules = {
      firstName: {
        label: 'First Name',
        required: true
      },
      lastName: {
        label: 'Last Name',
        required: true
      },
      phoneNumber: {
        label: 'Phone Number',
        required: true
      },
    }
  }

  goBack() {
    this.props.navigation.goBack()
  }

  renderHeader() {
    return (
      <Header>
        <Left><Icon name="ios-arrow-back" onPress={() => this.goBack()} /></Left>
        <Body><Title>Details</Title></Body>
        <Right />
      </Header>
    )
  }

  updateValues(fieldName, value) {
    this.validate(this.validationRules)
    this.setState({
      [fieldName]: value
    })
  }
  renderInputError(fieldName) {
    return (
      <View style={styles.errorStyle}>
        <Text style={styles.errorText}>
          {this.getErrorsInField(fieldName)}
        </Text>
      </View>
    );
  }

  renderInput(fieldName) {
    const value = get(this.state, fieldName, '')
    return (
      <>
        <Item inlineLabel style={styles.itemMargin}>
          <Label>{startCase(fieldName)}:</Label>
          <Input value={value} onChangeText={(value) => this.updateValues(fieldName, value)}
            autoCorrect={false}
            maxLength={10}
            keyboardType={(fieldName === 'phoneNumber') ? 'phone-pad' : 'default'}
          />
        </Item>
        {this.isFieldInError(fieldName) && this.renderInputError(fieldName)}
      </>
    );
  }

  saveDetails = () => {
    const appointmentId = this.props.navigation.getParam('appointmentId')
    const appointment = find(this.props.appointments, { id: appointmentId })

    if (!this.validate(this.validationRules)) {
      this.forceUpdate()
      return
    }
    const updatedAppointment = {
      ...appointment,
      ...this.state
    }
    this.props.updateAppointment(updatedAppointment)
    this.goBack()
  }

  renderButtons() {
    return (
      <>
        <Button style={styles.buttonStyle} bordered primary onPress={() => this.saveDetails()}>
          <Text> Save </Text>
        </Button>
        <Button style={styles.buttonStyle} bordered light onPress={() => this.goBack()}>
          <Text> Cancel </Text>
        </Button>
      </>
    )
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}
        <Content style={styles.contentPadding}>
          <Form>
            {this.renderInput('firstName')}
            {this.renderInput('lastName')}
            {this.renderInput('phoneNumber')}
          </Form>
          {this.renderButtons()}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = ({ appointment }) => {
  return {
    appointments: appointment.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAppointment: (paylaod) => dispatch(AppointmentActions.updateAppointment(paylaod))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)
