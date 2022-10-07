// This whole file is Kevin's code

var cardContainer = document.querySelector('.card-container');
var allCards = document.querySelectorAll('.food-card');
var no = document.getElementById('no');
var yes = document.getElementById('yes');

var likes=[];
var dislikes=[];
var dishes = [];

// DELETE THIS LATER (counter for random images)
var count = 1;

function refreshCards() {
  allCards = document.querySelectorAll('.food-card');
  var cards = document.querySelectorAll('.food-card:not(.removed');
  
  cards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
  });

  var img = document.getElementById("LoadingImage");
  if (img) {
    img.remove();
  }
  cardContainer.classList.add('loaded');
}

function addCard(element) {
  // Do some API call to the database to retrieve next cards
  var temp = document.createElement("div");
  temp.setAttribute("class", "food-card");
  temp.style = "height: 60%;";

	var imgHolder = document.createElement("div");
	imgHolder.classList.add("rounded");
	imgHolder.style = "overflow: hidden; width: 15rem; height: 15rem;  position: relative; left: 20%;";

  var tempIMG = document.createElement("img");
  tempIMG.setAttribute("src", element.img_src);
  

	if (element.img_type == "Square") {
		tempIMG.style = "z-index: 0; display: block; object-fit: cover; height: 110%;";
	} else if (element.img_type == "Landscape") {
		tempIMG.style = "z-index: 0; display: block; object-fit: cover; height: 110%;";
	} else if (element.img_type == "Portrait") {
		tempIMG.style = "z-index: 0; display: block; position: relative; top: -50%; max-width: 110%;";
	}

  var tempH = document.createElement("h3");
  tempH.innerHTML = element.name;
	tempH.style = "z-index: 0; display: block;"

  // var tempP = document.createElement("p");
  // tempP.innerHTML = "Paragraph Text Here";

  count++;

	imgHolder.append(tempIMG);
  temp.appendChild(imgHolder);
  temp.appendChild(tempH);

  var section = document.getElementById("card-section");
  section.appendChild(temp);
  addCardFunc(temp);
}

function addCardFunc(el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');

    if ((event.deltaX) === 0 || ((event.center.x === 0) && (event.center.y === 0))) return;

    el.classList.toggle('yes', )

    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    el.classList.toggle('yes', event.deltaX > 0);
    el.classList.toggle('no', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');

    var moveOutWidth = document.body.clientWidth;
    // var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    var keep = (event.center.x > (document.body.clientWidth / 3)) && (event.center.x < (document.body.clientWidth * 2 / 3));

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';

      // addCard();
      // refreshCards();

      if (el.classList.contains("yes")) {
        updateUserChoice(el, true)
      } else {
        updateUserChoice(el, false)
      }
    }
  });
}

function createButtonListener(yes) {
  return function (event) {
    var cards = document.querySelectorAll('.food-card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) {
      return false;
    }

    var card = cards[0];

    card.classList.add('removed');

    if (yes) {
      // Update the db to reflect a yes answer
      updateUserChoice(card, yes)
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      // Update the db to reflect a no answer
      updateUserChoice(card, yes)
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    // addCard();
    // refreshCards();

    event.preventDefault();
  };
}

function updateUserChoice(card, choice) {
  if (choice) {
    // Update the db to reflect a yes answer
    var likes = [];
    var recipe_name = card.childNodes[1].innerHTML;

    $.ajax({
      type: "GET",
      url: "/db/getlikes"
    }).then(resp => {
      if (resp.data == "epic embed fail") {
        console.log("epic embed fail");
      } else {
        likes = resp.data[0].likes;

        if ((likes == null) || (!likes.includes(recipe_name))) {
          $.ajax({
            type: "POST",
            url: "/db/like",
            data: {
              "recipe_name": recipe_name
            }
          });
        }
      }
    });
  } else {
    // Update the db to reflect a no answer
    var likes = [];
    var recipe_name = card.childNodes[1].innerHTML;

    $.ajax({
      type: "GET",
      url: "/db/getlikes"
    }).then(resp => {
      if (resp.data == "epic embed fail") {
        console.log("epic embed fail");
      } else {
        likes = resp.data[0].likes;
        if (likes.includes(recipe_name)) {
          $.ajax({
            type: "POST",
            url: "/db/dislike",
            data: {
              "recipe_name": recipe_name
            }
          });
        }
      }
    });
  }
}

var noListener = createButtonListener(false);
var yesListener = createButtonListener(true);

no.addEventListener('click', noListener);
yes.addEventListener('click', yesListener);

$.ajax({url:"http://localhost:3000/db/foods"}).then(resp => {

	if (resp.data == "epic embed fail") {
    console.log("epic embed fail");
    return;
  }

	dishes = resp.data;

  for(var i = 0; i < dishes.length; i++) {
    addCard(dishes[i]);
  }

  refreshCards()
});