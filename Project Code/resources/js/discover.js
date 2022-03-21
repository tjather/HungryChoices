//Begin Riley's Code

const descriptions = ["Old-Fashioned", "World's Best", "Crazy", "Gut-Destroying", "Mouth-Watering", "Pop's", "Grandma's", "Grand", "Illegally Good", "Ye Old", "World-Ending", "Epic", "Awesome", "Totally Legitimate", "Sugar-Free", "Clearance Aisle", "World-Class", "Five Star", "Four Star", "Three Star", "Two Star", "One Star", "Double", "Deep-Fried", "Mondo", "The Crispiest", "The Ultimate"]
const dishTuples = [
	{name: "Mac n' Cheese", img: "Square", src: "https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/four-cheese-baked-macaroni-and-57cddd.jpg"},
	{name: "Fried Chicken", img: "Landscape", src: "https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken-1024x536.png"},
	{name: "Jello", img: "Portrait", src: "https://flouronmyfingers.com/wp-content/uploads/2020/01/How-to-Make-Jello-picture.jpg"},
];

//Creates a single food card
function createFoodCard() {
	var dish = dishTuples[Math.floor(Math.random() * dishTuples.length)];
	var desc = descriptions[Math.floor(Math.random() * descriptions.length)];
					
	var card = document.createElement("div");
	card.classList.add("rounded");
	card.classList.add("foodCard");
	card.style = "overflow: hidden; height: 15rem; width: 15rem;";

	var img = document.createElement("img");
	img.src = dish.src;
	img.alt = dish.name;

	var info = document.createElement("div");
	info.classList.add("cardInfo");
	info.classList.add("rounded-bottom");
	info.style = "z-index: 1; display: none; position: absolute; top: 70%; height: 30%; width: 15rem; text-align: center; background-color: #f9e4d4bb;";			

	var title = document.createElement("h5");
	title.style = "font-size: 16px;";
	title.innerHTML = desc + " " + dish.name;
					
	var heart = document.createElement("img");
	heart.classList.add("heart");
	heart.src = "../../resources/img/HeartEmpty.png";
	heart.alt = "Heart";
	heart.style = "z-index: 2; width: 40px;";


	if (dish.img == "Square") {
		img.style = "z-index: 0; display: block; max-height: 110%;";
	} else if (dish.img == "Landscape") {
		img.style = "z-index: 0; display: block; position: relative; left: -50%; max-height: 110%;";
	} else if (dish.img == "Portrait") {
		img.style = "z-index: 0; display: block; position: relative; top: -50%; max-width: 110%;";
	}

	info.appendChild(title);
	info.appendChild(heart);
	card.appendChild(img);
	card.appendChild(info);

	return card;
}

//Creates a flexible container for one card
function createCardColumn() {
	var col = document.createElement("div");
	col.classList.add("col-xl-2");
	col.classList.add("d-flex");

	col.appendChild(createFoodCard());

	return col;
}

//Creates a row of 6 cards			
function createCardRow() {
	var row = document.createElement("div");
	row.classList.add("row");
	row.classList.add("justify-content-start");
	row.classList.add("card-deck");
				
	for (var i = 0; i < 6; i++) {
		row.appendChild(createCardColumn());
	}

	document.getElementById("cardFrame").appendChild(row);

	var brk = document.createElement("br");
	
	document.getElementById("cardFrame").appendChild(brk);
}

createCardRow();
createCardRow();
createCardRow();

//------------------------------------------------------------------------------//

//Handles showing the information when a card is hovered over
//Does not use an array built from generated cards in case static cards are already on the page

var foodCards = document.getElementsByClassName("foodCard");
var cardInfos = document.getElementsByClassName("cardInfo");
				
var cardTuples = [];
				
for (var i = 0; i < foodCards.length; i++) {
	cardTuples[i] = [foodCards[i], cardInfos[i]];
	foodCards[i].addEventListener("mouseover", showInfo, true);
	foodCards[i].addEventListener("mouseout", hideInfo, true);
}

function showInfo(foodCard) {
	for (var i = 0; i < cardTuples.length; i++) {
		if (cardTuples[i][0] == this) {
			cardTuples[i][1].style.display = "block";
		}
	}
}

function hideInfo(index) {
	for (var i = 0; i < cardTuples.length; i++) {
		if (cardTuples[i][0] == this) {
			cardTuples[i][1].style.display = "none";
		}
	}
}

//------------------------------------------------------------------------------//

//Handles liking and unliking cards
//Does not use an array built from generated cards in case static cards are already on the page

var hearts = document.getElementsByClassName("heart");

for (var i = 0; i < hearts.length; i++) {
	hearts[i].addEventListener("click", recolor);
}

function recolor() {
	if (this.getAttribute("src") == "../../resources/img/HeartEmpty.png") {
		this.setAttribute("src", "../../resources/img/HeartFull.png");
	} else {
		this.setAttribute("src", "../../resources/img/HeartEmpty.png");
	}
}

//End Riley's Code