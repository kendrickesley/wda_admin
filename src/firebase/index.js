import firebase from 'firebase';
import config from './config';
firebase.initializeApp(config);

//initialize firebase database, authentication, and authentication providers
const db = firebase.database()
const auth = firebase.auth
const fb_provider = new firebase.auth.FacebookAuthProvider();
const google_provider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    auth,
    fb_provider, 
    google_provider
}