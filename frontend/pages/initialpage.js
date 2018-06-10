import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import * as constants from './../config/config';
import TEXT from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

import utilFunctions from './../utils/utilFunctions';

export default class InitialPage extends React.Component {
  componentDidMount() {
    console.log('InitialPage loaded');
  }

  // utilFunctions.logger('sdabad asdf asdf');
  render() {
    const customDebuggingButton = {
      width: 250,
      marginBottom: 20,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: '#ff0',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#f0f',
    };

    // console.log('styleSheet.global.buttonMenu 1: ', styleSheet.global.buttonMenu);
    // styleSheet.global.buttonMenu.backgroundColor = '#fff';
    //
    // delete styleSheet.global.buttonMenu.backgroundColor;
    // console.log('styleSheet.global.buttonMenu 2: ', customDebuggingButton);
    // console.log(
    //   'style styleSheet.global.buttonMenu.backgroundColor: ',
    //   styleSheet.global.buttonMenu.backgroundColor,
    // );
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.headline}>Willkommen bei der Mathe-App</Text>
        <Text style={styles.descriptionCenter}>
          In der neuen App erhälst du ganz einfach Antworten auf deine Matheprobleme.
        </Text>
        <Text style={styles.descriptionCenter}>
          Probier es direkt aus und poste deine erste Frage
        </Text>
        <View style={{ height: 30 }} />
        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
          underlayColor="#fff"
        >
          <Text style={styles.buttonText}>Einloggen</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonMenu}
          onPress={() => {
            this.props.navigation.navigate('Registration');
          }}
          underlayColor="#fff"
        >
          <Text style={styles.buttonText}>Registieren</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={customDebuggingButton}
          onPress={() => {
            this.props.navigation.navigate('Menu', {
              tokenP:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjE1MDdmYjA4MmY2ODAwMTRlZDkwNDMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI4MTA0OTU1fQ.uM0TPK27FG5GXa0ZUAbYGt_IzPuAhEesRVzIT46wz7I',
            });
          }}
          underlayColor="#ff0"
        >
          <Text style={styles.buttonText}>debug: login@thiel.de</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={customDebuggingButton}
          onPress={() => {
            this.props.navigation.navigate('Menu', {
              tokenP:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjE1NDVlOGE5NTI3NjAwMTRhZTIwNDQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI4MTIwODA4fQ.2XERYjcPbEuO7xgDIC35JP9fTklmn-zHJBOGIQfMfOs',
            });
          }}
          underlayColor="#ff0"
        >
          <Text style={styles.buttonText}>debug: login2@thiel.de</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
