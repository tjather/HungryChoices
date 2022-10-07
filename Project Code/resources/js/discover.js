//Begin Riley's Code

const descriptions = ["Old-Fashioned", "World's Best", "Crazy", "Gut-Destroying", "Mouth-Watering", "Pop's", "Grandma's", "Grand", "Illegally Good", "Ye Old", "World-Ending", "Epic", "Awesome", "Totally Legitimate", "Sugar-Free", "Clearance Aisle", "World-Class", "Five Star", "Four Star", "Three Star", "Two Star", "One Star", "Double", "Deep-Fried", "Mondo", "The Crispiest", "The Ultimate"]
const dishTuples = [
	{name: "Mac n' Cheese", img: "Square", src: "https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/four-cheese-baked-macaroni-and-57cddd.jpg"},
	{name: "Fried Chicken", img: "Landscape", src: "https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken-1024x536.png"},
	{name: "Jello", img: "Portrait", src: "https://flouronmyfingers.com/wp-content/uploads/2020/01/How-to-Make-Jello-picture.jpg"},
];

let index = 0;
let dishes = [];

//Creates a single food card
function createFoodCard() {
	if (index >= dishes.length) return;	

	var dish = dishes[index];
					
	var card = document.createElement("div");
	card.classList.add("rounded");
	card.classList.add("foodCard");
	card.style = "overflow: hidden; height: 15rem; width: 15rem;";

	var img = document.createElement("img");
	img.classList.add("cardImg");
	img.src = dish.img_src;
	img.alt = dish.name;

	var info = document.createElement("div");
	info.classList.add("cardInfo");
	info.classList.add("rounded-bottom");
	info.style = "z-index: 1; display: none; position: relative; top: 70%; height: 30%; text-align: center; background-color: #f9e4d4bb;";			

	var title = document.createElement("h5");
	title.style = "font-size: 16px;";
	title.innerHTML = dish.name;
					
	var heart = document.createElement("img");
	heart.classList.add("heart");
	heart.src = "../../resources/img/HeartEmpty.png";
	heart.alt = "Heart";
	heart.style = "z-index: 2; width: 40px;";


	if (dish.img_type == "Square") {
		img.style = "z-index: 0; display: block; position: relative; max-height: 110%;";
		img.classList.add("square");
	} else if (dish.img_type == "Landscape") {
		img.style = "z-index: 0; display: block; position: relative; left: -50%; max-height: 110%;";
		img.classList.add("landscape");
	} else if (dish.img_type == "Portrait") {
		img.style = "z-index: 0; display: block; position: relative; top: -50%; max-width: 110%;";
		img.classList.add("portrait");
	}

	info.appendChild(title);
	info.appendChild(heart);
	card.appendChild(info);
	card.appendChild(img);

	index++;

	return card;
}

//Creates a flexible container for one card
function createCardColumn() {
	var col = document.createElement("div");
	col.classList.add("col-xl-2");
	col.classList.add("d-flex");

	var card = createFoodCard();

	if (card) col.appendChild(card);

	return col;
}

//Creates a row of 6 cards			
function createCardRow() {
	var row = document.createElement("div");
	row.classList.add("row");
	row.classList.add("justify-content-start");
	row.classList.add("card-deck");

	var lpad = document.createElement("div");
	lpad.classList.add("col-xl-1");
	lpad.classList.add("d-flex");

	row.appendChild(lpad);
				
	for (var i = 0; i < 5; i++) {
		row.appendChild(createCardColumn());
	}

	var rpad = document.createElement("div");
	rpad.classList.add("col-xl-1");
	rpad.classList.add("d-flex");

	row.appendChild(rpad);

	document.getElementById("cardFrame").appendChild(row);

	var brk = document.createElement("br");
	
	document.getElementById("cardFrame").appendChild(brk);
}

//------------------------------------------------------------------------------//

//Handles showing the information when a card is hovered over
//Does not use an array built from generated cards in case static cards are already on the page
var foodCards = document.getElementsByClassName("foodCard");
var cardImgs = document.getElementsByClassName("cardImg");
var cardInfos = document.getElementsByClassName("cardInfo");
var hearts = document.getElementsByClassName("heart");
	
var cardTuples = [];

function initializeCardInfo() {
	foodCards = document.getElementsByClassName("foodCard");
	cardImgs = document.getElementsByClassName("cardImg");
	cardInfos = document.getElementsByClassName("cardInfo");
	hearts = document.getElementsByClassName("heart");

	cardTuples = [];
		
	for (var i = 0; i < foodCards.length; i++) {
		cardTuples[i] = [foodCards[i], cardInfos[i], cardImgs[i], hearts[i]];

		foodCards[i].removeEventListener('mouseover', showInfo, true);
		foodCards[i].removeEventListener('mouseout', hideInfo, true);

		foodCards[i].addEventListener("mouseover", showInfo, true);
		foodCards[i].addEventListener("mouseout", hideInfo, true);
	}
}

function showInfo(foodCard) {
	for (var i = 0; i < cardTuples.length; i++) {
		if (cardTuples[i][0] == this) {
			cardTuples[i][1].style.display = "block";
			if (cardTuples[i][2].classList.contains("portrait")) {
				cardTuples[i][2].style.top = "-80%";
			} else {
				cardTuples[i][2].style.top = "-30%";
			}
		}
	}
}

function hideInfo(index) {
	for (var i = 0; i < cardTuples.length; i++) {
		if (cardTuples[i][0] == this) {
			cardTuples[i][1].style.display = "none";
			if (cardTuples[i][2].classList.contains("portrait")) {
				cardTuples[i][2].style.top = "-50%";
			} else {
				cardTuples[i][2].style.top = "0%";
			}
		}
	}
}

//------------------------------------------------------------------------------//

//Handles liking and unliking cards
//Does not use an array built from generated cards in case static cards are already on the page

function initializeLikes() {
	for (var i = 0; i < hearts.length; i++) {
		hearts[i].removeEventListener("click", registerClick);	

		hearts[i].addEventListener("click", registerClick);
	}
}

function updateUserChoice(recipe_name, choice) {
  if (choice) {
    // Update the db to reflect a yes answer
    var likes = [];

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

function registerClick(foodCard) {
	for (var i = 0; i < cardTuples.length; i++) {
		if (cardTuples[i][3] == this) {
			if (this.getAttribute("src") == "../../resources/img/HeartEmpty.png") {
				this.setAttribute("src", "../../resources/img/HeartFull.png");
				updateUserChoice(cardTuples[i][1].childNodes[0].innerHTML, true);
			} else {
				this.setAttribute("src", "../../resources/img/HeartEmpty.png");
				updateUserChoice(cardTuples[i][1].childNodes[0].innerHTML, false);
			}
		}
	}
}

//------------------------------------------------------------------------------//

$.ajax({url:"/db/foods"}).then(resp => {

	if (resp.data == "epic embed fail") { console.log("epic embed fail"); return;}

	dishes = resp.data;

	createCardRow();
	createCardRow();

	initializeCardInfo();
	initializeLikes();
});

window.onscroll = function (ev) {
	if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
		createCardRow();
		createCardRow();
		initializeCardInfo();
		initializeLikes();
	}
};

//End Riley's Code