import {initButtonActions} from '../js/boxScript.js';
const xhr = new XMLHttpRequest();

xhr.onload = function () {
    initOnload1();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

function initOnload1() {

    let temp = xhr.responseText;
    let infoCards = JSON.parse(temp);

    let parentItem = document.querySelector('.product-section');
    const menuFilter = document.createElement("div");
    menuFilter.classList.add('menuFilter');
    let filterCount = 0;
    let buttonFilter = document.createElement("span");
    buttonFilter.classList.add('buttonFilter');
    buttonFilter.textContent = 'Показать';
    let allCheckboxLabel = document.querySelectorAll('.label');
    let hunterCheckbox = document.querySelector("#hunter");
    let companionCheckbox = document.querySelector("#companion");
    let decorativeCheckbox = document.querySelector("#decorative");
    let serviceCheckbox = document.querySelector("#service");
    let noFearCheckbox = document.querySelector("#noFear");
    let shedsLittleCheckbox = document.querySelector("#shedsLittle");
    let excellentHealthCheckbox = document.querySelector("#excellentHealth");
    let goodObedienceCheckbox = document.querySelector("#goodObedience");
    let veryDevotedCheckbox = document.querySelector("#veryDevoted");
    let checkboxAll = document.querySelectorAll('.checkbox');
    let filter = {};
    let resultFilter = [];
    let i = 0;

   checkboxAll.forEach(checkbox => {
        if (checkbox.checked) {
            i++;
        }
    });
    filter.hunter = hunterCheckbox.checked;
    filter.companion = companionCheckbox.checked;
    filter.decorative = decorativeCheckbox.checked;
    filter.service = serviceCheckbox.checked;
    filter.noFear = noFearCheckbox.checked;
    filter.shedsLittle = shedsLittleCheckbox.checked;
    filter.excellentHealth = excellentHealthCheckbox.checked;
    filter.goodObedience = goodObedienceCheckbox.checked;
    filter.veryDevoted = veryDevotedCheckbox.checked;
    filterCards();
    let template = document.querySelector('.product-list__item');
    parentItem.textContent = '';

    const randomSortCards = resultFilter.sort(function () {
        return Math.random() - 0.5;
    });

    const fragment = document.createDocumentFragment();
    randomSortCards.forEach((resultFilter) => {
        const item = template.cloneNode(true);
        item.querySelector('a').href = `card.html?id=${resultFilter.id}`;
        item.querySelector('img').src = resultFilter.img;
        item.querySelector('.breed').textContent = resultFilter.breed;
        item.querySelector('.price').textContent = `${resultFilter.price}₽`;
        item.querySelector('.inBox').dataset.idcards = resultFilter.id;

        fragment.appendChild(item);
        item.style.display = "block";
        document.querySelector('.product-section').appendChild(fragment);
    });
    initButtonActions(infoCards)

    template.style.display = "none";
    menuFilter.style.display = "none";


    function init() {

        hunterCheckbox.addEventListener('change', (event) => {
            filter.hunter = !!event.target.checked;
            console.log("хантер ", filter.hunter);
            filterCards();
        })

        companionCheckbox.addEventListener('change', (event) => {
            filter.companion = !!event.target.checked;
            console.log("компаньён ", filter.companion);
            filterCards();
        })

        decorativeCheckbox.addEventListener('change', (event) => {
            filter.decorative = !!event.target.checked;
            console.log("декоративная ", filter.decorative);
            filterCards();
        })

        serviceCheckbox.addEventListener('change', (event) => {
            filter.service = !!event.target.checked;
            console.log("служебная ", filter.service);
            filterCards();
        })

        noFearCheckbox.addEventListener('change', (event) => {
            filter.noFear = !!event.target.checked;
            console.log("отсутствует страх ", filter.noFear);
            filterCards();
        })

        shedsLittleCheckbox.addEventListener('change', (event) => {
            filter.shedsLittle = !!event.target.checked;
            console.log("мало линяет ", filter.shedsLittle);
            filterCards();
        })

        excellentHealthCheckbox.addEventListener('change', (event) => {
            filter.excellentHealth = !!event.target.checked;
            console.log("отличное здоровье ", filter.excellentHealth);
            filterCards();
        })

        goodObedienceCheckbox.addEventListener('change', (event) => {
            filter.goodObedience = !!event.target.checked;
            console.log("хорошее послушание ", filter.goodObedience);
            filterCards();
        })

        veryDevotedCheckbox.addEventListener('change', (event) => {
            filter.veryDevoted = !!event.target.checked;
            console.log("очень преданная ", filter.veryDevoted);
            filterCards();
        })

        const handler1 = (event) => {
            menuFilter.style.display = 'none';
            event.path[2].appendChild(menuFilter);
            setTimeout(() => {
                menuFilter.style.display = 'block';
            }, 600);
        };
        allCheckboxLabel.forEach(elem => {
                elem.addEventListener('click', handler1);
            }
        )
    }

    init();

    function filterCards() {
        resultFilter = [];
        infoCards.forEach((card) => {
            if (filter.hunter && !card.hunter) {
                return;
            }
            if (filter.companion && !card.companion) {
                return;
            }
            if (filter.decorative && !card.decorative) {
                return;
            }
            if (filter.service && !card.service) {
                return;
            }
            if (filter.noFear && !card.noFear) {
                return;
            }
            if (filter.shedsLittle && !card.shedsLittle) {
                return;
            }
            if (filter.excellentHealth && !card.excellentHealth) {
                return;
            }
            if (filter.goodObedience && !card.goodObedience) {
                return;
            }
            if (filter.veryDevoted && !card.veryDevoted) {
                return;
            }
            resultFilter.push(card);
        })
        console.log("отфильтрованный список", resultFilter);
        filterCount = resultFilter.length;
        menuFilter.textContent = `Найдено совпадений: ${filterCount} `;
        menuFilter.appendChild(buttonFilter);
    }

    menuFilter.addEventListener('click', (event) => {
        let template = document.querySelector('.product-list__item');
        parentItem.textContent = '';

        const randomSortCards = resultFilter.sort(function () {
            return Math.random() - 0.5;
        });

        const fragment = document.createDocumentFragment();
        randomSortCards.forEach((resultFilter) => {
            const item = template.cloneNode(true);
            item.querySelector('a').href = `cards/card.html?id=${resultFilter.id}`;
            item.querySelector('img').src = resultFilter.img;
            item.querySelector('.breed').textContent = resultFilter.breed;
            item.querySelector('.price').textContent = `${resultFilter.price}₽`;
            item.querySelector('.inBox').dataset.idcards = resultFilter.id;
            fragment.appendChild(item);
            item.style.display = "block";
            document.querySelector('.product-section').appendChild(fragment);
        });
        template.style.display = "none";
        menuFilter.style.display = "none";
        initButtonActions(infoCards)
    })
}

