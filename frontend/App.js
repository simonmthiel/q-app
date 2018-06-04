import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import HomeScreen from './components/homescreen';
import InitialPage from './components/initialpage';

class AnswerPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.q_id = this.props.navigation.getParam('q_id');
    this.state = {
      responseAnswerBody: '',
      responseAnswerAllStatus: '',
    }
  }

  componentDidMount(){
    console.log('q_id retrieved on AnswerPage: ', this.q_id);
    if(this.q_id) this.getAnswer();
  }

  getAnswer() {
    console.log('into getAnswer()');
    const url = 'https://radiant-tor-74073.herokuapp.com/answers/'; //5b13febf6b01c638c93d3ed4'; //5b13febf6b01c638c93d3ed4'; // TODO fix response.json() issue
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      }
    })
    .then(response =>
      response.json()
      .then(responseJson => ({
        body: responseJson,
        status: response.status
      })
    ))
    .then((responseObj) => {
      console.log('API GET answers/:q_id response', responseObj);
      // filter relevant answers for question TODO: retrieve only relevant answer from API after API fix
      const arrayAllAnswers = responseObj.body.answer;
      let relevantAnswers;
      let relevant_q_id = this.q_id;
      relevantAnswers = arrayAllAnswers.filter(function(answer) {
        return answer.q_id == relevant_q_id;
      });
      console.log('relevantAnswers: ', relevantAnswers);
      if(responseObj.status === 200 && relevantAnswers.length > 0) {
        this.setState({
          responseAnswerBody: relevantAnswers, //responseObj.body,
          responseAnswerStatus: responseObj.status
        });
      } else if (relevantAnswers.length === 0) {
        this.setState({responseAnswerStatus: 404});
      } else {
        this.setState({responseAnswerStatus: response.status});
      }
    });

}

  renderInfoMsgScreen(infoMsg) {
    console.log('infoMsg: ', infoMsg);
    return(
      <View>
        <Text style={styles.description}>{infoMsg} </Text>
      </View>
    );
  }
  renderAnswerSection(answer) {
    console.log('answer: ', answer);
    return(
      <View>
        <Text style={styles.subHeadline}>{answer.title} </Text>{'\n'}
        <Text style={styles.description}>{answer.description} </Text>
      </View>
    );
  }

  render() {
    let latestAnswer;
    let infoMsg;
    if (this.state.responseAnswerStatus === 200) {
      const arrayAnswersFromState = this.state.responseAnswerBody;
      console.log('arrayAnswersFromState: ', arrayAnswersFromState);
      latestAnswer = arrayAnswersFromState.reduce(function(l, e) {
        return e.time_created > l.time_created ? e : l;
      });
      console.log('latest answer: ', latestAnswer);
    } else {
      console.log('error call during API GET answers: ', this.state.responseAnswerStatus);
      infoMsg = 'Es existiert noch keine Antwort aus der Community.\n Schau demnächst nochmal vorbei';
    }

    const answerSection = this.state.responseAnswerStatus === 200 ? this.renderAnswerSection(latestAnswer) : this.renderInfoMsgScreen(infoMsg);
    return (
      <View style={{flex:1}}>
          <Text style={styles.headline}>Die Antwort auf deine Frage</Text>
          {answerSection}
      </View>


    );
  }
}

class CreateAnswerPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.q_id = this.props.navigation.getParam('q_id');
    this.state = {
      //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjBmNWZiZTc1N2E1NzAwMTRlMzUwYjkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI3NzM0MjA3fQ.i8f1BTpL0DlcR32jGAXs2SNgFFef31u3iV16rUwk-Z4',
      title: '',
      description: '',
      statusMessage: '',
    }
  }

  postAnswer() {
    const url = 'https://radiant-tor-74073.herokuapp.com/answers/' + this.q_id;
    const req = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      },
      body: JSON.stringify({
	      title: this.state.title,
	      description: this.state.description,
      })
    };
    console.log('Endpoint of API POST answer/:q_id ', url);
    console.log('Request of API POST answer/:q_id ', req);
    return fetch(url, req)
    .then(response =>
      {
        console.log('API POST answer/:q_id response', response);
        this.setState({
          statusMessage: response.status === 200 ? 'Deine Anwort wurde erfolgreich veröffentlicht' : 'Es ist ein Fehler aufgetreten'
        });
          console.log('token retrieved from state 2: ', this.token);
        //this.props.navigation.navigate('Menu', {tokenP: this.token});
      }
    );

  }

  render() {
  //  const { navigate } = this.props.navigation;

    return (
      <View style={{flex:1}}>
          <Text>Hier kannst du auf die Frage antworten:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder='Titel deiner Antwort'
            placeholderTextColor='#ccc'
          />
          <TextInput
            style={{height: 300, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
            placeholderTextColor='#ccc'
            placeholder='Beschreibe die Lösung im Detail'
          />
          <Button
            onPress={this.postAnswer.bind(this)}
            title="Frage beantworten"
            color="#841584"
            accessibilityLabel="Frage beantworten"
          />
          <Text>Status: {this.state.statusMessage}</Text>
      </View>


    );
  }
}

class QuestionCreationPage extends React.Component {

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

class QuestionOverviewPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.state = {
      responseQuestionsAllBody: '',
      responseQuestionsAllStatus: '',
    }
  }

  componentDidMount(){
    console.log('token retrieved on QuestionOverviewPage: ', this.token);
    this.getOwnQuestion();
  }

  getOwnQuestion() {
    console.log('into getOwnQuestion()');
    return fetch('https://radiant-tor-74073.herokuapp.com/questions/own/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      }
    })
    .then(response =>
      response.json()
      .then(responseJson => ({
        body: responseJson,
        status: response.status
      })
    ))
    .then((responseObj) => {
      console.log('API GET questions/ response', responseObj);
      if(responseObj.status === 200) {
        this.setState({
          responseQuestionsAllBody: responseObj.body,
          responseQuestionsAllStatus: responseObj.status
        });
      } else {
        this.setState({responseQuestionsAllStatus: response.status});
      }
    });

}


  render() {
    console.log('this.state.responseQuestionsAllBody.questions in render()', this.state.responseQuestionsAllBody.questions);
    return (
      <View style={{flex:1}}>
          <Text style={styles.headline}>Deine Fragen im Überblick</Text>
          <FlatList
            data={this.state.responseQuestionsAllBody.questions}
            renderItem={({item}) => {
              const styleItemFlatList = item.status_answered ? styles.itemFlatListAnswered: styles.itemFlatList ;
              return(
                <TouchableHighlight onPress={() => {this.props.navigation.navigate('Answer', {
                  tokenP: this.token,
                  q_id: item._id // TODO use corresponding ID of clicked question
                })}}>
                     <Text style={styleItemFlatList}><Text style={styles.itemFlatListTitle}>{item.title}</Text>{'\n'}<Text style={styles.itemFlatListDescription}>{item.description}</Text></Text>
                </TouchableHighlight>
              )
            }
          }

          />
      </View>


    );
  }
}

class CommunityQuestionOverviewPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.state = {
      responseQuestionsAllBody: '',
      responseQuestionsAllStatus: '',
    }
  }

  componentDidMount(){
    this.getCommunityQuestions();
  }

  getCommunityQuestions() {
    console.log('into getCommunityQuestions()');
    return fetch('https://radiant-tor-74073.herokuapp.com/questions/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      }
    })
    .then(response =>
      response.json()
      .then(responseJson => ({
        body: responseJson,
        status: response.status
      })
    ))
    .then((responseObj) => {
      console.log('API GET questions/ response', responseObj);
      if(responseObj.status === 200) {
        this.setState({
          responseQuestionsAllBody: responseObj.body,
          responseQuestionsAllStatus: responseObj.status
        });
      } else {
        this.setState({responseQuestionsAllStatus: response.status});
      }
    });

}


  render() {
    console.log('this.state.responseQuestionsAllBody.questions in render()', this.state.responseQuestionsAllBody.questions);
    return (
      <View style={{flex:1}}>
          <Text style={styles.headline}>Offene Community Fragen im Überblick</Text>
          <FlatList
            data={this.state.responseQuestionsAllBody.questions}
            renderItem={({item}) => {
            return( // TODO
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('CreateAnswer', {
                tokenP: this.token,
                q_id: item._id // TODO use corresponding ID of clicked question
              })}}>
                   <Text style={styles.itemFlatList}><Text style={styles.itemFlatListTitle}>{item.title}</Text>{'\n'}<Text style={styles.itemFlatListDescription}>{item.description}</Text></Text>
              </TouchableHighlight>
            )}
          }

          />
      </View>


    );
  }
}


