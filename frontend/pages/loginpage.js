import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import TextInputForm from './../components/textinputform';

import * as constants from './../config/config';
import TEXT from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

const Dimensions = require('Dimensions');

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.token = '';
    this.state = {
      showLoadingIndicator: false,
    };
  }

  onSubmitLogin(email, password) {
    this.setState({
      showLoadingIndicator: true,
      statusCode: undefined,
      statusMsg: undefined,
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
      .then((response) => {
        console.log('response: ', response);

        if (response.status === 200) {
          return response.json().then(responseJson => ({
            body: responseJson,
            token: response.headers.get('x-auth'),
          }));
        }
        const errorObj = { statusCode: response.status, statusMsg: response.statusText };
        throw errorObj;
      })
      .then((responseObj) => {
        console.log('API POST users/ responseObj: ', responseObj);
        this.token = responseObj.token;
        // this.saveToStorage(responseObj.token);
        AsyncStorage.setItem('@MathApp:token', this.token, () => {
          console.log('Token saved to local device storgage');
        });
        this.setState(
          { showLoadingIndicator: false },
          this.props.navigation.navigate('Menu', { tokenP: this.token }),
        );
      })
      .catch((e) => {
        this.setState({
          statusCode: e.statusCode ? e.statusCode : 901,
          statusMsg: e.statusCode ? e.statusMsg : e.toString(),
          showLoadingIndicator: false,
        });
        console.log('API POST users/ error: ', e);
      });
  }

  render() {
    const { width, height } = Dimensions.get('window');

    const showLoadingIndicator = this.state.showLoadingIndicator;
    const statusMsg =
      (!this.state.statusMsg && this.state.statusCode) === 400
        ? TEXT.loginpage.loginNotFound
        : this.state.statusMsg;
    return (
      <View style={styles.containerLoginPage}>
        <TextInputForm
          onSubmit={this.onSubmitLogin.bind(this)}
          buttonText="Einloggen"
          headline="Einfach einloggen"
          errorCode={this.state.statusCode}
          errorMsg={statusMsg}
        />
        {showLoadingIndicator ? (
          <View style={[styles.loadingIndicatorContainer, { height }, { width }]}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <React.Fragment />
        )}
      </View>
    );
    //  <View style={styles.container}>
    // {showLoadingIndicator ? (
    //   <View style={styles.loadingIndicatorContainer}>
    //     <ActivityIndicator size="large" />
    //   </View>
    // ) : (
    //   <React.Fragment />
    // )}

    //   <View style={[styles.overlay, { height }, { width }]} />
    // </View>
  }
}
