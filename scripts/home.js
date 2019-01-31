var config = {
    apiKey: "AIzaSyDH4cqWj4pXtpZRR6Ja9g_DpXNjBMoZAc4",
    authDomain: "shary-chatapp.firebaseapp.com",
    databaseURL: "https://shary-chatapp.firebaseio.com",
    projectId: "shary-chatapp",
    storageBucket: "shary-chatapp.appspot.com",
    messagingSenderId: "739193686298"
  };
  firebase.initializeApp(config);


  
function loadFun(){
  var allContacts=document.getElementById("allContacts");

  firebase.database().ref("users/")
  .on("value",(data)=>{
    var allUsers=data.val();


    for(var key in allUsers){
      var id=key;
allContacts.innerHTML+=
`

<tr>

<td>${allUsers[key].email}</td>
<td></td>
<td><button class='btn btn-success' onclick='contactIdFun("${allUsers[key].email}","${key}")'>Send Message</button></td>
</tr>
`
    }

  })
 
}


function contactIdFun(email,key){
document.getElementById('msg').value="";
  var userUid=localStorage.getItem('currentUserUid');
  var recieverEmail=email;
  var recieverId=key;
  localStorage.setItem('recieverId',key)
  localStorage.setItem('recieverEmail',email)
var msgsViewDiv=document.getElementById('msgsViewDiv');
   document.getElementById('recieverId').value=recieverEmail;
var msgRef=userUid+recieverId;


   firebase.database().ref('msgs/'+msgRef)
   .once('value',(data)=>{
     var msgsData=data.val();
     msgsViewDiv.innerHTML="";
     for(var key in msgsData){
      

        
        msgsViewDiv.innerHTML+=
        `
        <tr>
        <td>${msgsData[key].msg} </td>
        </tr>
        <br><br>
        `
      
     }


   }).then((success)=>{


    var msgRef1=recieverId+userUid;
   firebase.database().ref('msgs/'+msgRef1)
   .once('value',(data)=>{
     var msgsData=data.val();
    //  msgsViewDiv.innerHTML="";
     for(var key in msgsData){
      

        
        msgsViewDiv.innerHTML+=
        `
        <tr>
        <td>${msgsData[key].msg} </td>
        </tr>
        <br><br>
        `
      
     }
    
    })


   
    


   })


}



function logOutFun(){

//   FB.logOut((res)=>{
// console.log(res);
//   });
  firebase.auth().signOut()
  .then(function() {
 localStorage.setItem('currentUserUid',null)
 localStorage.setItem('recieverId',null)
  localStorage.setItem('recieverEmail',null)

 location.href="../pages/logIn.html"
  }).catch(function(error) {
   alert(error.message)
  });    
}



function sendFun(){

  var msg=document.getElementById('msg').value;
  var userUid=localStorage.getItem('currentUserUid');
  var recieverId=localStorage.getItem('recieverId');
  var recieverEmail=localStorage.getItem('recieverEmail');
  var msgRef=userUid+recieverId;

  let userMsg={
    msg,

  }
 firebase.database().ref("msgs/"+msgRef)
  .push(userMsg)
  .then((success)=>{
contactIdFun(recieverEmail,recieverId)

  })
  .catch((error)=>{
alert(error)
  });

}