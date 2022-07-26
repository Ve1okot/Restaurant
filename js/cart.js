const cart = () => {
    const buttonCart = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    const buttonClose = modalCart.querySelector('.close')
    const clearCart = document.querySelector('.clear-cart')
    const buttonSend = modalCart.querySelector('.button-primary')
    const body = modalCart.querySelector('.modal-body')
    const priceTag = modalCart.querySelector('.modal-pricetag')
    let sum = 0

    const resetCart = () => {
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
        location.reload(false);
    }

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count++
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                if (item.count > 1) {
                    item.count--
                } else {
                    cartArray.splice(cartArray.indexOf(item), 1);
                }
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const renderItems = (data) => {
        body.innerHTML = ''
        data.forEach(({
            name,
            price,
            id,
            count
        }) => {
            const cartElem = document.createElement('div')
            cartElem.classList.add('food-row')
            cartElem.innerHTML = `
            <span class="food-name">${name}</span>
            <strong class="food-price">${price} ₽</strong>
            <div class="food-counter">
                <button class="counter-button btn-dec" data-index="${id}">-</button>
                <span class="counter">${count}</span>
                <button class="counter-button btn-inc" data-index="${id}">+</button>
            </div>
            `
            body.append(cartElem)
        })

        cartArray = JSON.parse(localStorage.getItem('cart'))

        sum = cartArray.reduce(function (accum, curr) {
            return accum + curr.price * curr.count
        }, 0)

        priceTag.textContent = sum
    }

    body.addEventListener('click', (event) => {
        event.preventDefault()

        if (event.target.classList.contains('btn-dec')) {
            decrementCount(event.target.dataset.index);
        } else if (event.target.classList.contains('btn-inc')) {
            incrementCount(event.target.dataset.index);
        }
    })

    buttonSend.addEventListener('click', () => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: cartArray
            })
            .then(response => {
                if (response.ok) {
                    resetCart()
                }
            })
            .catch(error => {
                console.error(error);
            })
    })

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }
        modalCart.classList.add('is-open')
    })

    buttonClose.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })

    clearCart.addEventListener('click', () => {
        priceTag.textContent = 0;
        resetCart()
    })
}
cart()