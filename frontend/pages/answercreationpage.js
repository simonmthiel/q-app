import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import * as constants from './../config/config';
import TEXTS from './../config/text';
import * as styleSheet from './../styles/styles';
import QuestionAnswerForm from './../components/questionanswerform';

const styles = StyleSheet.create(styleSheet.global);

export default class AnswerCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.q_id = this.props.navigation.getParam('q_id');
    this.state = {
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjBmNWZiZTc1N2E1NzAwMTRlMzUwYjkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI3NzM0MjA3fQ.i8f1BTpL0DlcR32jGAXs2SNgFFef31u3iV16rUwk-Z4',
      title: '',
      description: '',
      statusMessage: '',
    };
  }

  postAnswer(title, description) {
    const endpoint = `${constants.SERVER_URL}answers/${this.q_id}`;

    const req = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    };
    console.log('endpoint POST answer', endpoint);
    console.log('Request of API POST answer/:q_id ', req);

    return fetch(endpoint, req).then((response) => {
      console.log('API POST answer/:q_id response', response);
      this.setState({
        statusMessage:
          response.status === 200
            ? 'Deine Anwort wurde erfolgreich veröffentlicht'
            : 'Es ist ein Fehler aufgetreten',
      });
      console.log('token retrieved from state 2: ', this.token);
      // this.props.navigation.navigate('Menu', {tokenP: this.token});
    });
  }

  render() {
    //  const { navigate } = this.props.navigation;

    return (
      <QuestionAnswerForm
        onSubmit={this.postAnswer.bind(this)}
        buttonText="Frage beantworten"
        headline="Beantworte die Frage"
        placeholder1="Überschrift"
        placeholder2="Deine Antwort auf die Frage"
      />

      // <View style={{ flex: 1 }}>
      //   <Text>Hier kannst du auf die Frage antworten:</Text>
      //   <TextInput
      //     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      //     onChangeText={title => this.setState({ title })}
      //     value={this.state.title}
      //     placeholder="Titel deiner Antwort"
      //     placeholderTextColor="#ccc"
      //   />
      //   <TextInput
      //     style={{ height: 300, borderColor: 'gray', borderWidth: 1 }}
      //     onChangeText={description => this.setState({ description })}
      //     value={this.state.description}
      //     placeholderTextColor="#ccc"
      //     placeholder="Beschreibe die Lösung im Detail"
      //   />
      //   <Button
      //     onPress={this.postAnswer.bind(this)}
      //     title="Frage beantworten"
      //     color="#841584"
      //     accessibilityLabel="Frage beantworten"
      //   />
      //   <Text>Status: {this.state.statusMessage}</Text>
      // </View>
    );
  }
}
