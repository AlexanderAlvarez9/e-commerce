const API = './src/data.json';
const $productCard = document.querySelector('.content--products--cards');
const $categoryList = document.querySelector('.panel--subitem');
const $reset = document.querySelector('.resetButton');
const $modal = document.querySelector('.modal');
const $modalDetails = document.querySelector('.modal-details');



const getData = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        cardContructor(data);
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    }
}

function cardContructor(result) {
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
            $modalDetails.innerHTML = `
            <img class="details--product__img" src="${result[i].image}" alt="Imagen de Producto">
            <div class="details-text">
                <h3 class="details--product__title">${result[i].product}</h3>
                <p class="details--product__description">Descripcion: ${result[i].description}</p>
                <p class="details--product__category">Categoria:${result[i].category}</p>
                <p class="details--product__price">Precio: $${result[i].price}</p>
                <div class="details--product__details">
                    <i class="icon icon-cart-plus"></i>
                    <p value="${result[i].id}">Agregar al Carrito</p>
                </div>
            </div>
            <div class="modal--close"><span>&times;</span></div>
            `
            //Obtener Boton agregar a carrito
            let $addButtonCart = document.querySelector('.details--product__details p')
            let value = $addButtonCart.getAttribute('value')

            addToCard(result, value)
            console.log(value);

            //Cerrar modal con la X de cerrar
            let $closeModal = document.querySelector('.modal--close');
            $closeModal.addEventListener("click", () => {
                $modal.style.display = "none";
            })
        });

    }

    // $addButtonCart.addEventListener('click', console.log(`soy ${result[1].id}`))



    //Cerrar Modal
}

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

function getCatFilter(result) {
    const $catButton = document.querySelectorAll('.catButton');

    for (let i = 0; i < $catButton.length; i++) {
        $catButton[i].addEventListener("click", function () {
            var newFilter = result.filter(item => item.category == $catButton[i].textContent)
            $productCard.innerHTML = ""
            $categoryList.innerHTML = ""
            cardContructor(newFilter);
        });
    }

}

let addToCard = (results, item) => {
    console.log(`Agregar a el carro a el elemento ${results[item].id - 1}`);
    console.log(results[item - 1]);

}

getData()