import {Box} from "../js/classes/box.js";

const xhr = new XMLHttpRequest();

xhr.onload = function () {
  initOnload();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

export const box = new Box();

const buttonBox = document.querySelector('.button-basket');
const sectionBox = document.querySelector('.section-box');
const shadowBox = document.querySelector('.shadow-box');
const exitBox = document.querySelector('.exit-box');
const boxInfo = document.querySelectorAll('.box-info');
const containerRowItem = document.querySelector('.collections-row-items');
const totalPrice = document.querySelector('.total-price');
const sumIconBox = document.querySelector('.sum-icon-box');
const h1Box = document.querySelector('.h1-box');
const delAll = document.querySelector('.del-all');
let inBoxLS;
let sumTotalPrice;


export function initOnload() {
  if(localStorage.getItem('inBox')) {
    let infoCards = JSON.parse(xhr.responseText);
    inBoxLS = JSON.parse(localStorage.getItem('inBox'));
    for(let elem in inBoxLS) {
      box.boxCount += inBoxLS[+elem];
      console.log(infoCards[+elem])
      for(let i = 0; i < inBoxLS[+elem]; i++) {
        box.addItem(infoCards[+elem]);
      }
    }
    boxInfo.forEach(elem => elem.textContent = `Корзина (${box.boxCount})`);
    sumIconBox.style.display = "block";
  }

  buttonBox.addEventListener('click', () => {
    sectionBox.style.display = "block";
    shadowBox.style.display = "block";
  });

  exitBox.addEventListener('click', () => {
    sectionBox.style.display = "none";
    shadowBox.style.display = "none";
  });

  delAll.addEventListener('click', () => {
    localStorage.removeItem('inBox');
    box.clearBox();
    let rowsItem = containerRowItem.querySelectorAll('.row-items');
    rowsItem.forEach((rowItem) => {
      if (rowItem.dataset.idcards > 0) {
        sumTotalPrice = 0;
        totalPrice.textContent = `${sumTotalPrice}₽`;
        boxInfo.forEach(elem => elem.textContent = `Корзина`);
        rowItem.remove();
        sumIconBox.style.display = "none";
        containerRowItem.style.display = "none";
        h1Box.textContent = "Ваша корзина пуста";
      }
    })
  });

  initButtonActions();
}

export function initButtonActions(temp) {

  const iconBox = document.querySelector('.iconBox');
  const inBox = document.querySelectorAll('.inBox');
  const boxInfo = document.querySelectorAll('.box-info');
  const containerRowItem = document.querySelector('.collections-row-items');
  const totalPrice = document.querySelector('.total-price');
  const sumIconBox = document.querySelector('.sum-icon-box');
  const h1Box = document.querySelector('.h1-box');
  let hitCounterDogs = 0;
  let infoCards;

  if (!temp) {
    infoCards = JSON.parse(xhr.responseText);
  } else {
    infoCards = temp;
  }

  inBox.forEach((inBoxItem) => {

    inBoxItem.addEventListener('click', () => {
      // if(localStorage.getItem('inBox')) {
      //   inBoxLS = JSON.parse(localStorage.getItem('inBox'));
      //   if(inBoxItem.dataset.idcards in inBoxLS) {
      //     inBoxLS[inBoxItem.dataset.idcards] += 1;
      //   } else {
      //     inBoxLS[inBoxItem.dataset.idcards] = 1;
      //   }
      //   localStorage.setItem('inBox', JSON.stringify(inBoxLS));
      // } else {
      //   inBoxLS = {[inBoxItem.dataset.idcards]: 1}
      //   localStorage.setItem('inBox', JSON.stringify(inBoxLS));
      // }
      box.boxCount++
      containerRowItem.style.display = "block";
      h1Box.textContent = "Ваша корзина";
      boxInfo.forEach(elem => elem.textContent = `Корзина (${box.boxCount})`);
      iconBox.style.transform = "scale(1.3)";
      iconBox.style.borderRadius = '50%';
      iconBox.style.backgroundColor = "#FBBA3C";
      setTimeout(() => {
        iconBox.style.transform = "scale(1)";
        iconBox.style.backgroundColor = "white";
        iconBox.style.borderRadius = '0';
      }, 300);

      let templateBox = document.querySelector('.row-items');
      let rowItems = containerRowItem.querySelectorAll('.row-items');
      rowItems.forEach((rowItem) => {
        if (inBoxItem.dataset.idcards === rowItem.dataset.idcards) {
          hitCounterDogs++;
        }
      });
      if (hitCounterDogs === 0) {
        templateBox.style.display = "none";
        infoCards.forEach((item) => {

          if (Number(item.id) === Number(inBoxItem.dataset.idcards)) {
            box.addItem(item);

            let delItemIcons = document.querySelectorAll('.del-item');
            delItemIcons.forEach((delItem) => {
              delItem.addEventListener('click', () => {
                let rowItems = containerRowItem.querySelectorAll('.row-items');
                rowItems.forEach((rowItem) => {

                  if (rowItem.dataset.idcards === delItem.dataset.idcards) {
                    box.sumTotalPrice = box.sumTotalPrice - item.price;
                    sumIconBox.textContent = `на сумму ${box.sumTotalPrice}`;
                    totalPrice.textContent = `${box.sumTotalPrice}₽`;
                    box.boxCount = box.boxCount - 1;
                    boxInfo.forEach(elem => elem.textContent = `Корзина (${box.boxCount})`);
                    rowItem.remove();
                    if (box.sumTotalPrice === 0) {
                      sumIconBox.style.display = "none";
                      containerRowItem.style.display = "none";
                      h1Box.textContent = "Ваша корзина пуста";
                    }
                  }
                });
                box.countingAllAmounts();
              });

            });
          }
        });
      } else {
        let quantityBreed = document.querySelectorAll('.quantity-breed');
        quantityBreed.forEach((quantity) => {
          if (Number(quantity.dataset.idcards) === Number(inBoxItem.dataset.idcards)) {
            quantity.textContent++;
            hitCounterDogs = 0;

            infoCards.forEach((item) => {
              if (Number(item.id) === Number(inBoxItem.dataset.idcards)) {
                box.countingAllAmounts(item);
              }
            })
          }
        })
      }
    });
  })
}
