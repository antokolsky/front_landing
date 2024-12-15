import { vote } from "../../api/vote";
import { cards } from "../../data";
import { purchaseDialogOpen } from "../purchase-form";

console.log(cards);


const rootPath = process.env.NODE_ENV === 'development' ? "http://antokolsy-landing.ddns.net/photo" : "./photo";
console.log(process.env.NODE_ENV);

const svgArrow = `<svg width="22" height="40" viewBox="0 0 22 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.707107" y1="19.2929" x2="20.7071" y2="39.2929" stroke="currentColor" stroke-width="2"/>
<line x1="20.7071" y1="0.707107" x2="0.707111" y2="20.7071" stroke="currentColor" stroke-width="2"/>
</svg>`;

let container;
let loadButton;
const cardsPerBatch = 8;
let cardPosition = 0;

const addCards = (cards) => {

  for (let i=0; i<cardsPerBatch; i++) {
    container.append(createCard(cards[cardPosition], cardPosition));
    cardPosition++;
    if (cardPosition == cards.length) {
      loadButton.setAttribute("disabled", "");
      loadButton.textContent = "No more samples to load";
      break;
    }
  }
};

export const cardLoader = async (containerElementId, buttonElementId) => {

 const data= await (await fetch("http://antokolsky.ddns.net/api/landing/projects/")).json()

 const cards= data.map((v,i)=>({
  id:i,
  author:v.author_name,
  caption:v.title,
  height:v.dimension_height,
  width:v.dimension_width,
  length:v.dimension_depth,
  price:v.cost,
  imagesAmount:v.images.length,
  rating:v.rating,
  images:v.images
}))

  container = document.querySelector(containerElementId);
  loadButton = document.querySelector(buttonElementId);
  loadButton.addEventListener("click", ()=>{addCards(cards)});

  addCards(cards)
};

const createCard = (card, number) => {
  const cardElement = createElement("section", "card");

  const cardImage = createImageCard(card.imagesAmount, number,card.images);
  const cardData = createCardData(card, number);

  cardElement.append(cardData, cardImage);
  return cardElement;
};

const createCardData = (
  { id, author, caption, height, width, length, price, imagesAmount,rating,images },
  number
) => {
  // Container
  const container = createElement("div", "card__data");
  const containerText = createElement("div", "card__data-text");
  const containerAuthorDimension=createElement("div","card__author-dimension")
  const containerDimension = createElement("div", "card__dimension-rating");
  // Caption
  const captionConteiner = createElement("div", "card__caption");
  const cardCaption = createElement("h3", "", caption);
  const cardPrice = createElement("span", "", price);
  captionConteiner.append(cardCaption, cardPrice);
  // Author
  const cardAuthor = createElement("span", "card__author", author);
  // Dimension
  const dimensionCard = createDimensionCard({width, height, length});
  //rating
  const ratingCard =createRatingCard(rating,id)
  // Button
  const btn = createElement("button", "card__button", "Buy art");
  // Thumbnails
  const imageList = createImageList(imagesAmount, number,images);

  containerAuthorDimension.append(cardAuthor,dimensionCard)

  containerDimension.append(containerAuthorDimension,ratingCard)



  containerText.append(
    captionConteiner,
    containerDimension,
    btn
  );
  container.append(
    containerText,
    imageList
  );
  btn.addEventListener("click", function () {
    purchaseDialogOpen(caption);
  });
  return container;
};
 

const createRatingCard=(num,id)=>{
  const container = createElement("div", "card__rating-contaner");
  const cardRatingText=createElement("span","card__rating-text",`${num}`)
  
  ///изменяю цвет текста рейтинга
  cardRatingText.style.color=num>0  ?"#83DECC":"#DB5959"


  const containerButton = createElement("div","card__container__rating-button")

  const topButton=createElement("button","card__rating-top-button")
  const bottomButton=createElement("button","card__rating-bottom-button")

  topButton.addEventListener("click",()=>{vote(id,"top")})
  bottomButton.addEventListener("click",()=>{vote(id,"bottom")})

  containerButton.append(topButton,bottomButton)
  container.append(cardRatingText,containerButton)

  return container
}

const createDimensionCard = (params) => {
  const container = createElement("ul", "dimension");
  const items = Object.entries(params).map(([key, value]) => {
    const item = createElement("li");
    const name = createElement("span", "dimension__name", `${key}: `);
    const val = createElement("span", "dimension__value", value);
    item.append(name, val);
    return item;
  });
  container.append(...items);
  return container;
};

function changeCardImage(images) {

  return function(e = null){
    const num = this.dataset.num;
  const img = document.getElementById(`card_image_${num}`);

  if (this.localName == 'img' && e.type == "click") {
    // from thumbnail
    const i = this.dataset.i;
    img.src = `${rootPath}/${images[i-1].image}`;

    img.dataset.i = i;
  } else {
    const i = img.dataset.i;
    if (this.id === 'left' || e.detail.dir === 'right') {
      // prev btn or swipe to right
      if (i == 1) {
        img.dataset.i = img.dataset.amount;
      } else {
        img.dataset.i -= 1;
      }
    } else if (this.id === 'right' || e.detail.dir === 'left') {
      // next btn or swipe to left
      if (i == img.dataset.amount) {
        img.dataset.i = 1;
      } else {
        img.dataset.i = +img.dataset.i + 1;
      }
    }
    img.src = `${rootPath}/${images[img.dataset.i-1].image}`;

  }
  }
  
};

const createImageList = (imagesAmount, number,images) => {
  const container = createElement("div", "image-list");
  const items = Array.from({ length: imagesAmount }, (_, i) => i).map((i) => {
    const item = createElement("div");
    const img = createElement("img");
    img.src = `${rootPath}/${images[i].preview_image}`;

    img.dataset.num = number + 1;
    img.dataset.i = i + 1;
    img.alt = "Sculpture image";
    img.addEventListener("click", changeCardImage(images));
    item.append(img);
    return item;
  });
  container.append(...items);
  return container;
};

const createImageCard = (imagesAmount, number,images) => {
  
  const container = createElement("div", "image");
  let left, right;
  if (window.screen.width > 600) {
    left = createArrowButton("left", number, imagesAmount,images);
    right = createArrowButton("right", number, imagesAmount,images);
  }
  const img = createElement("img");
  img.src = `${rootPath}/${images[0].image}`;
  img.id = `card_image_${number+1}`;
  img.dataset.i = 1;
  img.dataset.num = +number + 1;
  img.dataset.amount = imagesAmount;
  img.alt = "Sculpture image";
  if (window.screen.width > 600) {
    container.append(left, img, right);
  } else {
    img.addEventListener("swiped", changeCardImage(images));
    container.append(img);
  }
  return container;
};

const createArrowButton = (name, number, imagesAmount,images) => {
  const elem = createElement("button", `image__${name}`);
  elem.innerHTML = svgArrow;
  if (imagesAmount > 1) {
    elem.id = name;
    elem.dataset.num = number + 1;
    elem.addEventListener("click", changeCardImage(images));
  } else {
    elem.setAttribute("disabled", "");
  }
  return elem;
};

const createElement = (tag, className = "", text = "") => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  element.textContent = text;
  return element;
};
