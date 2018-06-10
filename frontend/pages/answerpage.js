import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import * as constants from './../config/config';
import TEXT from './../config/text';
import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

import InfoMsgView from './../components/infomsgview';

export default class AnswerPage extends React.Component {
  static navigationOptions = {
    title: TEXT.answerpage.headline,
    // headerBackTitle: 'Zurück',
  };

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.q_id = this.props.navigation.getParam('q_id');
    this.state = {
      responseAnswerBody: '',
      responseAnswerAllStatus: '',
    };
  }

  componentDidMount() {
    console.log('q_id retrieved on AnswerPage: ', this.q_id);
    if (this.q_id) this.getAnswer();
  }

  getAnswer() {
    console.log('into getAnswer()');
    const url = `${constants.SERVER_URL}answers/${this.q_id}`; // 5b13febf6b01c638c93d3ed4'; //5b13febf6b01c638c93d3ed4'; // TODO fix response.json() issue
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.token,
      },
    })
      .then(response =>
        response.json().then(responseJson => ({
          body: responseJson,
          status: response.status,
        })),
      )
      .then(responseObj => {
        console.log('API GET answers/:q_id response', responseObj);
        // filter relevant answers for question TODO: retrieve only relevant answer from API after API fix
        const responseAnswers = responseObj.body.answer;
        console.log('responseAnswers: ', responseAnswers);
        if (responseObj.status === 200 && responseAnswers.length > 0) {
          this.setState({
            responseAnswerBody: responseAnswers, // responseObj.body,
            responseAnswerStatus: responseObj.status,
          });
        } else if (responseAnswers.length === 0) {
          this.setState({ responseAnswerStatus: 404 });
        } else {
          this.setState({ responseAnswerStatus: response.status });
        }
      });
  }

  navigate(target) {
    this.props.navigation.navigate(target, {
      tokenP: this.token,
    });
  }

  renderInfoMsgScreen(infoMsg) {
    return (
      <InfoMsgView
        infoMsg="Deine Frage wurde noch nicht beantwortet"
        buttonText={TEXT.button.back_to_overview}
        onButtonClick={this.navigate.bind(this, 'QuestionOverview')}
      />
    );
  }
  renderAnswerSection(answer) {
    console.log('answer: ', answer);

    return (
      <View>
        <Text style={styles.subHeadline}>{answer.title}</Text>

        <Text style={styles.description}>{answer.description}</Text>
      </View>
    );
  }

  render() {
    let latestAnswer;
    let infoMsg;
    if (this.state.responseAnswerStatus === 200) {
      const arrayAnswersFromState = this.state.responseAnswerBody;
      console.log('arrayAnswersFromState: ', arrayAnswersFromState);
      latestAnswer = arrayAnswersFromState.reduce(
        (l, e) => (e.time_created > l.time_created ? e : l),
      );
      console.log('latest answer: ', latestAnswer);
    } else {
      console.log('error call during API GET answers: ', this.state.responseAnswerStatus);
      infoMsg =
        'Es existiert noch keine Antwort aus der Community.\n Schau demnächst nochmal vorbei';
    }

    const answerSection =
      this.state.responseAnswerStatus === 200
        ? this.renderAnswerSection(latestAnswer)
        : this.renderInfoMsgScreen(infoMsg);
    return <View style={styles.container}>{answerSection}</View>;
  }
}
