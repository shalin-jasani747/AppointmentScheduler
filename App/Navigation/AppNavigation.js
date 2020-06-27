import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AppointmentScreen from '../Containers/AppointmentScreen';
import DetailsScreen from '../Containers/DetailsScreen';
import PhotoGalleryScreen from '../Containers/PhotoGalleryScreen';
import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  DetailsScreen: { screen: DetailsScreen },
  AppointmentScreen: { screen: AppointmentScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'AppointmentScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const homeTabs = createBottomTabNavigator({
  AppointmentStack: PrimaryNav,
  PhotoGalleryScreen: { screen: PhotoGalleryScreen },
}, {
  initialRouteName: 'AppointmentStack',
  tabBarOptions: {
    showIcon: false,
    tabStyle: {
      justifyContent: 'center'
    }
  }
})

export default createAppContainer(homeTabs)
