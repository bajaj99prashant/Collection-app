// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8CyxZmy-vhDcv5gmfzAMhCNlsOrIXmnM",
    authDomain: "vue-firebase-app-1-def2f.firebaseapp.com",
    databaseURL: "https://vue-firebase-app-1-def2f.firebaseio.com",
    projectId: "vue-firebase-app-1-def2f",
    storageBucket: "vue-firebase-app-1-def2f.appspot.com",
    messagingSenderId: "460700226921",
    appId: "1:460700226921:web:682c74432471d5d2"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // export firestore database
  export default firebaseApp.firestore()