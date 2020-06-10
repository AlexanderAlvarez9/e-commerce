const $payButton = document.querySelector('.pay');
const $cards = document.querySelector('.cart--cards');
const $cartCount = document.querySelector('.cart-count')
const $subtotal = document.querySelector('.subtotal');
const $shipping = document.querySelector('.shipping');
const $fee = document.querySelector('.fee');
const $total = document.querySelector('.total');
const $localCount = document.querySelector('.localCount');

let shipping = 8000; //Change for cost of shipping
let fee = 0;
let total = 0;

$localCount.textContent = localStorage.length

//Listener for clear cart
$payButton.addEventListener("click", () => {
    clearLocal();
    printLocal()
})

function printLocal() {
    //Set shipping if cart is empty
    if (!localStorage.length) {
        shipping = 0;
    }
    var sub = 0;
    //Build each item from cart
    for (var i = 0; i < localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
        sub = sub + JSON.parse(localStorage.getItem(localStorage.key(i))).price;

        $cards.innerHTML += `
                <div class="cart--cards--product">
                    <h3 class="cart--product__title">${JSON.parse(localStorage.getItem(localStorage.key(i))).product}</h3>
                    <img class="cart--product__img" src="${JSON.parse(localStorage.getItem(localStorage.key(i))).image}" alt="Imagen Producto">
                    <p class="cart--product__description"><strong>Descripcion:</strong> ${JSON.parse(localStorage.getItem(localStorage.key(i))).description}</p>
                    <p class="cart--product__category"><strong>Categoria:</strong> ${JSON.parse(localStorage.getItem(localStorage.key(i))).category}</p>
                    <p class="cart--product__price"><strong>Precio: $</strong>${JSON.parse(localStorage.getItem(localStorage.key(i))).price}</p>
                </div>
        `
    }

    //Set summary
    $subtotal.innerHTML = '$' + sub;
    $shipping.innerHTML = '$' + shipping;
    fee = Math.ceil(sub * 0.19);
    $fee.innerHTML = '$' + fee;
    total = fee + shipping + sub;
    $total.innerHTML = '$' + total;

    //Update cart number
    $cartCount.textContent = localStorage.length
}

//clear cart
function clearLocal() {
    localStorage.clear()
    printLocal()
    location.reload();
}

printLocal()