class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);
    //const { navigate } = this.props.navigation;
    // const { navigation } = this.props;
    this.test = this.props.navigation.getParam('testP', 'NO-ID');
    this.token = '';
    // const { params} = this.props.navigation.state;
    //this.liftUpState = navigation.props.liftUpState.bind(this);
    this.state = {
      email: '',
      password: '',
      statusMessage: 'bisher keine Aktion ausgeführt'
    };
  }

  componentDidMount() {
    console.log('this.test', this.test);
    try {
       AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
       console.log('testSaving successfully saved');
    } catch (error) {
      console.log('testSaving failed', error);
    }

    // params.liftUpState();

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
      this.token = responseObj.token;
      this.setState({
        email: responseObj.body.email,
        id: responseObj.body._id,
        //token: responseObj.token // work around as long as below code is not working
      });

      this.props.navigation.navigate('Menu', {tokenP: this.token});


  //    try {
  //      AsyncStorage.setItem('@Login:token2', responseObj.token);
  //      console.log('Token successfully saved: ', responseObj.token);
  //    } catch (error) {
  //      console.log('Error while saving token to local storage', error);
  //    }
    });
  }





  render() {
  //  const { navigate } = this.props.navigation;
    console.log(this.state.email);
    return (
      <View style={{flex:1}}>
        <Registration
          onSubmitRegistration={this.onSubmitRegistration.bind(this)}
          buttonText={'Registration'}
          headline={'Hier kannst du dich registrieren'}>
        </Registration>
        <View style={styles.container}>

          <Text>Deine E-Mail: {this.state.email}</Text>

          <Text>Deine NutzerID: {this.state.id}</Text>


        </View>
      </View>


    );
  }
}


class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.token = '';
    this.state = {
      email: '',
      password: '',
      statusMessage: 'bisher keine Aktion ausgeführt'
    };
  }

  onSubmitLogin(email, password) {
    this.setState({
      email: email,
      password: password
    });

    return fetch('https://radiant-tor-74073.herokuapp.com/login', {
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
      this.token = responseObj.token;
      this.setState({
        email: responseObj.body.email,
        id: responseObj.body._id,
        //token: responseObj.token // work around as long as below code is not working
      });

      this.props.navigation.navigate('Menu', {tokenP: this.token});
    });
  }





  render() {
    console.log(this.state.email);
    return (
      <View style={{flex:1}}>
        <Registration
          onSubmitRegistration={this.onSubmitLogin.bind(this)}
          buttonText={'Einloggen'}
          headline={'Gib deine Logindaten ein'}
          >
        </Registration>
        <View style={styles.container}>

          <Text>Deine E-Mail: {this.state.email}</Text>

          <Text>Deine NutzerID: {this.state.id}</Text>


        </View>
      </View>


    );
  }
}

class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmitButtonClick(){
    this.props.onSubmitRegistration(this.state.email, this.state.password);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>{this.props.headline}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder='E-Mail'
          placeholderTextColor='#ccc'
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholderTextColor='#ccc'
          placeholder='Password'
        />
        <Button
          onPress={this.onSubmitButtonClick}
          title={this.props.buttonText}
          color="#841584"
          accessibilityLabel="Registrieren"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
  },
  subHeadline: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  description: {
    fontSize: 14,
    padding: 10,
  },
  itemFlatList: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 14,
    height: 55,
    borderWidth: 1,
    borderColor: '#666',
  },
  itemFlatListAnswered: {
    backgroundColor: '#74DF00',
    padding: 10,
    fontSize: 14,
    height: 55,
    borderWidth: 1,
    borderColor: '#666',
  },
  itemFlatListTitle: {
    fontWeight: 'bold',
    padding: 20,
  },
  itemFlatListDecription: {

  },
});


export default createStackNavigator({

  Home: {
    screen: InitialPage
  },
  Start: {
    screen: HomeScreen
  },
  Menu: {
    screen: HomeScreen
  },
  Registration: {
    screen: RegistrationPage
  },
  Login: {
    screen: LoginPage
  },
  Question: {
    screen: QuestionCreationPage
  },
  Answer: {
    screen: AnswerPage
  },
  QuestionOverview: {
    screen: QuestionOverviewPage
  },
  CommunityQuestionOverview: {
    screen: CommunityQuestionOverviewPage
  },
  CreateAnswer: {
    screen: CreateAnswerPage
  }
});
