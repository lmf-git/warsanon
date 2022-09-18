export default function firebaseRef() {
  try {
    const config = {
        apiKey: "AIzaSyDJ5JlKLGNMPmsiJUkCh5nYS1797lBw6OI",
        authDomain: "test-852ee.firebaseapp.com",
        databaseURL: "https://test-852ee.firebaseio.com",
        projectId: "test-852ee",
        storageBucket: "test-852ee.appspot.com",
        messagingSenderId: "124413092534",
        appId: "1:124413092534:web:5d7291ed6c992b90"
    };
  
    if (!window.firebase.apps.length) {
      firebase.initializeApp(config);
    }

    return window.firebase;
      
  } catch (err) {
    console.log(err);
  }
}
