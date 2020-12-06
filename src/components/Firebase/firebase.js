import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBsDkQalmIRHdE4saO2ZxoQSr0EW7gGyKQ",
    authDomain: "maskweaver-424ad.firebaseapp.com",
    databaseURL: "https://maskweaver-424ad.firebaseio.com",
    projectId: "maskweaver-424ad",
    storageBucket: "maskweaver-424ad.appspot.com",
    messagingSenderId: "593170498681",
    appId: "1:593170498681:web:e124e59bfdfbae636540a8",
    measurementId: "G-Q34FWQBX5K"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage(); //adds firebase storage reference
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    challenge = cid => this.db.ref(`challenges/${cid}`);

    challenges = () => this.db.ref('challenges');
}

export default Firebase;