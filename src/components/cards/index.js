import { cards } from "../../data";
import { purchaseDialogOpen } from "../purchase-form";


const rootPath = process.env.NODE_ENV === 'development' ? "./front_landing/" : "./";
const svgArrow = `<svg width="22" height="40" viewBox="0 0 22 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.707107" y1="19.2929" x2="20.7071" y2="39.2929" stroke="black" stroke-width="2"/>
<line x1="20.7071" y1="0.707107" x2="0.707111" y2="20.7071" stroke="black" stroke-width="2"/>
</svg>`;

export const cardLoader = (containerElementId, buttonElementId) => {
  const container = document.querySelector(containerElementId);
  const button = document.querySelector(buttonElementId);

  container.append(...cards.map(createCard));
};

const createCard = (card, number) => {
  const cardElement = createElement("section", "card");

  const cardData = createCardData(card, number);
  const cardImage = createImageCard(card.imagesAmount, number);

  cardElement.append(cardData, cardImage);
  return cardElement;
};

const createCardData = (
  { caption, price, author, params, text, imagesAmount },
  number
) => {
  // Container
  const container = createElement("div", "card__data");
  const containerText = createElement("div", "card__data-text");
  // Caption
  const captionConteiner = createElement("div", "card__caption");
  const cardCaption = createElement("h3", "", caption);
  const cardPrice = createElement("span", "", price);
  captionConteiner.append(cardCaption, cardPrice);
  // Author
  const cardAuthor = createElement("span", "card__author", author);
  // Dimension
  const dimensionCard = createDimensionCard(params);
  const cardText = createElement("span", "card__text", text);
  // Button
  const button = createElement("button", "card__button", "Приобрести арт");
  const imageList = createImageList(imagesAmount, number);

  containerText.append(
    captionConteiner,
    cardAuthor,
    dimensionCard,
    cardText,
    button
  );
  container.append(
    containerText,
    imageList
  );
  button.addEventListener("click", function () {
    purchaseDialogOpen(caption);
  });
  return container;
};

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

const createImageList = (imagesAmount, number) => {
  const container = createElement("div", "image-list");
  const items = Array.from({ length: imagesAmount }, (_, i) => i).map((i) => {
    const item = createElement("div");
    const img = createElement("img");
    img.src = `${rootPath}photo/${number + 1}/${i + 1}.jpg`;
    img.alt = "Sculpture image";
    item.append(img);
    return item;
  });
  container.append(...items);
  return container;
};

const createImageCard = (imagesAmount, number) => {
  const container = createElement("div", "image");
  const left = createElement("button", "image__left");
  const right = createElement("button", "image__right");
  const img = createElement("img");
  left.innerHTML = svgArrow;
  right.innerHTML = svgArrow;
  img.src = `${rootPath}photo/${number + 1}/${1}.jpg`;
  img.alt = "Sculpture image";
  container.append(left, img, right);
  return container;
};

const createElement = (tag, className = "", text = "") => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  element.textContent = text;
  return element;
};
