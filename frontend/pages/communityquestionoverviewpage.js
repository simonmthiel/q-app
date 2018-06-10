import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

import ListView from './../components/listview';
import * as constants from './../config/config';
import TEXT from './../config/text';
import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class CommunityQuestionOverviewPage extends React.Component {
  static navigationOptions = {
    title: TEXT.communityquestionoverviewpage.headline,
    // headerBackTitle: 'Zurück',
  };

  constructor(props) {
    super(props);
    this.token = this.props.navigation.getParam('tokenP', 'NO-TOKEN');
    this.state = {
      responseQuestionsAllBody: '',
      responseQuestionsAllStatus: '',
    };
  }

  componentDidMount() {
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
      },
    })
      .then(response =>
        response.json().then(responseJson => ({
          body: responseJson,
          status: response.status,
        })),
      )
      .then(responseObj => {
        console.log('API GET questions/ response', responseObj);
        if (responseObj.status === 200) {
          this.setState({
            responseQuestionsAllBody: responseObj.body,
            responseQuestionsAllStatus: responseObj.status,
          });
        } else {
          this.setState({ responseQuestionsAllStatus: response.status });
        }
      });
  }

  redirectToAnswerPage(item) {
    this.props.navigation.navigate('AnswerCreation', {
      tokenP: this.token,
      q_id: item._id, // TODO use corresponding ID of clicked question
    });
  }

  render() {
    console.log(
      'this.state.responseQuestionsAllBody.questions in render()',
      this.state.responseQuestionsAllBody.questions,
    );
    return (
      <ListView
        description="Beweise dich als Profi und beantworte eine der Fragen aus der Community"
        listData={this.state.responseQuestionsAllBody.questions}
        clickOnListItem={this.redirectToAnswerPage.bind(this)}
      />
    );
  }
}
