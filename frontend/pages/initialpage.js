import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import * as constants from './../config/config';
import TEXTS from './../config/text';

export default class InitialPage extends React.Component {

  constructor(props) {
    super(props);
  }

componentDidMount() {
  console.log('InitialPage loaded');
};

  liftUpState() {
  }

  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => {this.props.navigation.navigate('Login')}}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Login</Text>
          </TouchableHighlight>

           <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => {this.props.navigation.navigate('Registration')}}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Registieren</Text>
          </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },

  buttonMenu:{
    width: 250,
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000'
  },
  submitText:{
      fontSize: 18,
      fontWeight: 'bold',
      color:'#333',
      textAlign:'center',
  }
});
