import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';

import * as constants from './../config/config';
import TEXTS from './../config/text';

export default class CommunityQuestionOverviewPage extends React.Component {

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
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('AnswerCreation', {
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
