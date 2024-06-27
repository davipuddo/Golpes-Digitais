const logo = document.querySelector("#Logomarca");
const text = document.querySelector("#doc");
const reports = document.querySelector(".report");

// Ir para homepage
logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

// Ir para denuncias
reports.addEventListener('click', function(){
    window.location.href = "Report.html"
})

var data = {};
if (localStorage.getItem('db'))
{
    let n = parseInt(window.location.search[3]);
    data = JSON.parse(localStorage.getItem('db'))[n].text;
    text.innerHTML = marked.parse(data);
}

if (window.matchMedia("(max-width:650px)").matches)
{
    if (!confirm("Resolução não suportada, deseja continuar?"))
    {
        window.location.href = "index.html";
    }
}
