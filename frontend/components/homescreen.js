import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import { createStackNavigator, params} from 'react-navigation';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjBlZWY5MDQ0YmMzYjAwMTQ4MGYxZGQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI3NzA1NDg4fQ.04EgsC8oVacSZh5_2jJNHbVkVmOZEFQ6ZRqnQ6w_8S4';// use hardcoded token for testing without registration // this.props.navigation.getParam('tokenP');
  }

componentDidMount() {
  console.log('Token on Menu Page: ', this.token);
};

  liftUpState() {
    console.log('liftUpState called successfully');
  }


  render(){
    console.log('Token on Menu Page: ', this.token);
    const element = this.token ? this.renderMenu() : this.renderRegistration();
    return(element);
  }

  renderMenu() {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Hauptmenü</Text>

           <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => {this.props.navigation.navigate('Question', {
              tokenP: this.token
            })}}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Frage stellen</Text>
          </TouchableHighlight>

           <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => {this.props.navigation.navigate('QuestionOverview', {
              tokenP: this.token
            })}}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Deine Übersicht</Text>
          </TouchableHighlight>

           <TouchableHighlight
            style={styles.buttonMenu}
            onPress={() => {this.props.navigation.navigate('CommunityQuestionOverview', {
              tokenP: this.token
            })}}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Community Fragen</Text>
          </TouchableHighlight>
      </View>
    );
  }
  renderRegistration() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
           title="Registration"
           onPress={() => {this.props.navigation.navigate('Registration', {
             testP: 'test'
           })}}
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

  buttonMenu:{
    width: 250,
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000'
  },
  submitText:{
      fontSize: 18,
      fontWeight: 'bold',
      color:'#333',
      textAlign:'center',
  }
});