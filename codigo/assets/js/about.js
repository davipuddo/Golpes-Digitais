
            var ValuesNames = ["Falso Pagamento", "Invasão de contas", "Anúncio falso", "Outros"];
            var ValuesPercentage = [54, 22, 21, 3];
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
                        fontSize: 26,
                        fontColor: "#333",
                    },
                    legend: {
                      position: "right",
                      labels: {
                        usePointStyle: true,
                        fontSize : 16,
                        fontStyle: "bold",
                        fontColor: "#333",
                      }
                    }
                }
              };
          new Chart("piechart", data);
          var money = document.querySelector("#money");
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