import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

// import Registration from './registration';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      statusMessage: 'bisher keine Aktion ausgeführt'
    };
  }

  componentDidMount() {
    try {
       AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
       console.log('testSaving successfully saved');
    } catch (error) {
      console.log('testSaving failed', error);
    }

  //  try {
  //    AsyncStorage.setItem('@Login:test', 'testSaving');
  //    console.log('testSaving successfully saved');
  //  } catch (error) {
  //    console.log('testSaving failed', error);
  //  }
  }

  onSubmitRegistration(email, password) {
    this.setState({
      email: email,
      password: password
    });

    return fetch('https://radiant-tor-74073.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response =>
      response.json()
      .then(responseJson => ({
        body: responseJson,
        token: response.headers.get('x-auth')
      })
    ))
    .then((responseObj) => {
      console.log('API POST users/ responseObj: ', responseObj);
      this.setState({
        email: responseObj.body.email,
        id: responseObj.body._id,
        token: responseObj.token // work around as long as below code is not working
      });


  //    try {
  //      AsyncStorage.setItem('@Login:token2', responseObj.token);
  //      console.log('Token successfully saved: ', responseObj.token);
  //    } catch (error) {
  //      console.log('Error while saving token to local storage', error);
  //    }
    });
  }

  postQuestion() {
    let token;
  //  try {
  //    const value = AsyncStorage.getItem('@Login:token');
  //    if (value !== null){
  //      // We have data!!
  //      console.log('AsyncStorage token: ', value);
  //      token = value;
  //      setState({token});
  //    }
  //  } catch (error) {
  //    console.log('Error unable to retrieve token');
  //  }

  token = this.state.token;
  console.log("token retrieved from state: ", token);

    return fetch('https://radiant-tor-74073.herokuapp.com/questions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': token,
      },
      body: JSON.stringify({
	      title: 'Erste Fragen aus React App',
	      description: 'react native app'
      })
    })
    .then(response =>
      {
        console.log('API POST questions/ response', response);
        this.setState({
          statusMessage: response.status === 200 ? 'Deine Frage wurde erfolgreich veröffentlicht' : 'Es ist ein Fehler aufgetreten'
        })
      }
    );

  }



  render() {
  //  const { navigate } = this.props.navigation;
    console.log(this.state.email);
    return (
      <View style={{flex:1}}>
        <Registration
          onSubmitRegistration={this.onSubmitRegistration.bind(this)}
          buttonText={'Registration'}>
        </Registration>
        <View style={styles.container}>

          <Text>Deine E-Mail: {this.state.email}</Text>

          <Text>Deine NutzerID: {this.state.id}</Text>
          <Text>Dein Token: {this.state.token}</Text>
          <Text>Status: {this.state.statusMessage}</Text>
          <Button
            onPress={this.postQuestion.bind(this)}
            title="Frage veröffentlichen"
            color="#841584"
          />
        </View>
      </View>


    );
  }
}



/*
const App = StackNavigator({
  Home: { screen: HomeScreen},
  Profile: { screen: ProfileScreen},
});
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
