import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import * as constants from './../config/config';
import TEXTS from './../config/text';

export default class QuestionCreationPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    console.log('token recieved on QuestionCreationPage: ', this.token);
    this.state = {
      //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjBmNWZiZTc1N2E1NzAwMTRlMzUwYjkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI3NzM0MjA3fQ.i8f1BTpL0DlcR32jGAXs2SNgFFef31u3iV16rUwk-Z4',
      statusMessage: 'bisher keine Aktion ausgeführt',
      qTitle: '',
      qDescription: '',
    }
  }
  postQuestion() {
    return fetch('https://radiant-tor-74073.herokuapp.com/questions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      },
      body: JSON.stringify({
	      title: this.state.qTitle,
	      description: this.state.qDescription,
      })
    })
    .then(response =>
      {
        console.log('API POST questions/ response', response);
        this.setState({
          statusMessage: response.status === 200 ? 'Deine Frage wurde erfolgreich veröffentlicht' : 'Es ist ein Fehler aufgetreten'
        });
          console.log('token retrieved from state 2: ', this.token);
        this.props.navigation.navigate('QuestionOverview', {tokenP: this.token});
      }
    );

  }

  render() {
  //  const { navigate } = this.props.navigation;

    return (
      <View style={{flex:1}}>
          <Text>Hier kannst du deine Frage stellen</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(qTitle) => this.setState({qTitle})}
            value={this.state.qTitle}
            placeholder='Titel'
            placeholderTextColor='#ccc'
          />
          <TextInput
            style={{height: 300, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(qDescription) => this.setState({qDescription})}
            value={this.state.qDescription}
            placeholderTextColor='#ccc'
            placeholder='Beschreibe deine Frage im Detail'
          />
          <Button
            onPress={this.postQuestion.bind(this)}
            title="Frage stellen"
            color="#841584"
            accessibilityLabel="Frage stellen"
          />
          <Text>Status: {this.state.statusMessage}</Text>
      </View>


    );
  }
}
