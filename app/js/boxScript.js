import {Box} from "../js/classes/box.js";

const xhr = new XMLHttpRequest();

xhr.onload = function () {
    initOnload();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

export const box = new Box();

export function initOnload() {

    let buttonBox = document.querySelector('.button-basket');
    let sectionBox = document.querySelector('.section-box');
    let shadowBox = document.querySelector('.shadow-box');
    let exitBox = document.querySelector('.exit-box');
    let boxInfo = document.querySelector('.box-info');
    let containerRowItem = document.querySelector('.collections-row-items');
    let totalPrice = document.querySelector('.total-price');
    let sumIconBox = document.querySelector('.sum-icon-box');
    let h1Box = document.querySelector('.h1-box');
    let delAll = document.querySelector('.del-all');
    let sumTotalPrice;
    let boxCount;

    buttonBox.addEventListener('click', () => {
        sectionBox.style.display = "block";
        shadowBox.style.display = "block";
    });

    exitBox.addEventListener('click', () => {
        sectionBox.style.display = "none";
        shadowBox.style.display = "none";
    });

    delAll.addEventListener('click', () => {
        box.clearBox();
        let rowsItem = containerRowItem.querySelectorAll('.row-items');
        rowsItem.forEach((rowItem) => {
            if (rowItem.dataset.idcards > 0) {
                sumTotalPrice = 0;
                totalPrice.textContent = `${sumTotalPrice}₽`;
                boxCount = 0;
                boxInfo.textContent = `Корзина`;
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
    let infoCards;
    if (!temp) {
        let temp = xhr.responseText;
        infoCards = JSON.parse(temp);
    } else {
        infoCards = temp;
    }
    let iconBox = document.querySelector('.iconBox');
    let inBox = document.querySelectorAll('.inBox');
    let boxInfo = document.querySelector('.box-info');
    let totalAmount = document.querySelector('.total-amount');
    let containerRowItem = document.querySelector('.collections-row-items');
    let totalPrice = document.querySelector('.total-price');
    let sumIconBox = document.querySelector('.sum-icon-box');
    let h1Box = document.querySelector('.h1-box');
    let hitCounterDogs = 0;

    inBox.forEach((inBoxItem) => {

        inBoxItem.addEventListener('click', () => {
            box.boxCount++
            containerRowItem.style.display = "block";
            h1Box.textContent = "Ваша корзина";
            totalAmount.textContent = `${box.boxCount} товаров на сумму:`;
            boxInfo.textContent = `Корзина (${box.boxCount})`;
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
                                        boxInfo.textContent = `Корзина (${box.boxCount})`;
                                        totalAmount.textContent = `${box.boxCount} товаров на сумму:`;
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


const a = [
    {id: 1, count: 3},
    {id: 2, count: 1},
];

localStorage.setItem('boxItems', JSON.stringify(a));

const boxItemsString = localStorage.getItem('boxItems');
const boxItems = JSON.parse(boxItemsString);