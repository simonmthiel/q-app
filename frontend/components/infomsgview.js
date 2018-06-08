import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

import * as constants from './../config/config';
import TEXTS from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class InfoMsgView extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.props.onButtonClick();
  }

  // render optional button in case button text has been defined by the parent component
  renderButton() {
    if (this.props.buttonText) {
      return (
        <TouchableHighlight style={styles.button} onPress={this.onButtonClick} underlayColor="#fff">
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  render() {
    return (
      <View>
        <Text style={styles.description}>{this.props.infoMsg} </Text>
        {this.renderButton()}
      </View>
    );
  }
}
