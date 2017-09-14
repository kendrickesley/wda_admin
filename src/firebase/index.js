import firebase from 'firebase';
import config from './config';
firebase.initializeApp(config);

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