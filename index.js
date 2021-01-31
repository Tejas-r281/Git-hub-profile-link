const git_links = "https://api.github.com/users/";
const overall = document.querySelector('.overall');
const loading = document.querySelector('.loading')
const container = document.querySelector('.container')
const beformain = document.querySelector('.beforemain');
const heading = document.querySelector('.heading')
const reload = document.querySelector('.reload');
var details = [];
container.innerHTML = '';
var git_link;
const form = document.querySelector('.form');
const text = document.querySelector('.text');

form.addEventListener('submit', (e) => {
    e.preventDefault();

})
text.addEventListener('change', (e) => {
    loading.classList.remove('hidden');
    beformain.classList.add('hidden');


    git_link = git_links + e.target.value;
    const finaldata = justcheck(git_link);

    finaldata.then((e) => {
        if (e == "right") {
            loading.classList.add('hidden');


            setTimeout(() => {
                getdata();
                beformain.classList.add('hidden');
                container.classList.remove('gate');
            }, 1);
        }
        else {
            text.value = '';
            heading.innerHTML = "Please Enter the correct user name <br> So that i could fetch your data from git hub <br> <span> Please try again<span>"
            loading.classList.add('hidden');
            beformain.classList.remove('hidden');

        }
    })


})

const upper = document.createElement('div')
upper.setAttribute('class', 'upper');
container.insertAdjacentElement('afterbegin', upper);
const fork = document.createElement('div')
fork.setAttribute('class','fork');
fork.innerHTML='Fork';
container.insertAdjacentElement('afterbegin',fork);

const self = document.createElement('div')
self.setAttribute('class','self');
self.innerHTML='Self Made';
container.insertAdjacentElement('afterbegin',self);

// container.insertAdjacentElement('afterbegin',fork);
const all = document.createElement('div')
all.setAttribute('class','self all');
all.innerHTML='All';
container.insertAdjacentElement('afterbegin',all);


const lower = document.createElement('div')
lower.setAttribute('class', 'lower');
container.insertAdjacentElement('beforeEnd', lower);


function dividerline() {
    const hr = document.createElement('hr');
    hr.setAttribute('class', 'divider');
    lower.insertAdjacentElement('beforebegin', hr);

}
function searchs(data, element) {
    var cont;
    const value = data.forEach((content, index) => {
        if (content[element]) {
            cont = content[element]
        }
    })
    return cont;

}

async function justcheck(data) {
    try {
        const fectdata = await fetch(data);
        const fectdatas = await fectdata.json();
        if (fectdatas.name) {
            return ('right');
        }
        else {
            return ("wrong");
        }

    } catch (error) {
        console.log(error);
    }

}

var my_details = [];

async function getdata(link) {
    try {
        const fetchs = await fetch(git_link);

        const fetchsdata = await fetchs.json();
        my_detail = {
            my:
            {
                image: fetchsdata.avatar_url,
                bio: fetchsdata.bio,
                email: fetchsdata.blog,
                followers: fetchsdata.followers,
                following: fetchsdata.following,
                Public_repos: fetchsdata.public_repos,
            }
        };

        details.push(my_detail)
        await setdata(fetchsdata);
        await setbutton(fetchsdata.repos_url);

    } catch (error) {
        console.log(error);
        return error;
    }
}
function adjustdate(data)
{
    const times = new Date(data);
    const day = times.getDate();
    const month = times.getMonth() + 1;
    const year = times.getFullYear();
    const value = `${`${day < 10 ? `0${day}` : `${day}`}`}/${`${month < 10 ? `0${month}` : `${month}`}`}/${year}`

    return value;
}
async function setdata(data) {

    const dates= adjustdate(data.created_at)
    // console.log(dates);
    var html = `
    <div class="image">
        <img src=${data.avatar_url}>
    </div>
    <div class="bio">

        <div class="names">${data.name}</div>
        <div class="about">${data.bio ? data.bio : ''}</div>
        <div class="repos"><span> Public Repos: <span>${data.public_repos}</div>
        <div class="createds"> <span> Created at: </span>${dates}</div>
    </div>
`
    upper.innerHTML = html;
}
async function setbutton(data) {
    try {
        const fetchs = await fetch(data);
        const fetchsdata = await fetchs.json();
        // const selfmades = await controller(fetchsdata);
     const selfmades=   await controller(fetchsdata,'All')
     stickbutton(selfmades);
     all.style.background='black';
     all.style.color='white';
     all.classList.add('clicked');
       await getvalue(fetchsdata);



    } catch (error) {
        console.log(error);
    }
}
const decide= [all,fork,self];
async function getvalue(data)
{

decide.forEach((element)=>{
    element.addEventListener('click',(async(e)=>{
        const text = element.innerHTML;
        color();
        element.style.background="black";
        element.style.color="white";
        element.classList.add('clicked');
        // element.classList.toggle('toggle');
        const selfmades = await controller(data,text);
        stickbutton(selfmades);
    }))
})
}
function color()
{
decide.forEach((element)=>{
     if(element.classList.contains('clicked'))
     {
         console.log(element.innerHTML);
         element.style.background="red";
         element.style.color="black";
        //  element.classList.remove('clicked');
     }
    // console.log(element);
})
}

