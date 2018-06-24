import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TEXT from './../config/text';

import * as styleSheet from './../styles/styles';

const styles = StyleSheet.create(styleSheet.global);

export default class ErrorContainer extends React.Component {
  render() {
    let headline = `Fehler ${this.props.errorCode}`;
    let description = this.props.errorMsg ? this.props.errorMsg : TEXT.errorcontainer.unknownError;
    if (this.props.errorCode === 901) {
      headline = TEXT.errorcontainer.headline_code_901;
      description = TEXT.errorcontainer.description_code_901;
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.errorContainer}>
          {headline ? (
            <Text style={styles.errorContainerHeadline}>{headline}</Text>
          ) : (
            <React.Fragment />
          )}
          {description ? (
            <Text style={styles.errorContainerText}>{description}</Text>
          ) : (
            <React.Fragment />
          )}
        </View>
      </View>
    );
  }
}
