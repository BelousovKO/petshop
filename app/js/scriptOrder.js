import {Box} from "../js/classes/box.js";

const box = new Box();

const xhr = new XMLHttpRequest();

xhr.onload = function (e) {
  init();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

function init() {
  const exitInBox = document.querySelector('.exit-box');
  const closeBox = document.querySelector('.shadow-box');
  const titleCountItemsOrder = document.querySelector('.count-items-order');
  const totalPriceOrder = document.querySelector('.total-price-order');
  const priseItems = document.querySelector('.prise-items');
  const resultPriceOrder = document.querySelector('.result-price-order');
  const delivery = document.querySelector('#courier');
  const priceDelivery = document.querySelector('.price-delivery');
  const radioDelivery = document.querySelectorAll('.radio');
  const infoCards = JSON.parse(xhr.responseText);
  let inBoxLS = JSON.parse(localStorage.getItem('inBox'));
  let totalPrice = 0;
  let countItemsOrder = 0;
  let costOfDelivery = 0;

  box.addListenerModalBasket();
  box.addListenerButtonsInBox(infoCards)
  box.calculatingBoxCounter(infoCards);
  box.addListenerDelAllItemInBox();

  fillingOrder();

  exitInBox.addEventListener('click', () => {
    inBoxLS = JSON.parse(localStorage.getItem('inBox'));
    fillingOrder();
  });

  closeBox.addEventListener('click', () => {
    inBoxLS = JSON.parse(localStorage.getItem('inBox'));
    fillingOrder();
  });

  radioDelivery.forEach(elem => elem.addEventListener('click', fillingOrder));

  function fillingOrder() {
    if (localStorage.getItem('inBox')) {
      totalPrice = 0;
      countItemsOrder = 0;
      document.querySelector('.section-item').innerHTML = '';
      for (let elem in inBoxLS) {
        let template = document.querySelector('.template-item-order').cloneNode(true);
        template.content.querySelector('.photo-pet').src = infoCards[+elem].img;
        template.content.querySelector('.breed').textContent = infoCards[+elem].breed;
        template.content.querySelector('.quantity-bred').textContent = inBoxLS[+elem];
        template.content.querySelector('.price').textContent = `${inBoxLS[+elem] * infoCards[+elem].price}`;
        document.querySelector('.section-item').appendChild(template.content);
        totalPrice += inBoxLS[+elem] * infoCards[+elem].price;
        countItemsOrder += inBoxLS[+elem];
      }
      delivery.checked ? costOfDelivery = countItemsOrder * 500 : costOfDelivery = 0;
      titleCountItemsOrder.textContent = `${countItemsOrder} товар(ов) на сумму `;
      totalPriceOrder.textContent = `${totalPrice} ₽`;
      priseItems.textContent = `${totalPrice} ₽`;
      priceDelivery.textContent = `${costOfDelivery} ₽`;
      resultPriceOrder.textContent = `${totalPrice + costOfDelivery} ₽`
    } else {
      window.location.href = 'index.html';
    }
  }
}
