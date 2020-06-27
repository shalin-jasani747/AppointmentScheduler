import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from './Styles/LargeImageStyle'

const { height, width } = Dimensions.get('window');

export default class LargeImage extends Component {
  constructor(props){
    super(props)
    this.state = {
      animateImageX: new Animated.Value(0),
      animateImageY: new Animated.Value(0),
      scaleImageX: new Animated.Value(1),
      scaleImageY: new Animated.Value(1),
      viewOpacity: new Animated.Value(0),
      scaleViewX: new Animated.Value(1),
      scaleViewY: new Animated.Value(1)
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.viewOpacity,
        {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.animateImageY,
        {
          toValue: height / 2 - (this.props.topLeftY + 50),
          duration: 200,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.animateImageX,
        {
          toValue: width / 2 - (this.props.topLeftX + width / 4),
          duration: 200,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.scaleImageX,
        {
          toValue: 2,
          duration: 100,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.scaleImageY,
        {
          toValue: (height / 3) / 100,
          duration: 100,
          useNativeDriver: true
        }
      )
    ]).start()
  }

  animateBack() {
    Animated.parallel([
      Animated.timing(
        this.state.animateImageY,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.animateImageX,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.scaleImageX,
        {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.scaleImageY,
        {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }
      )
    ]).start(() => this.props.hideImage())
  }

  render() {
    const { source, topLeftY, topLeftX } = this.props
    const { animateImageX, animateImageY, scaleImageX, scaleImageY, viewOpacity, scaleViewX, scaleViewY } = this.state
    return (
      <Animated.View style={{ height, width, backgroundColor: 'rgba(0,0,0,0.9)', position: 'absolute', top: 0, opacity: viewOpacity, transform: [{ scaleX: scaleViewX }, { scaleY: scaleViewY }] }} >
        <Animated.Image
          resizeMode='cover'
          source={{ uri: source }}
          style={{ top: topLeftY, left: topLeftX, height: 100, width: width / 2, transform: [{ translateX: animateImageX }, { translateY: animateImageY }, { scaleX: scaleImageX }, { scaleY: scaleImageY }] }}
        />
        <TouchableOpacity
          onPress={() => this.animateBack()}
          style={styles.closeButtonStyle}
        >
          <Text style={{ color: 'lightgrey' }}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}
