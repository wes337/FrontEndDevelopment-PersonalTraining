import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDSuNrYKC18zL8CumyLnLcXCfTqV77gGTQ",
    authDomain: "personaltrainingapp-9023e.firebaseapp.com",
    databaseURL: "https://personaltrainingapp-9023e.firebaseio.com",
    projectId: "personaltrainingapp-9023e",
    storageBucket: "personaltrainingapp-9023e.appspot.com",
    messagingSenderId: "474835710483"
};

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}
  
export default Firebase;