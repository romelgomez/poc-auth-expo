import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { 
  Button,
  WhiteSpace,
} from '@ant-design/react-native';

// Init firebase
export * from './inits/firebase.init';

// Import Auth Components
import { 
  GoogleAuth,
  FacebookAuth,
  signOut,
  AnonymouslyAuth
}  from './auths';


function AuthView() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase
            .auth()
            .onAuthStateChanged((user: firebase.User | null) => {
              setUser(user);
              if (initializing) {
                setInitializing(false);
              }
            });
  }, []);

  if (initializing) {
    return null
  };

  console.log(user);

  if (!user) {
    return (
      <View>
        <AnonymouslyAuth />
        <WhiteSpace size="lg" />
        <GoogleAuth />
        <WhiteSpace size="lg" />
        <FacebookAuth />
      </View>
    );
  }

  let nickname = '';

  if (user && user.isAnonymous) {
    nickname = 'Anonymous';
  } else if (user && user.email === 'bmxandcode@gmail.com') {
    nickname = 'Romel';
  } else if ( user ) {
    nickname = user.email || '';
  }

  return (
    <View>
      <Text>Welcome {nickname}</Text>
      <WhiteSpace size="lg" />
      <Button onPress={signOut}>SignOut</Button>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <AuthView /> 
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








































































// import { StatusBar } from 'expo-status-bar';
// import { 
//   ResponseType
// } from 'expo-auth-session';
// import * as SecureStore from 'expo-secure-store';

{/* <Button onPress={onGoogleButtonPress} >Google Sign-In</Button> */}
{/* <WhiteSpace size="lg" /> */}
{/* <PhoneSignIn /> */}

{/* <WhiteSpace size="lg" /> */}
{/* <Button onPress={createUserWithEmailAndPassword}>CreateUser</Button>
<WhiteSpace size="lg" /> */}
{/* <Button onPress={signInWithEmailAndPassword}>SignIn with Email</Button> */}

// type WebBrowserExampleState = {
//   result: null | WebBrowser.WebBrowserResult;
// };
{/* <LoginFirebaseFlow /> */}
{/* <WhiteSpace /> */}
{/* <LoginStandarFlow /> */}
{/* <WhiteSpace /> */}
{/* <WhiteSpace /> */}
{/* <WebBrowserExample /> */}
