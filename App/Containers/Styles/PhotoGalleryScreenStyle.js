import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  galleryViewStyle: { flex: 1, justifyContent: 'space-evenly'  },
  imageStyle: { height: 100, width: width / 2, alignSelf: 'center'},
  imageAreaStyle: { flex: 1, backgroundColor: 'grey' }
})
