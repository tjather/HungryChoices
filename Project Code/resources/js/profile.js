//Change Banner Function

var loadFileB = function (event) {
  var image = document.getElementById("banner-output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

//Change PFP Function

var loadFilePFP = function (event) {
  var image = document.getElementById("PFPoutput");
  image.src = URL.createObjectURL(event.target.files[0]);
};

//Pie Chart
//TODO: Implement variables in pie chart to reflect region likes array numbers.

var numFr = 0, numCh = 0, numIn = 0, numAm = 0, numJa = 0, numIt = 0;

$.ajax({
    type: "GET",
    url: "/db/getlikes"
  }).then(resp => {
    if (resp.data == "epic embed fail") {
      console.log("epic embed fail");
    } else {
      var likes = resp.data[0].likes;
      
      for (let index = 0; index < likes.length; index++) {
          const element = likes[index];
          
        if (element == "Mac n Cheese") {
            numIt++;
        } else if (element == "Fried Chicken" || element == "Jello") {
            numAm++;
        } else if (element == "Peking Roasted Duck" || element == "Sweet and Sour Pork" || element == "Ma Po Tofu" || element == "Chow Mein") {
            numCh++;
        } else if (element == "Biryani" || element == "Dosa" || element == "Saag Paneer" || element == "Korma" || element == "Tandoori Chicken") {
            numIn++;
        } else if (element == "Quenelles" || element == "Coq au Vin" || element == "Bouillabaisse" || element == "Ratatouille" || element == "Foie Gras") {
            numFr++;
        } else if (element == "Kare-Raisu" || element == "Okonomiyaki" || element == "Yakitori" || element == "Karaage" || element == "Yakisoba") {
            numJa++;
        }
      }
    }

    console.log(numAm)

    const ctx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["French", "Chinese", "Indian", "American", "Japanese", "Italian"],
            datasets: [{
                label: "Food Stats",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#ff0000"],
                data: [numFr, numCh, numIn, numAm, numJa, numIt]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Recipe Choice Data!'
            }
        }
    });
  });