const boards = [

    { id: 1, title: "Первая доска", isPublic: true, likes: 8 },
    { id: 2, title: "Вторая доска", isPublic: false, likes: 3 },
    { id: 3, title: "Третья доска", isPublic: true, likes: 12 },
    { id: 4, title: "Четвертая доска", isPublic: false, likes: 15 },
    { id: 5, title: "Пятая доска", isPublic: true, likes: 10 }

]

function createBoardElement (htmlTag, board) {

    const container = document.createElement(htmlTag)

    container.dataset.boardId = board.id

    const paragraph = document.createElement("p")
    paragraph.textContent = `${board.title} ${board.likes} лайков`
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Удалить"
    deleteButton.dataset.action = "delete"

    const addLikeButton = document.createElement("button")
    addLikeButton.textContent = "Лайк"
    addLikeButton.dataset.action = "like"

    container.appendChild(paragraph)
    container.appendChild(deleteButton)
    container.appendChild(addLikeButton)

    return container

}

const boardsList = document.querySelector("#board-list")

boardsList.addEventListener("click", function (event) {

    const button = event.target.closest("button")

    if (!button || !boardsList.contains(button)) {
        return
    }

    const board = button.closest("li")

    if (!board || !boardsList.contains(board)) {
        return
    }

    const boardId = Number(board.dataset.boardId)

    if (!Number.isInteger(boardId) || boardId <= 0) {

        console.log("Id доски не найден")
        return

    }



    if (button.dataset.action === "like") {

        for (const oneBoard of boards) {
            if (oneBoard.id === boardId) {
                oneBoard.likes += 1
                break
            }
        }
        renderBoards(boards)

    } else if (button.dataset.action === "delete") {

        for (let i = 0; i < boards.length; i++) {
            if (boards[i]["id"] === boardId) {
                boards.splice(i, 1)
                break;
            }
        }
        renderBoards(boards)

    }
})

function renderBoards(boards) {

    const dataMode = boardsList.dataset.mode

    boardsList.replaceChildren()

    if (dataMode === "all") {
        for (const board of boards) {
            const new_board = createBoardElement("li", board)
            boardsList.appendChild(new_board)
        }
    } else if (dataMode === "public") {
        for (const board of boards) {
            if (board.isPublic) {
                const new_board = createBoardElement("li", board)
                boardsList.appendChild(new_board)
            }
        }
    }

}

renderBoards(boards)

const changeTitleButton = document.querySelector("#change-title")

changeTitleButton.addEventListener("click", function () {

    const title = document.querySelector("#page-title")

    title.textContent = "Заголовок изменен!"

})

const showPublicButton = document.querySelector("#show-public")

showPublicButton.addEventListener("click", function () {

    boardsList.dataset.mode = "public"

    renderBoards(boards)

})

const showAllButton = document.querySelector("#show-all")

showAllButton.addEventListener("click", function () {

    boardsList.dataset.mode = "all"

    renderBoards(boards)

})

const titleInput = document.querySelector("#board-title-input")
const titleSubmitButton = document.querySelector("#board-title-submit")
const errorDiv = document.querySelector(".error")

titleSubmitButton.addEventListener("click", function () {

    const title = titleInput.value.trim()

    if (!title) {

        errorDiv.textContent = "Пустое название невозможно"
        return

    }

    let maxId = 0

    for (const board of boards) {

        if (board.id > maxId) maxId = board.id

    }

    const newBoard = {

        "id": maxId + 1,
        "title": title,
        "isPublic": false,
        "likes": 0

    }

    boards.push(newBoard)

    renderBoards(boards)

    titleInput.value = ""
    errorDiv.textContent = ""

})

function validateName(
    data,
    errors
) {

    const nameRegex = /^[A-Za-z]+$/

    if (Object.hasOwn(data, "name") && !nameRegex.test(data["name"])) {

        errors.push("name")

    }

}

function validatePassword(
    data,
    errors
) {

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=?.])[A-Za-z0-9!@#$%^&*()_+\-=?.]{8,}$/

    if (Object.hasOwn(data, "password") && !passwordRegex.test(data["password"])) {

        errors.push("password")

    }

}

function validateEmail(
    data,
    errors
) {

    /** @type {HTMLInputElement} */
    const emailInput = document.querySelector("#email")

    if (!emailInput.checkValidity()) {

        errors.push("email")

    }

}

function validateData(
    data
) {

    const errors = []
    
    validateName(data, errors)
    validatePassword(data, errors)
    validateEmail(data, errors)

    return errors

}

function renderNameErrors(
    errors
) {

    const usernameInput = document.querySelector("#name")
    const usernameErrorField = document.querySelector("#name-error")


    if (errors.includes("name")) {

        usernameInput.classList.add("input-invalid")
        usernameInput.setAttribute("aria-invalid", "true")
        usernameErrorField.textContent = "Некорректное имя"

    } else {

        usernameInput.classList.remove("input-invalid")
        usernameInput.setAttribute("aria-invalid", "false")

        usernameErrorField.textContent = ""

    }

}

function renderPasswordErrors(
    errors
) {

    const passwordInput = document.querySelector("#password")
    const passwordErrorField = document.querySelector("#password-error")

    if (errors.includes("password")) {

        

        passwordInput.classList.add("input-invalid")
        passwordInput.setAttribute("aria-invalid", "true")

        passwordErrorField.textContent = "Некорректый формат пароля"

    } else {

        passwordInput.classList.remove("input-invalid")
        passwordInput.setAttribute("aria-invalid", "false")
        passwordErrorField.textContent = ""

    }

}

function renderEmailErrors(
    errors
) {

    const emailInput = document.querySelector("#email")
    const emailErrorField = document.querySelector("#email-error")

    if (errors.includes("email")) {

        emailInput.classList.add("input-invalid")
        emailInput.setAttribute("aria-invalid", "true")

        emailErrorField.textContent = "Некорректый формат email"

    } else {

        emailInput.classList.remove("input-invalid")
        emailInput.setAttribute("aria-invalid", "false")
        emailErrorField.textContent = ""

    }

}

function renderErrors(
    errors
) {

    renderNameErrors(errors)
    renderPasswordErrors(errors)
    renderEmailErrors(errors)

}

const form = document.querySelector("#register-form")

form.addEventListener("submit", function (event) {

    const formSuccess = document.querySelector("#form-success")
    formSuccess.textContent = ""

    event.preventDefault()

    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())

    const errors = validateData(data)

    renderErrors(errors)

    if (errors.length === 0) {

        const formSuccess = document.querySelector("#form-success")
        formSuccess.textContent = "Данные прошли проверку"

        event.target.reset()

    }

})

form.addEventListener("input", function (event) {

    const formSuccess = document.querySelector("#form-success")
    formSuccess.textContent = ""

    const target = event.target

    const data = {}
    const errors = []

    if (target.id === "name") {

        data["name"] = target.value
        validateName(data, errors)
        renderNameErrors(errors)

    } else if (target.id === "password") {
    
        data["password"] = target.value
        validatePassword(data, errors)
        renderPasswordErrors(errors)
    
    } else if (target.id === "email") {

        data["email"] = target.value
        validateEmail(data, errors)
        renderEmailErrors(errors)

    }

})