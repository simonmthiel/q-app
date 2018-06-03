import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// import Registration from './registration';

export class test extends React.Component {



  render() {
  //  const { navigate } = this.props.navigation;
    console.log(this.state.email);
    return (
      <View style={{flex:1}}>

          <Text>Deine NutzerID</Text>

      </View>


    );
  }
}



/*
const App = StackNavigator({
  Home: { screen: HomeScreen},
  Profile: { screen: ProfileScreen},
});
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
