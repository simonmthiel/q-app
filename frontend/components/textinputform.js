import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import * as constants from './../config/config';
import TEXTS from './../config/text';

import * as styleSheet from './../styles/styles';
const styles = StyleSheet.create(styleSheet.global);

export default class TextInputForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmitButtonClick(){
    this.props.onSubmit(this.state.email, this.state.password);
  }

  render() {
    
    return(
      <View style={styles.container}>
        <Text
          style={styles.headline}>
          {this.props.headline}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder='E-Mail'
          placeholderTextColor='#ccc'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholderTextColor='#ccc'
          placeholder='Password'
        />
        <TouchableHighlight
         style={styles.buttonMenu}
         onPress={this.onSubmitButtonClick}
         underlayColor='#fff'>
           <Text style={styles.buttonText}>{this.props.buttonText}</Text>
       </TouchableHighlight>
      </View>
    );
  }


}
