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
import PropTypes from 'prop-types';

// import Emoji from 'react-native-emoji';
const emoji = require('node-emoji');

import * as constants from './../config/config';
import TEXTS from './../config/text';
import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class ListView extends React.Component {
  renderOptionalHeadline() {
    if (this.props.headline) {
      return (
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            height: 25,
          }}
        >
          <Text style={styles.headline}>{this.props.headline}</Text>
        </View>
      );
    }
    return null;
  }

  renderOptionalDescription() {
    if (this.props.description) {
      return (
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 30,
          }}
        >
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      );
    }
    return null;
  }

  renderIcon(status_answered) {
    let iconCode = 'grey_question';
    if (status_answered) {
      iconCode = 'white_check_mark';
    }
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {emoji.get(iconCode)}
        </Text>
      </View>
    );
  }

  utilDate(timestamp) {
    const dateTimeString = new Date(timestamp);
    const dateString = dateTimeString.toDateString();
    const currentTimestamp = +new Date();
    const currentDateTimeString = new Date(currentTimestamp);
    const currentDateString = currentDateTimeString.toLocaleDateString();
    // check if older then 24 hours
    console.log('\n timestamp form DB: ', new Date(timestamp));
    console.log('timestamp current: ', new Date(new Date()));
    if (timestamp > currentTimestamp) {
      return null;
    } else if (timestamp + 60 > currentTimestamp) {
      return 'gerade eben';
    } else if (timestamp + 3600 > currentTimestamp) {
      const differenceInMin = (currentTimestamp - timestamp) / 60;
      return `vor ${differenceInMin} Minuten`;
    } else if (timestamp + 3600 * 24 > currentTimestamp) {
      const differenceInHours = (currentTimestamp - timestamp) / 3600;
      return `vor ${differenceInHours} Stunden`;
    }
    return dateString;
  }

  renderStatusText(questionObj) {
    let statusText = '';
    if (questionObj.status_answered) {
      const timeAnswered = this.utilDate(questionObj.time_answered);
      // const timeAnswered = new Date(questionObj.time_answered);
      if (timeAnswered !== null) {
        statusText = `Antwort erhalten: ${timeAnswered}`;
      } else {
        statusText = 'Antwort erhalten';
      }
    } else {
      // const timeCreated = new Date(questionObj.time_created);
      const timeCreated = this.utilDate(questionObj.time_created);
      if (timeCreated !== null) {
        statusText = `Frage veröffentlicht: ${timeCreated}`;
      } else {
        statusText = 'Frage veröffentlicht';
      }
    }
    return <Text style={styles.itemFlatListStatus}>{statusText}</Text>;
  }

  render() {
    return (
      <View>
        <View>
          {this.renderOptionalHeadline()}
          {this.renderOptionalDescription()}

          <FlatList
            data={this.props.listData}
            renderItem={({ item }) => (
              // TODO resolve warning
              <TouchableHighlight onPress={this.props.clickOnListItem.bind(this, item)}>
                <View style={styles.itemFlatListContainer}>
                  {this.renderIcon(item.status_answered)}
                  <View style={styles.itemFlatList}>
                    <Text style={styles.itemFlatListTitle}>{item.title}</Text>
                    <Text style={styles.itemFlatListDecription}>{item.description}</Text>
                    {this.renderStatusText(item)}
                  </View>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
}

ListView.propTypes = {
  headline: PropTypes.string,
  description: PropTypes.string,
  clickOnListItem: PropTypes.func,
};
