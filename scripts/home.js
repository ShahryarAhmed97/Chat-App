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
  var userUid=localStorage.getItem('currentUserUid');
var userEmails=[];
  firebase.database().ref("myContacts/"+userUid)
  .on("value",(data1)=>{
    var myContacts=data1.val();

    for(var k in myContacts){
      userEmails.push(myContacts[k].myContacts) ;
     }

console.log(userEmails);


    firebase.database().ref("users/")
    .on("value",(data)=>{
      var allUsers=data.val();


      for(var key in allUsers){
        for(var u in userEmails){

        if(allUsers[key].email==userEmails[u]){
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
      }
    }

   
    })

  


   

  })
 
}

function addContacts(){

  var myContacts=document.getElementById('myContacts').value;
  var userUid=localStorage.getItem('currentUserUid');
  let contactObj={
    myContacts,
  }
  firebase.database().ref('myContacts/'+userUid)
  .push(contactObj)
  .then((success)=>{
    document.getElementById('allContacts').innerHTML=""

    // alert("SuccessFully added"+success)
    console.log("SuccessFully added"+success)
    document.getElementById('myContacts').value="";
    loadFun();
  })
  .catch((error)=>{
alert(error)
console.log(error)
  })
}


function contactIdFun(email,key){
document.getElementById('msg').value="";
  var userUid=localStorage.getItem('currentUserUid');
  var recieverEmail=email;
  var recieverId=key;
  localStorage.setItem('recieverId',key)
  localStorage.setItem('recieverEmail',email)
var msgsViewDiv2=document.getElementById('msgsViewDiv2');
   document.getElementById('recieverId').value=recieverEmail;
var msgRef=userUid+recieverId;


   firebase.database().ref('msgs/'+msgRef)
   .once('value',(data)=>{
     var msgsData=data.val();
     msgsViewDiv2.innerHTML="";
     for(var key in msgsData){
      

        
        msgsViewDiv2.innerHTML+=
        `
        <tr>
        <td>${msgsData[key].msg} </td>
        </tr>
        <br><br>
        `
      
     }


   }).then((success)=>{

    var msgsViewDiv1=document.getElementById('msgsViewDiv1');

    var msgRef1=recieverId+userUid;
   firebase.database().ref('msgs/'+msgRef1)
   .once('value',(data)=>{
     var msgsData=data.val();
     msgsViewDiv1.innerHTML="";
     for(var key in msgsData){
      

        
        msgsViewDiv1.innerHTML+=
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