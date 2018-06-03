import React from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

export class Registration extends React.Component {

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
        <Text>Registiere dich mit deiner E-Mail und einem Passwort</Text>
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
});
