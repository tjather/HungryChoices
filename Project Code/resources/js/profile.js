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

const ctx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["French", "Chinese", "Indian", "American", "Japanese"],
        datasets: [{
            label: "Food Stats",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [10, 10, 10, 10, 10]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Recipe Choice Data!'
        }
    }
});