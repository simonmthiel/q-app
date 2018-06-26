import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import ErrorContainer from './../components/errorcontainer';

import * as utilFunc from './../utils/utilFunctions';

import * as constants from './../config/config';
import TEXT from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class InitialPage extends React.Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem('@MathApp:token', (err, result) => {
      console.log('Retrieved token from local device storage: ', result);
      if (result) {
        this.navigate('Menu', result);
      }
    });
  }
  componentDidMount() {
    const sampleLog = utilFunc.shortenText(30, 'Initial page loaded!');
    utilFunc.logger(sampleLog);
  }

  navigate(navigationTarget, token) {
    this.props.navigation.navigate(navigationTarget, {
      tokenP: token,
    });
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
      </View>
    );
  }
}
