//typing effect type animation
const speed=300;
const  text1="your data is encrypted with us! don't worry Enjoy your trip";
let ty=0;
typing();
function typing()
{
    if(ty<text1.length)
    {
        document.getElementById('typingeffect').innerHTML+=text1.charAt(ty);
        setTimeout(typing,speed);
        ty++;
    }
}

//display and edit delet from data base db.json

const password=window.localStorage.getItem('password');
const email=window.localStorage.getItem('email');
const url="http://localhost:3000/memory";
fetch(url)
.then(response=>response.json())
.then(data=>{
    console.log(data);
    display(data);
})

.catch(error=>{
    console.log(error);
})

// let user=window.localStorage.getItem('password');
// let email=window.localStorage.getItem('email');
// document.write(user);
// console.log(typeof user);

function display(data){
    // const container=document.getElementById('div');
    // const container1=document.getElementById('div1');
    const container1=document.getElementById('content');

    data.map((item,index)=>{
        const arr=[];
        const iner1=document.createElement('div');
        const iner2=document.createElement('div');
        iner1.id='div';
        iner2.id='div1';
        const tour=document.createElement('h2');
        const description=document.createElement('p');
        tour.innerHTML="tourname:"+item.tour+"<br>";
        description.innerHTML="Description:"+" "+item.description;
        const edit=document.createElement('button');
        const delet=document.createElement('button');
        const imgadd=document.createElement('button');
        const close=document.createElement('button');
        close.innerText='Close';


        const editdiv=document.createElement('div');
        const newtour=document.createElement('input');
        newtour.placeholder='enter new tour';
        newtour.type='text';
        // newtour.id='newtour';
        newtour.className='newtour';
        const newdes=document.createElement('textarea');
        const newdes1=document.createElement('textarea');
        newdes.placeholder='enter description';
        newdes1.placeholder='enter description';
        newdes.type='text';
        // newdes.id='newdes';
        newdes.className='newdes';
        newdes1.className='newdes1';
        const newimage=document.createElement('input');
        newimage.placeholder='new img src';
        newimage.type='text';
        newimage.className='newimg';
        const editit=document.createElement('button');
        editit.innerHTML="Editit";
        const count=document.createElement('input');
        count.className='newcount';
        count.type='number';
        count.placeholder='type image number';
        editdiv.append(newtour,newdes,newdes1,count,newimage,editit,close);
        editdiv.style.display='none';



        let i=0;
        while(i<item.image.length)
        {
        const img=document.createElement('img');
        img.src=item.image[i];
        img.alt='image';
        arr.push(item.image[i]);
        // container1.append(img);
        iner2.append(img);
        i++;
        }

    
        edit.innerText="Edit";
        delet.innerText="Delete";
        imgadd.innerText="Addimg";
        imgadd.style.width='120px';

        
        close.addEventListener('click',()=>{
            editdiv.style.display='none';
        })
        edit.addEventListener('click',()=>{
            editdiv.style.display='block';
        })
        editit.addEventListener('click',()=>{
            const a=document.getElementsByClassName('newtour');
            console.log(typeof a);
            const b=document.getElementsByClassName('newdes');
            const c=document.getElementsByClassName('newimg');
            const d=document.getElementsByClassName('newcount');
            handleedit(item.id,a[index].value,b[index].value,d[index].value,c[index].value,arr);
            
        })
        imgadd.addEventListener('click',()=>{
            handleadd(item.id,item.tour,item.description,arr);
        })


        delet.addEventListener('click',()=>{
            handledelet(item.id);
        })

        // container.append(tour,description,imgadd,edit,delet);
        const feild=document.createElement('fieldset');
        const feild1=document.createElement('fieldset');
        const legend=document.createElement('legend');
        legend.innerText='Image';
        const legend1=document.createElement('legend');
        legend1.innerText='Memory';
        feild1.className='feild1';
        feild.className='feild';
        // feild.style.backgroundColor="rgb(255, 164, 27)";
        // feild1.style.backgroundColor="yellow";
        legend1.style.color='rgb(255, 164, 27)';
     
        
        
        const space=document.createElement('br');
        
        

        iner1.append(tour,description,imgadd,edit,delet,editdiv);
        feild.append(legend,iner2);
        feild1.append(legend1,iner1,feild);
        container1.append(feild1,space);
        
        
})
}

//to add more image to a particular tour
function handleadd(id,t,des,arr){
    const input=window.prompt(" enter image src");
    let text="are you sure";
    if(confirm(text)==true)
    {
    const url= `http://localhost:3000/memory/${id}`;
    // var arr=["./aboutus.jpeg"];
    //to add multiple element in array
    arr.push(input);

    const updateblog={
        email2:email.value,
        password2:password.value,
        tour:t,
        description:des,
        image:arr
    }
    fetch(url,{
     method:'PUT',
     headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(updateblog)
})
.then(response=>{
    if(response.ok)
    {
        // alert(`image added sucessfuly`);
    }
    else{
        alert("error");
        // throw new Error("error");
    }
})
.catch(error=>{
    console.log(error);
})

}
}

// edit your tour details
function handleedit(id,x,y,count,z,arr){
if(x=="" || y==""|| count==" " || z==" ")
{
    alert('kindly filled all');
}
else{
    const url= `http://localhost:3000/memory/${id}`;
    alert('processing');
    // const a=document.getElementById('newtour');
    // const b=document.getElementById('newdes');
    arr.splice(count-1,1,z);

    const updateblog={
        email2:email,
        password2:password,
        tour:x,
        description:y,
        image:arr
    }
    fetch(url,{
     method:'PUT',
     headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(updateblog)
})
.then(response=>{
    if(response.ok)
    {
        alert('updated');
    }
    else{
        alert("error");
        // throw new Error("error");
    }
})
.catch(error=>{
    console.log(error);
})

}
}


// add more tour memory
function add()
{
    var tour=document.getElementById("tour").value;
    var des=document.getElementById("des").value;
    var image=document.getElementById("imgsrc").value;

    if(tour==""||des==""||image=="")
    {
        alert("fill all required carefully");
    }
    else{
        alert("added succesfully");
        const array=[];
        array.push(image);
    const url1= "  http://localhost:3000/memory";
    const newmemory={
        email2:email,
        password2:password,
        tour:tour,
        description:des,
        image:array
        
    }
    fetch(url1,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newmemory)
    })
    .then(response=>response.json())
    .then(data=>{
    console.log(data);
    })

    .catch(error=>{
        console.log(error);
    })
}
 }


 //delet the tour memeory
 function handledelet(id)
{
    const url= `http://localhost:3000/memory/${id}`;
    fetch(url,{
        method:'DELETE',
    })

    .then(response=>{
        if(response.ok)
        {
            alert(` one memory deleted`);
        }
        else{
            alert("error");
            // throw new Error("error");
        }
    })

}



//logout from system
 function logout()
 {
    const text='are you want to logout';
    if(confirm(text)==true)
    {
   localStorage.removeItem('token');
   localStorage.removeItem('email');
   localStorage.removeItem('password');
   window.location.href='./landingpage.html';
    }
 }

 //Darkmode light mode functionality
function darkmod()
{
  

    const dk=document.getElementById('dark-btn');
    if(dk.className=='fa-solid fa-moon')
    {
    const el=document.body;
    el.classList.toggle("dark-mode");
    dk.className='fa-sharp fa-solid fa-moon';
    dk.style.color='orange';
    }
    else{
        const el=document.body;
        el.classList.toggle("dark-mode");
        dk.className='fa-solid fa-moon';
        dk.style.color='white';
    }



 }


