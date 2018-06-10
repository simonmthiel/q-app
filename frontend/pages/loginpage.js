import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import TextInputForm from './../components/textinputform';

import * as constants from './../config/config';
import TEXT from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.token = '';
    this.state = {
      email: '',
      password: '',
      statusMessage: 'bisher keine Aktion ausgeführt',
    };
  }

  onSubmitLogin(email, password) {
    this.setState({
      email,
      password,
    });
    const endpoint = `${constants.SERVER_URL}login`;
    console.log('endpoint login', endpoint);
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response =>
        response.json().then(responseJson => ({
          body: responseJson,
          token: response.headers.get('x-auth'),
        })))
      .then((responseObj) => {
        console.log('API POST users/ responseObj: ', responseObj);
        this.token = responseObj.token;
        this.setState({
          email: responseObj.body.email,
          id: responseObj.body._id,
        });

        this.props.navigation.navigate('Menu', { tokenP: this.token });
      })
      .catch(e => console.log('API POST users/ error: ', e));
  }

  render() {
    return (
      <TextInputForm
        onSubmit={this.onSubmitLogin.bind(this)}
        buttonText="Einloggen"
        headline="Einfach einloggen"
      />
    );
  }
}
