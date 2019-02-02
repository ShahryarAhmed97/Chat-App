var config = {
    apiKey: "AIzaSyDH4cqWj4pXtpZRR6Ja9g_DpXNjBMoZAc4",
    authDomain: "shary-chatapp.firebaseapp.com",
    databaseURL: "https://shary-chatapp.firebaseio.com",
    projectId: "shary-chatapp",
    storageBucket: "shary-chatapp.appspot.com",
    messagingSenderId: "739193686298"
  };
  firebase.initializeApp(config);
var currentUserData=localStorage.getItem('currentUserData')
  console.log(currentUserData)



function loadFun(){

  var allContacts=document.getElementById("allContacts");
  var userUid=localStorage.getItem('currentUserUid');
  var welcm=localStorage.getItem('currentUserData');
document.getElementById('h1').innerHTML="Welcome  "+welcm
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
  
  
  <td><button class='btn btn-success' style="width:400px; font-size:1.3em;background-color:transparent;color:green" onclick='contactIdFun("${allUsers[key].email}","${key}")'>${allUsers[key].email}</button></td>
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
var exiConArray=[]
  firebase.database().ref('myContacts/'+userUid)
  .on('value',(data)=>{
    var exiCon=data.val();
    for(var key in exiCon){
      exiConArray.push(exiCon[key].myContacts);
    }
if(exiConArray.includes(myContacts)==false){
        
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
else{
  alert('this contact already exists');
  document.getElementById('myContacts').value="";

}

      

    
  

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

function updateScroll(){
  var scrollDiv=document.getElementById('scrollDiv');
  scrollDiv.scrollTop = scrollDiv.scrollHeight;
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
  // var msgRef=userUid+recieverId;
  var msgRef;
  if(userUid<recieverId){
    msgRef=userUid+recieverId;
  }
  else{
    msgRef=recieverId+userUid;
  }
  
  
     firebase.database().ref('msgs/'+msgRef)
     .on('value',(data)=>{
       var msgsData=data.val();
       msgsViewDiv2.innerHTML="";
       for(var key in msgsData){
        
  if(msgsData[key].currentUserData==undefined){
    msgsData[key].currentUserData=recieverEmail;
  }
          
          msgsViewDiv2.innerHTML+=
          `
          <table  style='overflow-wrap: break-word;padding:10px;border-radius:10px;box-shadow:0px 0px 20px grey;width:200px !important ;'>
          <tr  style='padding:10px'>
          <td style='font-size:1.3em;padding:10px;overflow-wrap: break-word;width:200px !important ;' >${msgsData[key].msg} </td>
         
         </tr>

        <tr style='text-align:right; color:grey;border-top:2px solid lightgrey;padding:10px;'>
        <td>${msgsData[key].tStamp}&nbsp;&nbsp;&nbsp; ${msgsData[key].currentUserData} </td>
        </tr>
      
          </table>
          <br><br>
          `
        
       }

      //  setInterval(updateScroll,1000);

  
     })
  
  
  
    //  var msgsViewDiv1=document.getElementById('msgsViewDiv1');
  
    //  var msgRef1=recieverId+userUid;
    // firebase.database().ref('msgs/'+msgRef1)
    // .on('value',(data)=>{
    //   var msgsData=data.val();
    //   msgsViewDiv1.innerHTML="";
    //   for(var key in msgsData){
       
  
         
    //      msgsViewDiv1.innerHTML+=
    //      `
    //      <tr>
    //      <td>${msgsData[key].msg} </td>
    //      <td>${msgsData[key].tStamp} </td>

    //      </tr>
    //      <br><br>
    //      `
       
    //   }
     
    //  })
  
  
  
  
  }
  
  
    
  function logOutFun(){
  
  
    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserUid',null)
   localStorage.setItem('recieverId',null)
    localStorage.setItem('recieverEmail',null)
    localStorage.setItem('currentUserData',null);

  
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
  var currentUserData=localStorage.getItem('currentUserData')
  console.log(currentUserData)
  var msgRef;
  if(userUid<recieverId){
    msgRef=userUid+recieverId;
  }
  else{
    msgRef=recieverId+userUid;
  }
  var today = new Date();
  var tStamp = today.getHours() + ":" + today.getMinutes() ;
    let userMsg={
    msg,
    tStamp,
    currentUserData,

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