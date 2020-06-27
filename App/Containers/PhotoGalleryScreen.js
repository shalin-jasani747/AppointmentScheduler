import { Container, Header, Title, Content } from 'native-base';
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LargeImage from '../Components/LargeImage';
import styles from './Styles/PhotoGalleryScreenStyle';

let data = [
  'https://www.gstatic.com/webp/gallery/1.jpg',
  'https://www.gstatic.com/webp/gallery/2.jpg',
  'https://www.gstatic.com/webp/gallery/3.jpg',
  'https://www.gstatic.com/webp/gallery/4.jpg',
  'https://www.gstatic.com/webp/gallery/5.jpg'
]
export default class PhotoGalleryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLargeImage: false,
      imageSource: '',
      selectedIndex: null
    }
  }

  showLargeImage({ pageX, pageY, locationX, locationY }, source, index) {
    const topLeftX = pageX - locationX
    const topLeftY = pageY - locationY
    this.setState({ topLeftX, topLeftY, showLargeImage: true, imageSource: source, selectedIndex: index })
  }

  hideImage() {
    this.setState({ showLargeImage: false, selectedIndex: null })
  }

  render() {
    const { showLargeImage, simpleHide, slideDownFade, imageSource, topLeftX, topLeftY } = this.state
    return (
      <Container>
        <Content contentContainerStyle={styles.galleryViewStyle}>
          {
            data.map((source, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={(e) => {
                    nE = e.nativeEvent
                    this.showLargeImage(nE, source, index)
                  }}
                  style={styles.imageStyle}
                >
                  <Image source={{ uri: source }} style={styles.imageAreaStyle} />
                </TouchableOpacity>
              )
            })
          }
          {showLargeImage && <LargeImage simpleHide={simpleHide} hideStyle={slideDownFade} source={imageSource} hideImage={this.hideImage.bind(this)} topLeftX={topLeftX} topLeftY={topLeftY} />}
        </Content>
      </Container>
    )
  }
}
