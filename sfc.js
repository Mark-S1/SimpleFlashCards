const cardEl = document.getElementById("card");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const wiki = document.getElementById("wiki");
const add = document.getElementById("add");
const del = document.getElementById("del");

let cards = [];
let usingDefault = false;
let currentIndex = 0;
let frontFirst = true;
let isFront = true;

if(!localStorage.getItem("cards")) {
	initDefaultCards();
} else {
	cards = JSON.parse(localStorage.getItem("cards"));
	setCard(currentIndex);
}

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

flip.addEventListener("click", () => {
	frontFirst = !frontFirst;
	setCard(currentIndex);
});

wiki.addEventListener("click", () => {
	let currentWord = document.getElementById("card-content").innerText;
	
	currentWord = currentWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");	//remove diacritics
	
	let url = "https://en.wiktionary.org/wiki/" + currentWord;
	
	window.open(url, "_blank").focus();
});

add.addEventListener("click", () => {
	const frontInput = document.getElementById("front-input");
	const backInput = document.getElementById("back-input");
	
	if(!frontInput || !backInput) return;
	
	const newCard = {
		front: frontInput.value.trim(),
		back: backInput.value.trim()
	};
	
	if(usingDefault) {
		cards = [newCard];
		usingDefault = false;
		setCard(0);
		
	} else {
		cards.push(newCard);
	}
	
	frontInput.value = "";
	backInput.value = "";
	
	localStorage.setItem("cards", JSON.stringify(cards));
});

del.addEventListener("click", () => {
	const confirm = document.getElementById("del-confirm");
	
	if(confirm.value.trim() == "Yes please") {
		localStorage.removeItem("cards");
		initDefaultCards();
		
	} else if(confirm.value.startsWith("ID ")) {
		let idValue = confirm.value.split(" ")[1];
		
		if(!!cards[idValue]) {
			cards.splice(idValue, 1);
			
			localStorage.setItem("cards", JSON.stringify(cards));
		}
		
		if(cards.length == 0) initDefaultCards();
		else setCard(0);
	}
	
	confirm.value = "";
});

function setCard(index) {
	const cardIndex = document.getElementById("card-index");
	const cardContent = document.getElementById("card-content");
	
	currentIndex = index;
	cardIndex.innerText = currentIndex;
	
	if(frontFirst) {
		cardContent.innerText = cards[currentIndex].front;
		isFront = true;
	} else {
		cardContent.innerText = cards[currentIndex].back;
		isFront = false;
	}
}

function initDefaultCards() {
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
	
	setCard(0);
}