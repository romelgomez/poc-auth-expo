import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { WhiteSpace, WingBlank, Button } from '@ant-design/react-native';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';

WebBrowser.maybeCompleteAuthSession();

type WebBrowserExampleState = {
  result: null | WebBrowser.WebBrowserResult;
};

function WebBrowserExample() {
  const state_initial: WebBrowserExampleState = {
    result: null,
  };

  const [state, setState] = useState(state_initial);

  const handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.io');

    console.log('WebBrowserExample:result', result);

    setState({ result });
  };

  return (
    <View>
      <Button onPress={handlePressButtonAsync}>Open WebBrowser</Button>
      <Text>{state.result && JSON.stringify(state.result)}</Text>
    </View>
  );
}

function LoginStandarFlow() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1012934175514-emctrmqsdb1e9pv15lo1ijqgh66ktbt4.apps.googleusercontent.com',
    webClientId:
      '1012934175514-emctrmqsdb1e9pv15lo1ijqgh66ktbt4.apps.googleusercontent.com',
  });

  const login = () => {
    promptAsync()
    .catch((reason) => {
      console.error(reason);
    });
  }
  
  useEffect(() => {
    console.log('LoginStandarFlow:response ', response);

    if (Platform.OS === 'android') {
      WebBrowser.warmUpAsync();
    }

    if (response?.type === 'success') {
      const { authentication } = response;
    }

    return () => {
      if (Platform.OS === 'android') {
        WebBrowser.coolDownAsync();
      }
    };
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={login}
    >
      Google Login - StandarFlow
    </Button>
  );
}

function LoginFirebaseFlow() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCi2016lkCckyu4Sc11LtObxrzzEyS-JHY',
      authDomain: 'poc-expo-ant-auth.firebaseapp.com',
      databaseURL: 'https://poc-expo-ant-auth.firebaseio.com',
      projectId: 'poc-expo-ant-auth',
      storageBucket: 'poc-expo-ant-auth.appspot.com',
      messagingSenderId: '840594218977',
      appId: '1:840594218977:web:272afee93a93df4f2dbca0',
      measurementId: 'G-N3F0MNV22H',
    });
  }

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '840594218977-rml59vj7aafmpkq47j2e1hbt60p58pkm.apps.googleusercontent.com',
  });


  const login = () => {
    promptAsync()
    .catch((reason) => {
      console.error(reason);
    });
  }
  

  useEffect(() => {
    console.log('LoginFirebaseFlow:response: ', response);

    if (Platform.OS === 'android') {
      WebBrowser.warmUpAsync();
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((reason) => {
          console.error(reason);
        });
    }

    return () => {
      if (Platform.OS === 'android') {
        WebBrowser.coolDownAsync();
      }
    };
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={login}
    >
      Google Login - FirebaseFlow
    </Button>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <LoginFirebaseFlow />

      <WhiteSpace />

      <LoginStandarFlow />

      <WhiteSpace />

      <WebBrowserExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// https://github.com/expo/examples/blob/1d47e178f8b1f91e12cafa556695a26afb12481f/with-facebook-auth/App.js#L16

// NOTICE: Please do not actually request the token on the client (see:
// response_type=token in the authUrl), it is not secure. Request a code

// instead, and use this flow:
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm

// The code here is simplified for the sake of demonstration. If you are
// just prototyping then you don't need to concern yourself with this and
// can copy this example, but be aware that this is not safe in production.

// https://github.com/expo/examples/blob/1f610ae4d08fdbbdca2932477cac9a7940792bbc/with-twitter-auth/backend/index.js
