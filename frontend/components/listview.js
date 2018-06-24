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

import * as utilFunc from './../utils/utilFunctions';

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

  renderStatusText(questionObj) {
    let statusText = '';
    if (questionObj.status_answered) {
      const timeAnswered = utilFunc.utilDate(questionObj.time_answered);
      // const timeAnswered = new Date(questionObj.time_answered);
      if (timeAnswered !== null) {
        statusText = `Antwort erhalten: ${timeAnswered}`;
      } else {
        statusText = 'Antwort erhalten';
      }
    } else {
      // const timeCreated = new Date(questionObj.time_created);
      const timeCreated = utilFunc.utilDate(questionObj.time_created);
      if (timeCreated !== null) {
        statusText = `Frage veröffentlicht: ${timeCreated}`;
      } else {
        statusText = 'Frage veröffentlicht';
      }
    }
    return <Text style={styles.itemFlatListStatus}>{statusText}</Text>;
  }
  render() {
    const shortenTextLength = 50;
    console.log('listView data: ', this.props.listData);
    return (
      <View>
        <View>
          {this.renderOptionalHeadline()}
          {this.renderOptionalDescription()}

          <FlatList
            style={styles.flatListContainer}
            data={this.props.listData}
            renderItem={({ item }) => (
              // TODO resolve warning
              <TouchableHighlight onPress={this.props.clickOnListItem.bind(this, item)}>
                <View style={styles.itemFlatListContainer}>
                  {this.renderIcon(item.status_answered)}
                  <View style={styles.itemFlatList}>
                    <Text style={styles.itemFlatListTitle}>
                      {utilFunc.shortenText(shortenTextLength, item.title)}
                    </Text>
                    <Text style={styles.itemFlatListDecription}>
                      {utilFunc.shortenText(shortenTextLength, item.description)}
                    </Text>
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
