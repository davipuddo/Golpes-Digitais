
            var xValues = ["Italy", "France", "Spain", "USA"];
            var yValues = [55, 49, 44, 24];
            var barColors = [
              "#b91d47",
              "#00aba9",
              "#2b5797",
              "#e8c3b9" 
            ];
            
            var data = {
                type: "pie",
                data: {
                  labels: xValues,
                  datasets: [{
                    borderColor: "#555",
                    backgroundColor: barColors,
                    data: yValues,
                    hoverOffset: "7"
                  }],
                },
                options: {
                    title: {
                        display: false,
                        text: "World Wide Wine Production 2018"
                  }
                }
              };
            
          new Chart("piechart", data);