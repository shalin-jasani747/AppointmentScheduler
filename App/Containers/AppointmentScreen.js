import { Container } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Timeline from '../Components/Timeline';
import { Colors } from '../Themes';
// Styles
import styles from './Styles/AppointmentScreenStyle';


class AppointmentScreen extends Component {
  navigateToDetailsScreen(appointmentId) {
    this.props.navigation.navigate('DetailsScreen', {appointmentId})
  }
  render () {
    return (
      <Container>
        <View style={styles.viewStyle}>
          <Timeline
            onEventPress={appointment => this.navigateToDetailsScreen(appointment.id)}
            columnFormat="two-column"
            innerCircle={'dot'}
            data={this.props.appointments}
            circleSize={20}
            circleColor={Colors.curiousBlue}
            lineColor={Colors.curiousBlue}
            timeContainerStyle={styles.timeContainerStyle}
            timeStyle={styles.timeStyle}
            detailContainerStyle={styles.detailContainerStyle}
            descriptionStyle={{color: Colors.forestGreen}}
          />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = ({appointment}) => {
  return {
    appointments: appointment.payload,
  }
}

export default connect(mapStateToProps, null)(AppointmentScreen)
