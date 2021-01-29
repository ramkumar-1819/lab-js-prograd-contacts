var $btn=document.getElementById("btnGet");//Getting the button element
var $msg=document.getElementById("message");//getting the div element for displaying the output
$btn.addEventListener("click",myfun);//button clicked event
function myfun(){
var promise=new Promise((resolve,reject)=>{   //creating promise object 
    var req=new XMLHttpRequest;               //initiating Http Request
    req.open("GET","https://jsonplaceholder.typicode.com/users");   //Using GET method getting data from the given URL  
    req.onload=()=>{
        if(req.status==200){   //Upon complete loading  call the resolve function by passing the response data
            resolve(req.response)
        }
        else{
            reject(Error("Failed")) //if response is failed then send error message using reject function
        }
    }
    req.onerror=()=>{
        reject(Error("File not Found"))//if the server failed to load the URL the display error message using reject fnction 
    }
    req.send();//send request to server
})
promise.then((msg)=>{ //for handling resolve function
    console.log(msg)
    var result=JSON.parse(msg)   //parsing the data that we got from server
    var player='<h2>Lists of Users</h2>';
                    result.forEach(function(user) {
                     player+=
                    `<div class="player">
                      <div class="strength">Name : ${user.name}</div>
                      <div>Email   : ${user.email}</div>
                      <div>Phone   : ${user.phone}</div>
                      <div>Website : ${user.website}</div>
                      <div>Company : ${user.company.name}</div>
                      <div>City    : ${user.address.city}</div>
                      <div>Zipcode : ${user.address.zipcode}</div>
                     </div>`
                    })
    $msg.innerHTML=player;  //displaying the data in the browser
    
})
promise.catch((msg)=>{      //handling the reject function
    console.log("Promise rejected")
    console.log(msg)
})

}