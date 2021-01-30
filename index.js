const git_links = "https://api.github.com/users/";
const overall = document.querySelector('.overall');
const loading = document.querySelector('.loading')
// console.log(loading);
const container = document.querySelector('.container')
const beformain = document.querySelector('.beforemain');
const heading = document.querySelector('.heading')
const reload = document.querySelector('.reload');
// reload.addEventListener('click', ((e) => {
//     location.reload();
// }))
container.innerHTML='';
var git_link;
const form = document.querySelector('.form');
// console.log(container);
const text = document.querySelector('.text');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
})
text.addEventListener('change', (e) => {
    loading.classList.remove('hidden');
    beformain.classList.add('hidden');
    // reload.classList.add('hidden');
    
    git_link = git_links + e.target.value;
  


    const finaldata = justcheck(git_link);
   
    finaldata.then((e) => {
        if (e == "right") {
            loading.classList.add('hidden');
            
    // reload.classList.remove('hidden');
           
           setTimeout(() => {
            getdata();
            // text.value = '';
            beformain.classList.add('hidden');
            container.classList.remove('gate');
           }, 1);
        }
        else {
            text.value = '';
            heading.innerHTML = "Please Enter the correct user name <br> So that i could fetch your data from git hub <br> <span> Please try again<span>"
            loading.classList.add('hidden');
            beformain.classList.remove('hidden');
            // reload.classList.remove('hidden');
           
        }
    })
    

})

const upper = document.createElement('div')
upper.setAttribute('class', 'upper');
container.insertAdjacentElement('afterbegin', upper);


const lower = document.createElement('div')
lower.setAttribute('class', 'lower');
container.insertAdjacentElement('beforeEnd', lower);


function dividerline() {
    const hr = document.createElement('hr');
    hr.setAttribute('class', 'divider');
    lower.insertAdjacentElement('beforebegin', hr);

}

async function justcheck(data) {
    try {
        const fectdata = await fetch(data);
        const fectdatas = await fectdata.json();
        console.log(fectdatas);
        if (fectdatas.name) {
            return ('right');
        }
        else {
            return ("wrong");
        }

    } catch (error) {
        console.log(error);
    }

    // return "raushan"
}

async function getdata(link) {
    try {
        const fetchs = await fetch(git_link);
       
        const fetchsdata = await fetchs.json();
        console.log(fetchsdata);
        const fetch1 = await setdata(fetchsdata);
        await setbutton(fetchsdata.repos_url);
       
    } catch (error) {
        console.log(error);
        return error;
    }
}
async function setdata(data) {
    
    const times = new Date(data.created_at);
    const day = times.getDate();
    const month = times.getMonth()+1;
    const year = times.getFullYear();
    const value = `${`${day < 10 ? `0${day}` : `${day}`}`}/${`${month < 10 ? `0${month}` : `${month}`}`}/${year}`
    // console.log(value);
    var html = `
    <div class="image">
        <img src=${data.avatar_url}>
    </div>
    <div class="bio">
     
        <div class="name">${data.name}</div>
        <div class="about">${data.bio ? data.bio : ''}</div>
        <div class="repos"><span> Public Repos: <span>${data.public_repos}</div>
        <div class="created"> <span> Created at: </span>${value}</div>
    </div>
`
    upper.innerHTML = html;
}
async function setbutton(data) {
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
async function selfmade(data) {
    // console.log(data);
    try {

        const filters = await data.filter((element) => {
            if (!element.fork) {
                // console.log(element);
                return element;
            }
            // return element;
        })
        // console.log('raushan');
        // console.log(filters);
        return filters;
    } catch (error) {
        console.log(error);
    }


}
async function stickbutton(data) {
    // console.log(data);
    var html1 = '';
    data.forEach(element => {
        //    console.log(element);
        html1 += `
          <button class="btn">${element.name}</button>
`
    });
    lower.innerHTML = html1;
    const button = lower.querySelectorAll('.btn');
    // console.log(button);
   button.forEach((element)=>{
       element.addEventListener('click',(e)=>{
        //    console.log(element);
        //    console.log(e);
       })
   })

    
}
dividerline();

