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

const arr=[];
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
    const container=document.getElementById('div');
    const container1=document.getElementById('div1');
    data.map(item=>{
        const title=document.createElement('h2');
        const description=document.createElement('p');
        title.innerText="email:"+item.email;
        description.innerText="description:"+item.description;
        const edit=document.createElement('button');
        const delet=document.createElement('button');
        const imgadd=document.createElement('button');
        let i=0;
        while(i<item.image.length)
        {
        const img=document.createElement('img');
        img.src=item.image[i];
        img.alt='image';
        arr.push(item.image[i]);
        container1.append(img);
        i++;
        }

    
        edit.innerText="edit";
        delet.innerText="delet";
        imgadd.innerText="addmoreimg";
        imgadd.style.width='120px';
        // edit.addEventListener('click',()=>{
        //     handleedit(item.id);
        // })
        imgadd.addEventListener('click',()=>{
            handleadd(item.id);
        })


        // delet.addEventListener('click',()=>{
        //     handledelet(item.id);
        // })
   
        container.append(title,description,imgadd,edit,delet);
})
}


function handleadd(id){
    let text="add your image src";
    if(confirm(text)==true)
    {
    const url= `http://localhost:3000/memory/${id}`;
    const input=window.prompt("enter image");
    // var arr=["./aboutus.jpeg"];
    arr.push(input);

    const updateblog={
        email:"chandan@123",
        password:"111",
        description:"puri",
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
        alert(`image added sucessfuly`);
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

//edit your tour details
function handleedit(id){
    const url= `http://localhost:3000/memory/${id}`;
    const newtask=window.prompt("enter task");

    const updateblog={
        task:newtask
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
        alert(`blog with id ${id} updated`);
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