const qs = (elem) => {
	return document.querySelector(elem);
};
// =========================================
const imgSrc = "https://robohash.org/";
const cardBackSide = "https://robohash.org/xyz";
const chars = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
];
const boardPositions = [];
const numOfCards = 20;
boardPositions.length = numOfCards;
const imgArr = [];
const gallery = qs("#gallery");
let count = 0;

const createImgArr = () => {
	let randImg = Math.floor(Math.random() * chars.length);
	imgArr[count] = imgSrc + chars[randImg];
	count++;
	if (count < numOfCards / 2) {
		return createImgArr();
	} else {
		imgArr.map((img) => {
			imgArr.push(img);
		});
		creatBoard();
	}
};
const creatBoard = () => {
	for (i = imgArr.length - 1; i < 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = imgArr[i];
		imgArr[i] = imgArr[j];
		imgArr[j] = temp;
	}
	imgArr.map((img) => {
		let elem = document.createElement("img");
		elem.src = cardBackSide;
		elem.setAttribute("value", `${img}`);
		elem.setAttribute("onClick", "turnCard(event)");
		elem.style.width = "130px";
		elem.classList.add("card");
		gallery.appendChild(elem);
	});
};

const frontSide = [];
const turnCard = (event) => {
	if (frontSide.length <= 2) {
		let visibleCard = event.target;
		visibleCard.src = event.target.attributes.value.nodeValue;
		visibleCard.removeAttribute("onClick");
		frontSide.push(visibleCard);
		console.log(frontSide);
		if (frontSide.length == 2) {
			const allOthers = document.getElementsByClassName("card");
			Array.from(allOthers).forEach((card) => {
				card.removeAttribute("onClick");
			});
			if (frontSide[0].src === frontSide[1].src) {
				setTimeout(() => {
					frontSide.forEach((card) => {
						card.src = "./icons/matched.jpg";
						Array.from(allOthers).forEach((card) => {
							card.setAttribute("onClick", "turnCard(event)");
						});
					});
					frontSide.length = 0;
				}, 1000);
			} else {
				setTimeout(() => {
					frontSide.forEach((card) => {
						card.src = cardBackSide;
						Array.from(allOthers).forEach((card) => {
							card.setAttribute("onClick", "turnCard(event)");
						});
					});
					frontSide.length = 0;
				}, 1000);
			}
		}
	}
};

window.addEventListener("DOMContentLoaded", createImgArr);
