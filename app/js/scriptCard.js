const DiseasesRequest = new XMLHttpRequest();

let Diseases

DiseasesRequest.onload = function (e) {
    let temp1 = DiseasesRequest.responseText;
    Diseases = JSON.parse(temp1);
};

DiseasesRequest.open("GET", "http://localhost:3000/api/directoryDiseases.json", true);
DiseasesRequest.send();

const xhr = new XMLHttpRequest();

xhr.onload = function (e) {
    init();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

function init() {

    let temp = xhr.responseText;
    let infoCards = JSON.parse(temp);

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    let parentItem = document.querySelector('.main');
    let typePet = parentItem.querySelector('#typePet');
    let sizePet = parentItem.querySelector('#sizePet');
    let subtypes = parentItem.querySelector('#subtypes');
    let intelligence = parentItem.querySelector('#intelligence');
    let price = document.querySelector('.price');
    let diseases = parentItem.querySelector('#diseases');

    infoCards.forEach(itemCard => {
        if (Number(id) === Number(itemCard.id)) {
            parentItem.querySelector('h1').textContent = itemCard.breed;
            parentItem.querySelector('img').src = `../${itemCard.img}`;
            parentItem.querySelector('h2').textContent = `Характеристика ${itemCard.breed}`;
            parentItem.querySelector('.inBox').dataset.idcards = id;

            if (itemCard.hunter) {
                typePet.textContent = `Охотничьи`;
            } else {
                typePet.textContent = ''
            }
            if (itemCard.companion) {
                typePet.textContent = `${typePet.textContent} Компаньоны`
            }
            if (itemCard.decorative) {
                typePet.textContent = `${typePet.textContent} Декоративные`
            }
            if (itemCard.service) {
                typePet.textContent = `${typePet.textContent} Служебные`
            }

            if (itemCard.size === 1) {
                sizePet.textContent = `Маленькая (меньше 11кг)`
            }
            if (itemCard.size === 2) {
                sizePet.textContent = 'Средняя (11-25кг)';
            }
            if (itemCard.size === 3) {
                sizePet.textContent = 'Большая (25-100кг)';
            }
            if (itemCard.size === 4) {
                sizePet.textContent = "Огромная (больше 100кг)";
            }

            if (itemCard.noFear) {
                subtypes.textContent = `Отсутствует чуство страха`
            } else {
                subtypes.textContent = ''
            }
            if (itemCard.shedsLittle) {
                subtypes.textContent = `${subtypes.textContent} Мало линяет`
            }
            if (itemCard.goodObedience) {
                subtypes.textContent = `${subtypes.textContent} Хорошее послушание`
            }
            if (itemCard.veryDevoted) {
                subtypes.textContent = `${subtypes.textContent} Очень преданная`
            }

            intelligence.textContent = itemCard.intelligence;

            price.textContent = itemCard.price;

            diseases.textContent = '';
            for (let i = 1; i <= infoCards[id - 1].frequentIllnesses.length; i++) {
                diseases.textContent = diseases.textContent + " " + Diseases[infoCards[id - 1].frequentIllnesses[i - 1] - 1];
            }
        }
    });

}