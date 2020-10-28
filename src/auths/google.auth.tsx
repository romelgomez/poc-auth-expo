import React, { useEffect } from 'react';
import firebase from 'firebase';
import { Platform } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { warmUpAsync, coolDownAsync } from 'expo-web-browser';
import { Button } from '@ant-design/react-native';

maybeCompleteAuthSession();

export function GoogleAuth() {
  // TODO: Move the keys to environment logic
  // https://github.com/expo/expo/issues/3540#issuecomment-466709365
  // https://docs.expo.io/versions/latest/sdk/google/
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    expoClientId: '840594218977-rml59vj7aafmpkq47j2e1hbt60p58pkm.apps.googleusercontent.com', 
    webClientId: '840594218977-rml59vj7aafmpkq47j2e1hbt60p58pkm.apps.googleusercontent.com',
    androidClientId: '840594218977-m6imhapocuon6ubhd1at8emgj9um9s0u.apps.googleusercontent.com',
  });

  const login = () => {
    promptAsync().catch((reason) => {
      console.error(reason);
    });
  };

  useEffect(() => {
    // console.log('LoginFirebaseFlow:response: ', JSON.stringify(response));

    if (Platform.OS === 'android') {
      warmUpAsync();
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(({ user }: firebase.auth.UserCredential) => {
          console.log(
            'GoogleAuth:signInWithCredential',
            `uid: ${user?.uid},`,
            `email: ${user?.email},`,
            `isAnonymous: ${user?.isAnonymous}.`,
          ); 
        })
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
    // <div>
    //   <Button onPress={methodDoesNotExist}>Break the world</Button>;
    // </div>
    <Button disabled={!request} onPress={login}>Login with Google</Button>
  );
}
