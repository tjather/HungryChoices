'use strict';

var cardContainer = document.querySelector('.card-container');
var allCards = document.querySelectorAll('.food-card');
var no = document.getElementById('no');
var yes = document.getElementById('yes');

// DELETE THIS LATER (counter for random images)
var count = 6;

function initCards(card, index) {
    allCards = document.querySelectorAll('.food-card');
  var newCards = document.querySelectorAll('.food-card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    // card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    // card.style.opacity = (10 - index) / 10;
  });
  
  cardContainer.classList.add('loaded');
}

initCards();

function cardFuncs() {
allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    cardContainer.classList.toggle('yes', event.deltaX > 0);
    cardContainer.classList.toggle('no', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    cardContainer.classList.remove('yes');
    cardContainer.classList.remove('no');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

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

      var temp = document.createElement("div");
      temp.setAttribute("class", "food-card");

      var tempIMG = document.createElement("img");
      tempIMG.setAttribute("src", "https://picsum.photos/300/200?random=" + count);

      var tempH = document.createElement("h3");
      tempH.innerHTML = "Demo card " + count;

      var tempP = document.createElement("p");
      tempP.innerHTML = "Paragraph Text Here";
      count++;

      temp.appendChild(tempIMG);
      temp.appendChild(tempH);
      temp.appendChild(tempP);

      var section = document.getElementById("card-section");
      section.appendChild(temp);

      initCards();
      cardFuncs();
    }
  });
});
}
cardFuncs();

function createButtonListener(yes) {
  return function (event) {
    var cards = document.querySelectorAll('.food-card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (yes) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    var temp = document.createElement("div");
      temp.setAttribute("class", "food-card");

      var tempIMG = document.createElement("img");
      tempIMG.setAttribute("src", "https://picsum.photos/300/200?random=" + count);

      var tempH = document.createElement("h3");
      tempH.innerHTML = "Sample recipe " + count;

      var tempP = document.createElement("p");
      tempP.innerHTML = "Food Description";
      count++;

      temp.appendChild(tempIMG);
      temp.appendChild(tempH);
      temp.appendChild(tempP);

      var section = document.getElementById("card-section");
      section.appendChild(temp);

    initCards();

    event.preventDefault();
  };
}

var noListener = createButtonListener(false);
var yesListener = createButtonListener(true);

no.addEventListener('click', noListener);
yes.addEventListener('click', yesListener);
