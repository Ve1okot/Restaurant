const auth = () => {
    const buttonAuth = document.querySelector('.button-auth')
    const buttonCart = document.querySelector('.button-cart')
    const closeAuth = document.querySelector('.close-auth')
    const modalAuth = document.querySelector('.modal-auth')
    const buttonOut = document.querySelector('.button-out')
    const userName = document.querySelector('.user-name')
    const logInForm = document.getElementById('logInForm')
    const inputLogin = document.getElementById('login')
    const inputPassword = document.getElementById('password')

    // Функция входа
    const login = (user) => {
        buttonAuth.style.display = 'none'
        buttonOut.style.display = 'flex'
        userName.style.display = 'flex'
        buttonCart.style.display = 'flex'
        userName.textContent = user.login
        modalAuth.style.display = ''

        // Запись в LS объекта
        localStorage.setItem('user', JSON.stringify(user))
    }

    // Функция выхода
    const logout = (user) => {
        buttonAuth.style.display = ''
        buttonOut.style.display = ''
        userName.style.display = ''
        buttonCart.style.display = ''
        userName.textContent = ''
        modalAuth.style.display = ''

        // Удаление объекта из LS
        localStorage.removeItem('user')
    }

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex'
    })

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = ''
    })

    buttonOut.addEventListener('click', () => {
        logout()
    })

    logInForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const user = {
            login: inputLogin.value,
            password: inputPassword.value,
        }

        if (!user.login) {
            alert("Введите логин!")
        } else if (!user.password) {
            alert("Введите пароль!")
        } else {
            login(user)
        }
    })

    if (localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')))
    }
}

auth()