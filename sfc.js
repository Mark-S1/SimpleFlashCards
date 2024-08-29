const cardEl = document.getElementById("card");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const add = document.getElementById("add");
const del = document.getElementById("del");

let cards = [];
let usingDefault = false;

if(!localStorage.getItem("cards")) {
	usingDefault = true;
	cards = [
		{
			front: "front0",
			back: "back0"
		},
		{
			front: "front1",
			back: "back1"
		},
		{
			front: "front2",
			back: "back2"
		}
	];
} else {
	cards = JSON.parse(localStorage.getItem("cards"));
}

let currentIndex = 0;
let frontFirst = true;
let isFront = true;

setCard(currentIndex);

cardEl.addEventListener("click", () => {
	const cardContent = document.getElementById("card-content");
	
	if(isFront) {
		cardContent.innerText = cards[currentIndex].back;
	} else {
		cardContent.innerText = cards[currentIndex].front;
	}
	
	isFront = !isFront;
});

prev.addEventListener("click", () => {
	currentIndex--;
	if(currentIndex < 0) currentIndex = cards.length-1;
	
	setCard(currentIndex);
});

next.addEventListener("click", () => {
	currentIndex++;
	if(currentIndex >= cards.length) currentIndex = 0;
	
	setCard(currentIndex);
});

add.addEventListener("click", () => {
	const frontInput = document.getElementById("front-input");
	const backInput = document.getElementById("back-input");
	
	if(!frontInput || !backInput) return;
	
	const newCard = {
		front: frontInput.value,
		back: backInput.value
	};
	
	if(usingDefault) {
		cards = [newCard];
		usingDefault = false;
		
	} else {
		cards.push(newCard);
	}
	
	frontInput.value = "";
	backInput.value = "";
	
	localStorage.setItem("cards", JSON.stringify(cards));
});

del.addEventListener("click", () => {
	const confirm = document.getElementById("del-confirm");
	
	if(confirm.value == "Yes please") {
		localStorage.removeItem("cards");
	}
});

function setCard(index) {
	const cardIndex = document.getElementById("card-index");
	const cardContent = document.getElementById("card-content");
	
	currentIndex = index;
	cardIndex.innerText = currentIndex;
	cardContent.innerText = cards[currentIndex].front;
	isFront = true;
}

