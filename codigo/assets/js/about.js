
// Constantes
const logo = document.querySelector("#Logomarca");
const money = document.querySelector("#money");
const Edit = document.querySelector("#EditPie");

// Botao home
logo.addEventListener("click", function(){
    window.location.href = "index.html";
})

// Dados iniciais do grafico
var ValuesPercentage = ["Falso Pagamento", "Invasão de contas", "Anúncio falso", "Outros"];
var ValuesNames = [54 ,22, 21, 3];

// Ler local storage
if (localStorage.getItem("percentages"))
{
  ValuesPercentage = JSON.parse(localStorage.getItem("percentages"));
}
else
{
  SetPercentageOriginal();
}

if (localStorage.getItem("names"))
{
  ValuesNames = JSON.parse(localStorage.getItem('names'));
}
else
{
  SetNameOriginal();
}

// Editar grafico
Edit.addEventListener("click", function(){
  
  // Editar porcentagens
  let tmp = prompt("Forneca o valor de quatro porcentangens separados por espaco: ");
  if (tmp === '')
  {
    SetPercentageOriginal();
  }
  else
  {
    tmp = tmp.split(' ');
    for (let i = 0; i < 4; i++)
    {
      ValuesPercentage[i] = parseInt(tmp[i]);
    }
  }
  localStorage.setItem("percentages", JSON.stringify(ValuesPercentage));

  // Editar nomes
  tmp = prompt("Forneca quatro nomes separados por espaco: ");
  if (tmp === '')
    {
      SetNameOriginal();
    }
    else
    {
      tmp = tmp.split(' ');
      for (let i = 0; i < 4; i++)
      {
        ValuesNames[i] = tmp[i];
      }
    }
    localStorage.setItem("names", JSON.stringify(ValuesNames));

  UpdateGraph();
})

// Funcoes para dados originais
function SetPercentageOriginal(){
    ValuesPercentage[0] = 54;
    ValuesPercentage[1] = 22;
    ValuesPercentage[2] = 21;
    ValuesPercentage[3] = 3;
}

function SetNameOriginal(){
    ValuesNames[0] = "Falso Pagamento";
    ValuesNames[1] = "Invasão de contas";
    ValuesNames[2] = "Anúncio falso";
    ValuesNames[3] = "Outros";
}

// Dados do grafico
var Tsize = 26;

// Controlar responsividade do grafico          
// NOTA : Usar F5 para atualizar o grafico apos alteracao da resolucao da pagina
if (window.matchMedia("(max-width:500px").matches)
{
  Tsize = 18;
}

// Dados do grafico
var Colors = ["#FF6445","#45FF77","#45FFF5","#62807E" ];
var data = {
      type: "pie",
      labels: "Grafico",
      data: {
        labels: ValuesNames,
        datasets: [{
          borderWidth: 2,
          borderColor: "#222",
          backgroundColor: Colors,
          data: ValuesPercentage,
        }],
      },
      options: {
          title: {
              display: true,
              text: "Tipos mais comuns de golpes",
              fontSize: Tsize,
              fontColor: "#333",
          },
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              fontSize : (Tsize-6),
              fontStyle: "bold",
              fontColor: "#333",
            }
          }
      }
    };

// Constante do grafico
const MyChart = new Chart("piechart", data);

// Atualizar grafico
function UpdateGraph (){ 
  MyChart.update();
}

// Apresentar numero de reais perdidos
var target = 22.9;
let x = 0;
var interval = setInterval(function(){
  if (x < target && x < 22)
  {x += 1}
  if (x >= 22 && x < target)
  { x += 0.3}
  if (x > target)
  {x = target}
  if (x == target)
  {
      clearInterval(interval)
  };
  money.innerHTML = x + " Bilhões de reais";
}, 40);