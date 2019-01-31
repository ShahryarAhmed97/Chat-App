// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDH4cqWj4pXtpZRR6Ja9g_DpXNjBMoZAc4",
    authDomain: "shary-chatapp.firebaseapp.com",
    databaseURL: "https://shary-chatapp.firebaseio.com",
    projectId: "shary-chatapp",
    storageBucket: "shary-chatapp.appspot.com",
    messagingSenderId: "739193686298"
  };
  firebase.initializeApp(config);



function signFun(){

    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((success)=>{

        let userUid=firebase.auth().currentUser.uid;
        localStorage.setItem('currentUserUid',userUid);

        let userObj={
            email,
            password,

        }

        firebase.database().ref('users/'+userUid).set(userObj)
        .then((success)=>{

window.location.href="./pages/logIn.html"
        })
        .catch((error)=>{
alert(error.message)
        })

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
    


}


function fbLogFun(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
      });



      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token)

        let userUid=firebase.auth().currentUser.uid;
        localStorage.setItem('currentUserUid',userUid);
        // for(var key in user){
       
        //    var uid = user[key].uid;
        //    var email=user[key].email;
        //    var displayName=user[key].displayName;
        // }

        // let userObj={
        //   uid,
        //   email,
        //   displayName
        // }

        window.location.href="./pages/home.html"
//         firebase.database().ref("users/"+uid)
//         .set(userObj)
//         .then((success)=>{

//         }).catch((error)=>{
//           var errorMessage = error.message;
// alert(errorMessage)
//         })
      

     

    


 }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;  
      var credential = error.credential;
      });
}