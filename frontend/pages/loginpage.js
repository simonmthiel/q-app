import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import TextInputForm from './../components/textinputform';

import * as constants from './../config/config';
import TEXTS from './../config/text';

import * as styleSheet from './../styles/styles';
const styles = StyleSheet.create(styleSheet.global);

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = '';
    this.state = {
      email: '',
      password: '',
      statusMessage: 'bisher keine Aktion ausgeführt'
    };
  }

  onSubmitLogin(email, password) {
    this.setState({
      email: email,
      password: password
    });

    return fetch(constants.SERVER_URL + 'login', {
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
      });

      this.props.navigation.navigate('Menu', {tokenP: this.token});
    });
  }





  render() {
    console.log(this.state.email);
    console.log('styles', styles.global);
    // console.log('SERVER_URL ', constants.SERVER_URL);
    return (
        <TextInputForm
          onSubmit={this.onSubmitLogin.bind(this)}
          buttonText={'Einloggen'}
          headline={'Gib deine Logindaten ein'}
          >
        </TextInputForm>
    );
  }
}
