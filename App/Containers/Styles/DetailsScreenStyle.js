import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  contentPadding: {
    padding: 20
  },
  itemMargin: {
    marginLeft: 0
  },
  buttonStyle: {
    marginTop: 15,
    justifyContent: 'center'
  },
  errorStyle: {
    marginTop: 5,
    alignItems: 'flex-start',
  },
  errorText: {
    fontSize: 12,
    color: 'red'
  }
})
