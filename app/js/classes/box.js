export class Box {
    constructor() {
    }

    sumTotalPrice = 0;
    boxCount = 0;
    itemInBox = [];

    addItem(item) {
        this.itemInBox.push(item);
        this.drawBoxCard(item);
        // console.log('массив с собаками', this.itemInBox);
        this.countingAllAmounts();
    }

    clearBox() {
        this.itemInBox = [];
        this.boxCount = 0;
        this.sumTotalPrice = 0;
    }

    drawBoxCard(item) {
        this.sumTotalPrice = 0;
        let templateBox = document.querySelector('.row-items');
        const itemBox = templateBox.cloneNode(true);
        let sumIconBox = document.querySelector('.sum-icon-box');
        let totalPrice = document.querySelector('.total-price');
        let invisiblePrice = itemBox.querySelector('.invisible-price');
        templateBox.style.display = "none";
        itemBox.dataset.idcards = item.id;
        itemBox.querySelector('.photo-pet-box').src = item.img;
        itemBox.querySelector('.breed-box').textContent = item.breed;
        itemBox.querySelector('.price-box').textContent = item.price;
        itemBox.querySelector('.del-item').dataset.idcards = item.id;
        itemBox.querySelector('.quantity-breed').dataset.idcards = item.id;
        itemBox.querySelector('.invisible-price').dataset.idcards = item.id;
        let quantityBreed = itemBox.querySelector('.quantity-breed');
        let plus = itemBox.querySelector('.plus');
        plus.addEventListener('click', () => {
            quantityBreed.textContent++;
            this.countingAllAmounts()
        })
        let minus = itemBox.querySelector('.minus');
        minus.addEventListener('click', () => {
            quantityBreed.textContent--;
            if (Number(quantityBreed.textContent) === 0) {
                itemBox.parentNode.removeChild(itemBox);
            }
            this.countingAllAmounts()
        })

        this.sumTotalPrice = this.sumTotalPrice + item.price;
        totalPrice.textContent = `${this.sumTotalPrice}₽`;
        invisiblePrice.textContent = item.price;
        itemBox.style.display = "block";
        sumIconBox.textContent = `на сумму ${this.sumTotalPrice}`;
        sumIconBox.style.display = "block";
        document.querySelector('.main-box').appendChild(itemBox);
    }

    countingAllAmounts() {
        this.sumTotalPrice = 0;
        let quantityItemInBox = 0;
        let containerRowItem = document.querySelector('.collections-row-items');
        let rowItems = containerRowItem.querySelectorAll('.row-items');
        let sumPrice = 0;
        let totalPrice = document.querySelector('.total-price');
        let sumIconBox = document.querySelector('.sum-icon-box');
        let totalAmount = document.querySelector('.total-amount');
        let h1Box = document.querySelector('.h1-box');
        let boxInfo = document.querySelector('.box-info');

        rowItems.forEach((rowItem) => {
            let quantityBreed = rowItem.querySelector('.quantity-breed');
            let priceBox = rowItem.querySelector('.price-box');
            let invisiblePrice = rowItem.querySelector('.invisible-price');
            if (quantityBreed.dataset.idcards) {
                priceBox.textContent = invisiblePrice.textContent * quantityBreed.textContent;
                sumPrice = Number(priceBox.textContent);
                this.sumTotalPrice = this.sumTotalPrice + sumPrice;
                quantityItemInBox = quantityItemInBox + Number(quantityBreed.textContent);
                totalAmount.textContent = `${quantityItemInBox} товара(ов) на сумму: `;
            }
        });
        if (this.sumTotalPrice === 0) {
            sumIconBox.style.display = "none";
            containerRowItem.style.display = "none";
            h1Box.textContent = "Ваша корзина пуста";
            this.boxCount = 0;
            boxInfo.textContent = `Корзина`;
        }
        totalPrice.textContent = `${this.sumTotalPrice}₽`;
        sumIconBox.textContent = `на сумму ${this.sumTotalPrice}₽`;
        boxInfo.textContent = `Корзина (${quantityItemInBox})`;
    }
}