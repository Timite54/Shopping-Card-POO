document.addEventListener('DOMContentLoaded', () => {
    // Création des produits
    const products = [
        new Product(1, 'Baskets', 100),
        new Product(2, 'Socks', 20),
        new Product(3, 'Bag', 50)
    ];

    // Création du panier
    const shoppingCart = new ShoppingCart();

    const cards = document.querySelectorAll('.card');
    const cartTotalElement = document.getElementById('total');

    function updateTotalPrice() {
        cartTotalElement.textContent = `${shoppingCart.getTotal().toFixed(2)} $`;
    }

    cards.forEach((card, index) => {
        const plusBtn = card.querySelector('.fa-plus-circle');
        const minusBtn = card.querySelector('.fa-minus-circle');
        const quantitySpan = card.querySelector('.quantity');
        const trashBtn = card.querySelector('.fa-trash-alt');
        const heartBtn = card.querySelector('.fa-heart');

        // Quantity adjustment
        plusBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
            shoppingCart.addItem(products[index], 1);
            updateTotalPrice();
        });

        minusBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 0) {
                currentQuantity--;
                quantitySpan.textContent = currentQuantity;
                if (currentQuantity === 0) {
                    shoppingCart.removeItem(products[index].id);
                } else {
                    shoppingCart.addItem(products[index], -1);
                }
                updateTotalPrice();
            }
        });

        // Delete item
        trashBtn.addEventListener('click', () => {
            quantitySpan.textContent = '0';
            shoppingCart.removeItem(products[index].id);
            updateTotalPrice();
        });

        // Like
        heartBtn.addEventListener('click', () => {
            heartBtn.classList.toggle('text-danger');
        });
    });

    // Initial total price calculation
    updateTotalPrice();
});