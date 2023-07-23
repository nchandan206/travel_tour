
const email=document.getElementById('email');
const password=document.getElementById('password');
const username=document.getElementById('username');

//signin criteria of a user to check the valid user
function signin()
{
    if(email.value==="" || password.value==="")
    {
        if(username.value=="")
             alert('emailid cannot be blank');
        else
        alert('password canot be blank');


    }
    else
    {

    const url= "http://localhost:3000/users";
    fetch(url,{
    method:'GET',
                })
    .then(response=>response.json())
    .then(data=>{

    console.log(data);
    const user=data.find((item)=> 
    item.password==password.value && item.email==email.value);
    console.log(user);
    if(user)
    {
    alert("authentication successful");
    const token=Date.now();
    console.log("token:",token);
    localStorage.setItem('token',token);
    //here istored the data of the user int the local storage of browoser
    localStorage.setItem('username', email.value);
    localStorage.setItem('password', password.value);
    window.location.href='homepage.html';
    }

    else{
        alert("you are not a valid user please signup");
        }
})

.catch(error=>{
    console.log(error);
})
    }
}
//signup logic when user enter details if he alredy d=sih=gnup then it wii show message
function signup()
{  
  // user required
    if(username.value==="" || password.value==="" || email.value==="")
    {
        if(username.value=="")
             alert('username cannot be blank');
        else if(email.value=="")
             alert('emailid cannot be blank');
        else
        alert('password canot be blank');


    }
    
else{

    const newuser={
        name:username.value,
        email:email.value,
        password:password.value
    }
//fetching data for data checking
const url= "http://localhost:3000/users";
fetch(url,{
    method:'GET',
})
.then(response=>response.json())
.then(data=>{
    console.log(data);
    const user=data.find((item)=> item.password==password.value && item.email==email.value);
    console.log(user);
    if(user)
    {
    alert("already signup.plese login ");
   
    }

    else{
        alert("signup successfully");
        const url1= "http://localhost:3000/users";
    fetch(url1,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newuser)
    })
    .then(response=>response.json())
    .then(data=>{
    console.log(data);
    })

    .catch(error=>{
        console.log(error);
    })
    }
})

}
}

//for password visibility icon
function show()
{
   const  eye=document.getElementById('i');
   const password=document.getElementById('password');
   if(eye.className=='fa-solid fa-eye')
   {
    password.type='password';
    eye.className='fa-solid fa-eye-slash';
    
   }
   else{
    password.type='text';
    eye.className='fa-solid fa-eye';
   }
}
