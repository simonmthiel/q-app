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
import HEADER from './config/header';
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

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MenuPage,
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
    navigationOptions: {
      headerBackTitle: 'Zurück',
      headerStyle: HEADER.style.headerStyle,
      headerTintColor: HEADER.style.headerTintColor,
      headerTitleStyle: HEADER.style.headerStyle,
      // headerBackTitle: 'Zurück',
    },
  },
);

const RootStack = createStackNavigator(
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
    Registration: {
      screen: RegistrationPage,
    },
    Login: {
      screen: LoginPage,
      navigationOptions: {
        headerBackTitle: 'Zurück',
      },
    },

    Menu: {
      screen: MainStack,
    },
  },
  {
    headerMode: 'none',
  },
);
