import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import * as constants from './../config/config';
import TEXTS from './../config/text';

import ErrorContainer from './errorcontainer';

import * as styleSheet from './../styles/styles';

const globalStyles = styleSheet.global;
const styles = StyleSheet.create(styleSheet.global);

export default class TextInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmitButtonClick() {
    this.props.onSubmit(this.state.email, this.state.password);
  }

  render() {
    const customButtonStyle = styleSheet.global.buttonMenu;
    delete styleSheet.global.buttonMenu.width;
    const showErrorContainer = !(!this.props.errorCode || this.props.errorCode === 200);

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>{this.props.headline}</Text>
        {showErrorContainer ? (
          <ErrorContainer errorCode={this.props.errorCode} errorMsg={this.props.errorMsg} />
        ) : (
          <React.Fragment />
        )}
        <TextInput
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="E-Mail"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholderTextColor="#ccc"
          placeholder="Password"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmitButtonClick}
          underlayColor="#fff"
        >
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
