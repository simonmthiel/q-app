import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

import * as constants from './../config/config';
import TEXTS from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class QuestionAnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.state = {
      textfield1: '',
      textfield2: '',
    };
  }

  onSubmitButtonClick() {
    this.props.onSubmit(this.state.textfield1, this.state.textfield2);
  }

  render() {
    const customButtonStyle = styleSheet.global.buttonMenu;
    delete styleSheet.global.buttonMenu.width;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>{this.props.headline}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ textfield1: text })}
          value={this.state.textfield1}
          placeholder={this.props.placeholder1}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.textInputLarge}
          onChangeText={text => this.setState({ textfield2: text })}
          value={this.state.textfield2}
          placeholderTextColor="#ccc"
          placeholder={this.props.placeholder2}
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
