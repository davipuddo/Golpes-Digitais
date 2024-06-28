const logo = document.querySelector("#Logomarca");
const back = document.querySelector("button#back");
const text = document.querySelector("#doc");

// Ir para homepage
logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

back.addEventListener("click", function(){
    window.location.href = "index.html";
})

var data = {};
if (localStorage.getItem('db'))
{
    let n = parseInt(window.location.search[3]);
    data = JSON.parse(localStorage.getItem('db'))[n].text;
    text.innerHTML = marked.parse(data);
}
