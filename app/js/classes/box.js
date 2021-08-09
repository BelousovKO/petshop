//import { Filter } from '../../js/classes/filter.js';

export class Box {

  buttonsBox = document.querySelector('.button-basket');
  shadowModalBox = document.querySelector('.shadow-box');
  modalBox = document.querySelector('.section-box');
  buttonExitBox = document.querySelector('.exit-box');
  boxInfo = document.querySelectorAll('.box-info');
  modalTotalPrice = document.querySelector('.sum-icon-box');
  titleBox = document.querySelector('.title-box');
  boxContents = document.querySelector('.collections-row-items');
  buttonDellAllItemInBox = document.querySelector('.del-all-container');
  sumTotalPriceInBox = document.querySelector('.total-price-in-box');
  countInBox = document.querySelector('.count-in-box');
  sumTotalPrice = 0;
  boxCount = 0;
  itemInBox = [];
  inBoxLS = {};


  addListenerModalBasket() {
    this.buttonsBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'block';
      this.modalBox.style.display = 'block';
    });
    this.shadowModalBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'none';
      this.modalBox.style.display = 'none';
    });
    this.buttonExitBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'none';
      this.modalBox.style.display = 'none';
    })
  }

  addListenerButtonsInBox(infoCards) {
    const ButtonsInBox = document.querySelectorAll('.inBox');
    ButtonsInBox.forEach(button => {
      button.addEventListener('click', () => {
        if (localStorage.getItem('inBox')) {
          this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
          this.inBoxLS[button.dataset.idcards] ?
            this.inBoxLS[button.dataset.idcards] += 1 :
            this.inBoxLS[button.dataset.idcards] = 1;
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          this.inBoxLS = {};
          this.inBoxLS[button.dataset.idcards] = 1;
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        }
        this.calculatingBoxCounter(infoCards);
      })
    })
  }

  addListenerDellAllItemInBox() {
    this.buttonDellAllItemInBox.addEventListener('click', () => {
      localStorage.removeItem("inBox");
      this.calculatingBoxCounter();
    })
  }

  calculatingBoxCounter(infoCards) {
    this.boxCount = 0;
    if (localStorage.getItem('inBox')) {
      this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
      for (let elem in this.inBoxLS) {
        this.boxCount += this.inBoxLS[elem];
      }
      this.boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`)
    } else {
      this.boxCount = 0;
      this.boxInfo.forEach(elem => elem.textContent = 'Корзина')
    }
    this.calculatingTotalPrice(infoCards);
  }

  calculatingTotalPrice(infoCards) {
    this.sumTotalPrice = 0;
    if (localStorage.getItem('inBox')) {
      for (let elem in this.inBoxLS) {
        this.sumTotalPrice += infoCards[elem].price * this.inBoxLS[elem];
      }
      this.modalTotalPrice.textContent = `на сумму ${this.sumTotalPrice} ₽`
      this.modalTotalPrice.style.display = 'block';
    } else {
      this.modalTotalPrice.style.display = 'none';
    }
    this.fillingModalBasket(infoCards);
  }

  fillingModalBasket(infoCards) {
    document.querySelector('.container-items-in-box').innerHTML = '';
    if (localStorage.getItem('inBox')) {
      this.titleBox.textContent = 'Ваша корзина';
      this.boxContents.style.display = 'block';
      this.countInBox.textContent = `${this.boxCount} `;
      this.sumTotalPriceInBox.textContent = `${this.sumTotalPrice} ₽`;
      console.log('inBoxLS', this.inBoxLS);
      for (let elem in this.inBoxLS) {
        const template = document.querySelector('.template-item-in-box').cloneNode(true);
        template.content.querySelector('.photo-pet-box').src = infoCards[elem].img;
        template.content.querySelector('.quantity-breed').textContent = this.inBoxLS[elem];
        template.content.querySelector('.price-box').textContent =
          `${this.inBoxLS[elem] * infoCards[elem].price} ₽`;
        template.content.querySelector('.minus').dataset.idcards =
        document.querySelector('.container-items-in-box').appendChild(template.content);
      }
    } else {
      this.titleBox.textContent = 'Ваша корзина пуста';
      this.boxContents.style.display = 'none';
    }
  }
}


// synchronizationBox(infoCards) {
//   const rowItems = document.querySelectorAll('.row-items');
//   const mainBox = document.querySelector('.main-box');
//   const totalPrice = document.querySelector('.total-price');
//   const boxInfo = document.querySelectorAll('.box-info');
//   const sumIconBox = document.querySelector('.sum-icon-box');
//   totalPrice.textContent = '';
//   this.boxCount = 1;
//   if (localStorage.getItem('inBox')) {
//     rowItems.forEach((elem, idx) => {
//       if (idx !== 0) mainBox.removeChild(mainBox.lastChild);
//     });
//     this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
//     for (let item in this.inBoxLS) {
//       this.sumTotalPrice = 0;
//       const templateBox = document.querySelector('.row-items');
//       const itemBox = templateBox.cloneNode(true);
//       document.querySelector('.collections-row-items').style.display = 'block';
//       templateBox.style.display = "none";
//       itemBox.style.display = 'block';
//       itemBox.dataset.idcards = item;
//       itemBox.querySelector('.photo-pet-box').src = infoCards[+item].img;
//       itemBox.querySelector('.breed-box').textContent = infoCards[+item].breed;
//       itemBox.querySelector('.price-box').textContent = this.inBoxLS[item] * infoCards[+item].price;
//       itemBox.querySelector('.del-item').dataset.idcards = infoCards[+item].id;
//       itemBox.querySelector('.quantity-breed').dataset.idcards = infoCards[+item].id;
//       itemBox.querySelector('.quantity-breed').textContent = this.inBoxLS[item];
//       itemBox.querySelector('.invisible-price').dataset.idcards = infoCards[+item].id;
//       itemBox.querySelector('.plus').dataset.idcards = infoCards[+item].id;
//       itemBox.querySelector('.minus').dataset.idcards = infoCards[+item].id;
//       totalPrice.textContent = +totalPrice.textContent + infoCards[+item].price * this.inBoxLS[item];
//       document.querySelector('.main-box').appendChild(itemBox);
//       this.boxCount = Object.values(this.inBoxLS).reduce((acc, elem) => acc + +elem, 0);
//       boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`);
//
//     }
//     totalPrice.textContent += ` ₽`;
//     sumIconBox.textContent = `на сумму ${totalPrice.textContent}`;
//     sumIconBox.style.display = 'block';
//     document.querySelector('.h1-box').textContent = 'Ваша карзина';
//   } else {
//     document.querySelector('.h1-box').textContent = 'Ваша карзина пуста';
//     rowItems.forEach((elem, idx) => {
//       if (idx !== 0) mainBox.removeChild(mainBox.lastChild);
//     });
//     document.querySelector('.collections-row-items').style.display = 'none';
//   }
//   const delItem = document.querySelectorAll('.del-item');
//   delItem.forEach(elem => {
//     elem.addEventListener('click', () => {
//       delete this.inBoxLS[elem.dataset.idcards];
//       if (Object.keys(this.inBoxLS).length) {
//         localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
//       } else {
//         localStorage.removeItem('inBox');
//         boxInfo.forEach(elem => elem.textContent = `Корзина`);
//         sumIconBox.style.display = 'none';
//       }
//       this.synchronizationBox(infoCards);
//       this.boxCount = Object.values(this.inBoxLS).reduce((acc, elem) => acc + +elem, 0);
//       if(this.boxCount === 0) {
//         boxInfo.forEach(elem => elem.textContent = `Корзина`);
//       } else {
//         boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`);
//       }
//     })
//   });
//   const allPlus = document.querySelectorAll('.plus');
//   allPlus.forEach(plus => {
//     plus.addEventListener('click', () => {
//       this.inBoxLS[plus.dataset.idcards] += 1;
//       localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
//       this.synchronizationBox(infoCards);
//     })
//   });
//   const allMinus = document.querySelectorAll('.minus');
//   allMinus.forEach(minus => {
//     minus.addEventListener('click', () => {
//       this.inBoxLS[minus.dataset.idcards] -= 1;
//       if (this.inBoxLS[minus.dataset.idcards] === 0) {
//         delete this.inBoxLS[minus.dataset.idcards];
//       }
//       if (Object.keys(this.inBoxLS).length === 0) {
//         localStorage.removeItem('inBox');
//         sumIconBox.style.display = 'none';
//         boxInfo.forEach(elem => elem.textContent = `Корзина`);
//       } else {
//         localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
//       }
//       this.synchronizationBox(infoCards);
//     });
//   });
// }
