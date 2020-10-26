import firebase from 'firebase';

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
