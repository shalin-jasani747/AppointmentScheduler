import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  viewStyle: {
    flex: 1,
    padding: 15,
    paddingTop: 40
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#ff9797',
    color: 'white',
    padding: 8,
    borderRadius: 13,
    overflow: 'hidden'
  },
  detailContainerStyle: {
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#BBDAFF',
    borderRadius: 10,
  },
  timeContainerStyle: {
    minWidth: 52
  }
})