async function controller(data,text) {
    try {
        console.log(text);

        const filters = await data.filter((element) => {
            if (text=='All') {
                return element;
            }
            else if(text=="Fork"&&(element.fork))
            {
                return element;
            }
            else if(text=='Self Made'&&(!element.fork))
            {
              return element;
            }

        })
        return filters;
    } catch (error) {
        console.log(error);
    }
}

async function stickbutton(data) {

    var obj;
    var html1 = '';
    data.forEach(element => {
        //    console.log(element);
        html1 += `
          <button class="btn" id="${element.id}">${element.name}</button>
`
        const ids = element.id;
        obj = {
            [ids]:
        {
            name: element.name,
            repos: element.html_url,
            git: element.owner.html_url,
            created:element.created_at
        }
        }
        details.push(obj);
    });
    lower.innerHTML = html1;
    const button = lower.querySelectorAll('.btn');
    button.forEach((element) => {
        element.addEventListener('click', (e) => {
            fillcover(details, element.id);
        })
    })

}
dividerline();

const cover = document.querySelector('.cover');
const style= document.createElement('style');
async function fillcover(data, element) {
    const personal = data[0].my;
    const value = await searchs(data, element);
    // console.log(value);
    const cover_content = document.createElement('div');
    cover_content.setAttribute('class', 'cover_content');
    cover.insertAdjacentElement('afterbegin', cover_content);
style.innerHTML=`
.cover_content::after{
    background:  url("${personal.image}");
}
`
document.head.append(style);
    cover_content.innerHTML = `
 <div class="project_name">
 <span class="pn">Project Name: &nbsp;
<span class="b">${value.name}</span> </span>
<span class="cross"><a href="" class="fas fa-2x fa-times"></a></span>
</div>
<div class="created">
<span class="cd">Created: &nbsp;</span>
<span class="b">

"${value.name}" was created at ${adjustdate(value.created)}</span>
</div>
<div class="go_to">
<span>Repository Url: &nbsp;</span>
<a class="go_to_link b" href="${value.repos}" target="_blank">Click here</a>
</div>
<div class="email">
<span class="el">Email: &nbsp;</span>
<span class="b">
${personal.email? personal.email:"Email not available"}
</span>
</div>
<div class="follow">
<div class="followers">
 <div class="count b">${personal.followers}</div>
 <div class="fs">followers: &nbsp;</div>
</div>
<div class="following">
 <div class="count b">${personal.following}</div>
 <div class="fg">following: &nbsp;</div>
</div>
</div>
<div class="git_link">
<span class="gk">Your's Git hub link :&nbsp;</span>
<a class="b" href="${value.git}" target="_blank" rel="noopener noreferrer">click here</a>
</div>
 `
cover.classList.remove('hide');
beformain.classList.add('hidden');

const cross= cover_content.querySelector('.cross');
cross.addEventListener('click',((e)=>{
    cover.classList.add('hide');
    cover.innerHTML='';
}))

}



