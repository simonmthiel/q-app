import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class ErrorContainer extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.errorContainer}>
          {this.props.headline ? (
            <Text style={styles.errorContainerHeadline}>{this.props.headline}</Text>
          ) : (
            <React.Fragment />
          )}
          {this.props.text ? (
            <Text style={styles.errorContainerText}>{this.props.text}</Text>
          ) : (
            <React.Fragment />
          )}
        </View>
      </View>
    );
  }
}
