const git_link = "https://api.github.com/users/";
const container = document.querySelector('.container');
const contents =document.querySelector('.content');
const main = document.querySelector('.main');
const form= document.querySelector('#form');
const input= document.querySelector('#text');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
})

input.addEventListener('change',async(e)=>{
    // console.log(e.target.value);
    // contents.innerHTML='';
    // main.innerHTML='';
  var git_links;
    try {
        const additional= e.target.value;
        git_links=git_link+additional;
        console.log(git_links);
        input.value='';
const git = async () => {
    try {
        const data = await fetch(git_links);
        const data_fetch = await data.json();
        // console.log(data_fetch);
        return data_fetch;
    } catch (error) {
        console.log(error);
    }
}
const data = git();
data.then((e) => {
    // console.log(e.repos_url);
    return e;
}).then(async (e) => {
    try {
        const data = await fetch(e.repos_url);
        const data_fetch = await data.json();
        //  console.log(data_fetch);
        const real = data_fetch.filter((element, index) => {
            if (element.fork != true) {
                // console.log(e.name);
                return element;
            }
        })
        // console.log(real);
        return { real, e };
    } catch (error) {
        console.log(error);
    }
}).then((content) => {
    const details = content.e;
    // console.log(details);
    const main = document.createElement('div');
    const name_div = document.createElement('div');
    const image_div = document.createElement('div');
    image_div.setAttribute('class','image');
    name_div.setAttribute('class','details');
    main.setAttribute('class', 'projects');
    contents.insertAdjacentElement('beforeend', main);
    // console.log(content.real);
    // main.style.background="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
    const cssTemplateString = `.main::after{background: url("${details.avatar_url}")}`;
    const styleTag = document.createElement("style");
      styleTag.innerHTML = cssTemplateString;
     document.head.insertAdjacentElement('afterEnd', styleTag);
    const html1=`
    <h1 class="name"><span class="heading">Name:&nbsp;</span>${details.name}</h1>
    <h1 class="bio"><span class="heading">Bio:&nbsp;</span> ${details.bio}</h1>
`;
const html2=`
<img src=${details.avatar_url};
    alt="sorry your image not availabe in the git hub profile" srcset="">
`
image_div.innerHTML=html2;
// contents.insertAdjacentElement('beforebegin',image_div);
name_div.innerHTML=html1;
contents.insertAdjacentElement('afterbegin',name_div);
var html='';
    content.real.forEach(element => {

        html += `
        <a href=${element.html_url}>
    <button>${element.name}</button>
</a>
        `
    });
    main.innerHTML= html;
    // console.log(html);
})
    } catch (error) {
        console.log(error);
    }
    // location.reload();
}
)



