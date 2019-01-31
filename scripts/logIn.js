var config = {
    apiKey: "AIzaSyDH4cqWj4pXtpZRR6Ja9g_DpXNjBMoZAc4",
    authDomain: "shary-chatapp.firebaseapp.com",
    databaseURL: "https://shary-chatapp.firebaseio.com",
    projectId: "shary-chatapp",
    storageBucket: "shary-chatapp.appspot.com",
    messagingSenderId: "739193686298"
  };
  firebase.initializeApp(config);


  function logFun(){
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success)=>{
        let userUid=firebase.auth().currentUser.uid;
        localStorage.setItem('currentUserUid',userUid);
        location.href="../pages/home.html";

    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }