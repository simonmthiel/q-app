import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import TextInputForm from './../components/textinputform';

import * as constants from './../config/config';
import TEXTS from './../config/text';

export default class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);
    //const { navigate } = this.props.navigation;
    // const { navigation } = this.props;
    this.test = this.props.navigation.getParam('testP', 'NO-ID');
    this.token = '';
    // const { params} = this.props.navigation.state;
    //this.liftUpState = navigation.props.liftUpState.bind(this);
    this.state = {
      email: '',
      password: '',
      statusMessage: 'bisher keine Aktion ausgeführt'
    };
  }

  componentDidMount() {
    console.log('this.test', this.test);
    try {
       AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
       console.log('testSaving successfully saved');
    } catch (error) {
      console.log('testSaving failed', error);
    }

    // params.liftUpState();

  //  try {
  //    AsyncStorage.setItem('@Login:test', 'testSaving');
  //    console.log('testSaving successfully saved');
  //  } catch (error) {
  //    console.log('testSaving failed', error);
  //  }
  }

  onSubmitRegistration(email, password) {
    this.setState({
      email: email,
      password: password
    });

    return fetch('https://radiant-tor-74073.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response =>
      response.json()
      .then(responseJson => ({
        body: responseJson,
        token: response.headers.get('x-auth')
      })
    ))
    .then((responseObj) => {
      console.log('API POST users/ responseObj: ', responseObj);
      this.token = responseObj.token;
      this.setState({
        email: responseObj.body.email,
        id: responseObj.body._id,
        //token: responseObj.token // work around as long as below code is not working
      });

      this.props.navigation.navigate('Menu', {tokenP: this.token});


  //    try {
  //      AsyncStorage.setItem('@Login:token2', responseObj.token);
  //      console.log('Token successfully saved: ', responseObj.token);
  //    } catch (error) {
  //      console.log('Error while saving token to local storage', error);
  //    }
    });
  }





  render() {
  //  const { navigate } = this.props.navigation;
    console.log(this.state.email);
    return (
      <View style={{flex:1}}>
        <TextInputForm
          onSubmit={this.onSubmitRegistration.bind(this)}
          buttonText={'Registration'}
          headline={'Hier kannst du dich registrieren'}>
        </TextInputForm>
      </View>


    );
  }
}
