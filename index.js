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
// var fetchsdata;
var details = [];
container.innerHTML = '';
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
function searchs(data, element) {
    // console.log(element);
    var cont;
    const value = data.forEach((content, index) => {
        //   console.log(data[279918867]);
        if (content[element]) {
            // console.log(content[element]);
            cont = content[element]
            // console.log(cont);
            // break;
        }
    })
    //    console.log(cont);
    return cont;

}

async function justcheck(data) {
    try {
        const fectdata = await fetch(data);
        const fectdatas = await fectdata.json();
        // console.log(fectdatas);
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

var my_details = [];

async function getdata(link) {
    try {
        const fetchs = await fetch(git_link);
        // console.log(fetchs);

        const fetchsdata = await fetchs.json();
        // console.log(fetchsdata);
        // tillbottom= fetchsdata;
        // await tillbottom (fetchsdata);
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

        //   console.log(my_details);
        // my_details.push(my_detail);
        // console.log(my_details[0]);
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
// console.log(my_details);
async function setdata(data) {

    const dates= adjustdate(data.created_at)
    console.log(dates);
    // console.log(value);
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
        // console.log(fetchsdata);
        const selfmades = await selfmade(fetchsdata);
        // console.log("raushan");
        // console.log(selfmades);
        // const total_detail={

        // }
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

    var obj;
    var html1 = '';
    data.forEach(element => {
           console.log(element);
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
    // console.log(button);
    button.forEach((element) => {
        element.addEventListener('click', (e) => {
            //    console.log(element);
            fillcover(details, element.id);
        })
    })

    //    console.log(details[0].my);
}
// console.log(JSON.stringify(my_details));
// console.log(my_details[0].my.email);
// console.log(details[0]);
dividerline();

const cover = document.querySelector('.cover');
const style= document.createElement('style');
async function fillcover(data, element) {
    const personal = data[0].my;
    const value = await searchs(data, element);
    // console.log(personal);
    console.log(value);
    const cover_content = document.createElement('div');
    cover_content.setAttribute('class', 'cover_content');
    cover.insertAdjacentElement('afterbegin', cover_content);
style.innerHTML=`
.cover_content::after{
    background:  url("${personal.image}");
}
`
document.head.append(style);
// cover.innerHTML='';
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
// console.log('completed');
cover.classList.remove('hide');
beformain.classList.add('hidden');

const cross= cover_content.querySelector('.cross');
cross.addEventListener('click',((e)=>{
    // console.log('clicked');
    cover.classList.add('hide');
    cover.innerHTML='';
}))

}



