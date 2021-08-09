import { Filter } from '../js/classes/filter.js';
import { Box } from "../js/classes/box.js";

const filter = new Filter();
const box = new Box();
const xhr = new XMLHttpRequest();

xhr.onload = function () {
  initOnload();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

function initOnload() {
  const infoCards = JSON.parse(xhr.responseText);

  filter.filtrationCards(infoCards)
  filter.addListenersFilter(infoCards);
  filter.addListenerFastSearch(infoCards);
  filter.addListenerSizeInputs(infoCards);
  filter.addListenerClearFilter(infoCards);
  filter.addCardsToCatalog(infoCards);
  filter.resizeSectionsFilter(infoCards);

  box.addListenerModalBasket();
  box.calculatingBoxCounter(infoCards);
  box.fillingModalBasket(infoCards);
  box.addListenerDellAllItemInBox();
}
