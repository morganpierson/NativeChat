const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBjX9VWCURssseTA2CHg8cBsKtqX5TxkKc",
    authDomain: "giftedchat-60af0.firebaseapp.com",
    databaseURL: "https://giftedchat-60af0.firebaseio.com",
    projectId: "giftedchat-60af0",
    storageBucket: "giftedchat-60af0.appspot.com",
    messagingSenderId: "785322228738"
  };

class Backend {
  uui = '';
  messagesRef = null;
  //initialize firebase Backend

  constructor() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        })
      }
    })
  };
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  //retrieve messages from firebase backend 
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages')
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        },
      })
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }

  sendMessage(message) {
    for(let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
    }
  }

  //close connection on backend
  closeChat() {
    if(this.messagesRef) {
      this.messagesRef.off()
    }
  }
}


export default new Backend();
