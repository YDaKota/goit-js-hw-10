import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchInput.addEventListener('input',  debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput (e) {
    e.preventDefault();
    let searchData = e.target.value.trim();
    //console.log(searchData);

    if (searchData) {
        fetchCountries(searchData)
        .then(responseData => {
            if (responseData.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            } else if (responseData.length >= 2 && responseData.length <= 10) {
                renderCountryList(responseData);
                return;
            } else if (responseData.length === 1) {
                renderCountry(responseData);
                return;
            }
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name.')
        })
        //.finally(() => form.reset());
    } else {
        return "Type country name"; 
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
    }
}

function renderCountryList(countries) {
    const markup = countries
        .map(({ name, flags }) => {
        return `<li>
            <img src="${flags.svg}" alt="Flag of ${name.official}" width = 35px height = 20px>
            <h2>${name.common}</h2>
        </li>`
        })
        .join("");
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';
}

function renderCountry(countries) {
    console.log(countries)
    
    const markup = countries.map(({ name, capital, population, languages, flags }) => {
        return `<ul>
        <li><img src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 20px></li>
        <li><h1>${name.common}</h1></li>
        <li><p><b>Capital: </b>${capital}</p></li>
        <li><p><b>Population: </b>${population}</p></li>
        <li><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>`
        })
        .join("");
    countryList.innerHTML = '';
    // console.log(markup);
    countryInfo.innerHTML = markup;
}




// Задание - поиск стран
// Создай фронтенд часть приложения поиска данных о стране по её частичному или полному имени. Посмотри демо видео работы приложения.

// HTTP-запросы
// Используй публичный API Rest Countries, а именно ресурс name, возвращающий массив объектов стран удовлетворивших критерий поиска. Добавь минимальное оформление элементов интерфейса.

// Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name и возвращает промис с массивом стран - результатом запроса. Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

// Фильтрация полей
// В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится. Чтобы сократить объем передаваемых данных добавь строку параметров запроса - так этот бэкенд реализует фильтрацию полей. Ознакомься с документацией синтаксиса фильтров.

// Тебе нужны только следующие свойства:

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
// Поле поиска
// Название страны для поиска пользователь вводит в текстовое поле input#search-box. HTTP-запросы выполняются при наборе имени страны, то есть по событию input. Но, делать запрос при каждом нажатии клавиши нельзя, так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке.

// Необходимо применить приём Debounce на обработчике события и делать HTTP-запрос спустя 300мс после того, как пользователь перестал вводить текст. Используй пакет lodash.debounce.

// Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.

// Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.

// Интерфейс
// Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление о том, что имя должно быть более специфичным. Для уведомлений используй библиотеку notiflix и выводи такую строку "Too many matches found. Please enter a more specific name.".

// Too many matches alert

// Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. Каждый элемент списка состоит из флага и имени страны.

// Country list UI

// Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.

// Country info UI

// ВНИМАНИЕ
// Достаточно чтобы приложение работало для большинства стран. Некоторые страны, такие как Sudan, могут создавать проблемы, поскольку название страны является частью названия другой страны, South Sudan. Не нужно беспокоиться об этих исключениях.

// Обработка ошибки
// Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, а ошибку со статус кодом 404 - не найдено. Если это не обработать, то пользователь никогда не узнает о том, что поиск не дал результатов. Добавь уведомление "Oops, there is no country with that name" в случае ошибки используя библиотеку notiflix.

// Error alert

// ВНИМАНИЕ
// Не забывай о том, что fetch не считает 404 ошибкой, поэтому необходимо явно отклонить промис чтобы можно было словить и обработать ошибку