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

export default class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    // const { navigate } = this.props.navigation;
    // const { navigation } = this.props;
    this.test = this.props.navigation.getParam('testP', 'NO-ID');
    this.token = '';
    // const { params} = this.props.navigation.state;
    // this.liftUpState = navigation.props.liftUpState.bind(this);
    this.state = {
      showLoadingIndicator: false,
    };
  }

  onSubmitRegistration(email, password) {
    this.setState({
      showLoadingIndicator: true,
      statusCode: undefined,
      statusMsg: undefined,
    });

    return fetch('https://radiant-tor-74073.herokuapp.com/users', {
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
        AsyncStorage.setItem('@MathApp:token', this.token, (err) => {
          console.log('Token saved to local device storgage:', err);
        });
        this.setState(
          { showLoadingIndicator: false },
          this.props.navigation.navigate('Menu', { tokenP: this.token }),
        );
        // token: responseObj.token // work around as long as below code is not working
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
    //  const { navigate } = this.props.navigation;
    const { width, height } = Dimensions.get('window');

    const showLoadingIndicator = this.state.showLoadingIndicator;
    const statusMsg =
      !this.state.statusMsg && this.state.statusCode === 400
        ? TEXT.registrationpage.errorDuplicate
        : this.state.statusMsg;
    return (
      <View style={{ flex: 1 }}>
        <TextInputForm
          onSubmit={this.onSubmitRegistration.bind(this)}
          buttonText="Jetzt Registrieren"
          headline="Hier kannst du dich registrieren"
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
  }
}
