const API = './src/data.json';
const $productCard = document.querySelector('.content--products--cards');
const $categoryList = document.querySelector('.panel--subitem');
const $reset = document.querySelector('.resetButton');
const $modal = document.querySelector('.modal');
const $modalDetails = document.querySelector('.modal--details-generated');
const $products = document.querySelector('.main');
let $addButtonCart = document.querySelector('.objectValue')
const $cartCount = document.querySelector('.cart-count')
const $buttonCart = document.querySelector('.modal--details--product__addCart')
const $payButton = document.querySelector('.pay')



const getData = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        cardConstructor(data);
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    }
}

function cardConstructor(result) {
    result.forEach((result) => {
        // console.log(result.id);
        $productCard.innerHTML += `
                <div class="content--products--cards--card ">
                    <img class="product__img" src="${result.image}" alt="Imagen de Producto">
                    <h3 class="product__title">${result.product}</h3>
                    <p class="product__category">${result.category}</p>
                    <p class="product__price">Precio: $${result.price}</p>
                    <div class="product__details">Ver Mas</div>
                </div>
                `
    });
    //Construye nuevas categorias
    $categoryList.innerHTML = ""
    category(result);

    //Escuchador de eventos para el ver mas y cerrar
    let $buttonDetails = document.querySelectorAll('.product__details');

    for (let i = 0; i < $buttonDetails.length; i++) {
        $buttonDetails[i].addEventListener("click", () => {

            $modalDetails.innerHTML = ""
            $modal.style.display = "grid";
            $products.style.display = "none";
            $modalDetails.innerHTML = `
                <img class="modal--details--product__img" src="${result[i].image}" alt="Imagen de Producto">
                <h3 class="modal--details--product__title">${result[i].product}</h3>
                <p class="modal--details--product__description">Descripcion: ${result[i].description}</p>
                <p class="modal--details--product__category">Categoria:${result[i].category}</p>
                <p class="modal--details--product__price">Precio: $${result[i].price}</p>
                `
            $addButtonCart.setAttribute('value', result[i].id)
        });
    }

    $buttonCart.addEventListener('click', () => {
        getValueForCart(result)
    })

}


function getValueForCart(result) {
    //Obtener Boton agregar a carrito
    let value = $addButtonCart.getAttribute('value')
    $cartCount.textContent = localStorage.length + 1
    $modal.style.display = "none";
    $products.style.display = "grid";
    addToCard(result, value)
}

//Cerrar modal con la X de cerrar
let $closeModal = document.querySelector('.modal--close');

$closeModal.addEventListener("click", () => {
    $modal.style.display = "none";
    $products.style.display = "grid";
})

$payButton.addEventListener("click", () => {
    clearLocal();
})

function category(result) {
    //Obtener solo valores de categoria
    const cate = result.map(item => item.category)
    // Obtener valores Unicos de categoria
    const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice;
    }
    let categories = cate.filter(distinto);

    //Ordenar Categorias de menor a mayor
    let sortCategories = categories.sort(function (a, b) {
        return a - b;
    });

    //Crear Categorias
    for (let i = 0; i < sortCategories.length; i++) {
        $categoryList.innerHTML += `
        <li class="catButton"><a class="panel--subitem-button">${sortCategories[i]}</a></li>
    `
    }
    getCatFilter(result);
}

//Filter categories
function getCatFilter(result) {
    const $catButton = document.querySelectorAll('.catButton');

    for (let i = 0; i < $catButton.length; i++) {
        $catButton[i].addEventListener("click", function () {
            var newFilter = result.filter(item => item.category == $catButton[i].textContent)
            $productCard.innerHTML = ""
            $categoryList.innerHTML = ""
            cardConstructor(newFilter);
        });
    }

}

let addToCard = (results, item) => {
    let position = 0;

    localStorage.setItem(item, JSON.stringify(results[item]))

    console.log(`Agregar a el carro a el elemento ${results[item].id - 1}`);
    console.log(results[item - 1]);

    console.log(localStorage);
}

getData()
// getValueForCart(_)

function clearLocal() {
    localStorage.clear()
    return 'done'
}

function printLocal() {
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}