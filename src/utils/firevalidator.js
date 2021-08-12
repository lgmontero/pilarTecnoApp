import React from 'react'
import { Snackbar } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../src/constansts';

 const Auth = ({ type = 'error', message, onDismiss }) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={8000}
        onDismiss={onDismiss}
        style={{
          backgroundColor:
            type === 'error' ? theme.colors.error : theme.colors.success,
        }}
      >
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 180 + getStatusBarHeight(),
    width: '100%',
  },
  content: {
    fontWeight: '500',
  },
})
export default (Auth)