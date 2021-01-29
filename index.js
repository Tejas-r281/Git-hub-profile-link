const git_links = "https://api.github.com/users/";
// container.innerHTML='';
const container= document.querySelector('.container')
const beformain= document.querySelector('.beforemain');
const heading = document.querySelector('.heading')
const reload =document.querySelector('.reload');
  reload.addEventListener('click',((e)=>{
      location.reload();
  }))
var git_link;
const form = document.querySelector('.form');
// console.log(container);
const text = document.querySelector('.text');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
})
text.addEventListener('change',(e)=>{
    console.log(e.target.value);
git_link= git_links+e.target.value;
console.log(git_link);


  const finaldata= justcheck(git_link);
// var result;
// console.log(finaldata);
finaldata.then((e)=>{
    if(e=="right")
    {
        getdata();
        text.value='';
beformain.classList.add('hidden');
container.classList.remove('gate');
    }
    else
    {
        heading.innerHTML="Please Enter the correct user name <br> So that i could fetch your data from git hub <br> <span> Please try again<span>"
    }
})
// console.log(result);
//  const final= 

// console.log(final);

})

const upper = document.createElement('div')
upper.setAttribute('class','upper');
container.insertAdjacentElement('afterbegin',upper);


const lower = document.createElement('div')
lower.setAttribute('class','lower');
container.insertAdjacentElement('beforeEnd',lower);
// var html1 =`<hr class="divider">`;

function dividerline()
{
    const hr = document.createElement('hr');
hr.setAttribute('class','divider');
lower.insertAdjacentElement('beforebegin',hr);

}



async function getdata(link)
{
    try {
        const fetchs =await fetch(git_link);
        // console.log(fetchs);
        const fetchsdata = await fetchs.json();
        console.log(fetchsdata);
        const fetch1=await setdata(fetchsdata);
        await setbutton(fetchsdata.repos_url);
        // return fetch1;
    } catch (error) {
        console.log(error);
        return error;
    }
}




async function setdata(data)
{
    // console.log(data);
    const times =  new Date(data.created_at);
    const day= times.getDate();
    const month=times.getMonth();
    const year= times.getFullYear();
    const value= `${`${day<10? `0${day}`: `${day}`}`}/${`${month<10? `0${month}`: `${month}`}`}/${year}`
    // console.log(value);
    var html =`
    <div class="image">
        <img src=${data.avatar_url}>
    </div>
    <div class="bio">
     
        <div class="name">${data.name}</div>
        <div class="about">${data.bio? data.bio:''}</div>
        <div class="repos"><span> Public Repos: <span>${data.public_repos}</div>
        <div class="created"> <span> Created at: </span>${value}</div>
    </div>
`
upper.innerHTML= html;
}


async function setbutton(data)
{
    try {
        const fetchs = await fetch(data);
        const fetchsdata = await fetchs.json();
        // console.log(fetchsdata);
        const selfmades = await selfmade(fetchsdata);
        // console.log("raushan");
        // console.log(selfmades);
        stickbutton(selfmades);
        
    } catch (error) {
        console.log(error);
    }
}

async function selfmade(data)
{
    // console.log(data);
    try {
        
      const filters=  await data.filter( (element)=>
        {
            if(!element.fork)
            {
                // console.log(element);
                return element;
            }
        })
        // console.log('raushan');
        // console.log(filters);
        return filters;
    } catch (error) {
        console.log(error);
    }

    
}

async function stickbutton(data)
{
    // console.log(data);
    var html1='';
   data.forEach(element => {
    //    console.log(element);
     html1 += `
          <button class="btn">${element.name}</button>
`
   });
   lower.innerHTML= html1;
}
dividerline();

async function justcheck(data)
{
    try {
        const fectdata= await fetch(data);
        const fectdatas= await fectdata.json();
        // console.log(fectdatas);
        if (fectdatas.name) {
            return('right');
        }
        else{
            return("wrong");
        }
        
    } catch (error) {
        console.log(error);
    }

    // return "raushan"
}