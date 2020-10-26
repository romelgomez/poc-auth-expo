import React, { useEffect } from 'react';
import firebase from 'firebase';
import { Platform } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';

maybeCompleteAuthSession();

export function GoogleAuth() {
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId:
      '840594218977-rml59vj7aafmpkq47j2e1hbt60p58pkm.apps.googleusercontent.com',
  });

  const login = () => {
    promptAsync().catch((reason) => {
      console.error(reason);
    });
  };

  useEffect(() => {
    console.log('LoginFirebaseFlow:response: ', response);

    if (Platform.OS === 'android') {
      warmUpAsync();
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
        coolDownAsync();
      }
    };
  }, [response]);

  return (
    <Button disabled={!request} onPress={login}>Login with Google</Button>
  );
}
