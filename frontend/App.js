import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator, params } from 'react-navigation';

// import SERVER_URL from './config/config.js';
import * as constants from './config/config';
import TEXTS from './config/text';
// import pages
import MenuPage from './pages/menupage';
import InitialPage from './pages/initialpage';
import RegistrationPage from './pages/registrationpage';
import LoginPage from './pages/loginpage';
import AnswerPage from './pages/answerpage';
import AnswerCreationPage from './pages/answercreationpage';
import CommunityQuestionOverviewPage from './pages/communityquestionoverviewpage';
import QuestionOverviewPage from './pages/questionoverviewpage';
import QuestionCreationPage from './pages/questioncreationpage';

export default createStackNavigator(
  {
    Home: {
      screen: InitialPage,
    },
    /*
  Initial Landing page for Login and Registration option in case user isn't logged in
  Redirects to:
  Redirection from:
  TODO: try to retrieve token from local storage
  */
    Menu: {
      screen: MenuPage,
    },
    Registration: {
      screen: RegistrationPage,
    },
    Login: {
      screen: LoginPage,
      navigationOptions: {
        headerBackTitle: 'Zurück',
      },
    },

    QuestionCreation: {
      screen: QuestionCreationPage,
    },
    AnswerCreation: {
      screen: AnswerCreationPage,
    },
    Answer: {
      screen: AnswerPage,
    },
    QuestionOverview: {
      screen: QuestionOverviewPage,
    },
    CommunityQuestionOverview: {
      screen: CommunityQuestionOverviewPage,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerBackTitle: 'Zurück',
    },
  },
);
