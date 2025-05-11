import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseAuth = auth();
const firestoreDb = firestore();
const firebaseStorage = storage();
const defaultApp = firebase.app();

export {
  defaultApp as app,
  firebaseAuth as auth,
  firestoreDb as db,
  firebaseStorage as storage
};
