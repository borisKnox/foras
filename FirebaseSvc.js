import firebase from 'firebase';
import uuid from 'uuid';

const config = {
  apiKey: "AIzaSyBnmPpCUjtO74WNUHATM41ATDHtulyyLTA",
  authDomain: "foras-8a353.firebaseapp.com",
  databaseURL: "https://foras-8a353.firebaseio.com",
  projectId: "foras-8a353",
  storageBucket: "foras-8a353.appspot.com",
  messagingSenderId: "324911742993",
}

class FirebaseSvc {

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      console.log("firebase apps already running...")
    }
  }

  login = async(user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };

  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log("created user successfully. User email:" + user.email + " name:" + user.name);
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: user.name})
        .then(function() {
          console.log("Updated displayName successfully. name:" + user.name);
        }, function(error) {
          console.warn("Error update displayName.");
        });
      }, function(error) {
        console.error("got error:" + typeof(error) + " string:" + error.message);
      });
  }

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = ref.put(blob);
    
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
              /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  }

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url})
      .then(function() {
        console.log("Updated avatar successfully. url:" + url);
        alert("Avatar image is saved successfully.");
      }, function(error) {
        console.warn("Error update avatar.");
        alert("Error update avatar. Error:" + error.message);
      });
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  }
     
  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
 
  get ref() {
      
    return firebase.database().ref('Messages');
    
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, sender_id, receiver_id, sender, subject, message, createdAt, user, meta } = snapshot.val();
    const { key: id } = snapshot;
    // const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const oldmessage = {
      id,
      // _id,
      timestamp,
      text,
      // user,
      sender_id,
      receiver_id,
      message,
      subject,
      id,
      createdAt,
      user,
      meta,
      sender
    };
    // console.log(message);
    return oldmessage;
  };

  refOn = (msg, callback) => {
    this.ref
      .child(msg.receiver_id+'_'+msg.sender_id)
      .child(msg.id)
      .ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
    
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, sender_id, receiver_id, sender, subject, message, id, createdAt, user, meta  } = messages[i];
      const message_id = '';
      const newmessage = {
        text,
        sender_id,
        receiver_id,
        sender,
        subject,
        message,
        id,
        createdAt: this.timestamp,
        meta,
        user
      };
      this.ref.child(newmessage.receiver_id+'_'+newmessage.sender_id).child(newmessage.id).push(newmessage); 
    }
  };

  refOff() {
    this.ref.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
