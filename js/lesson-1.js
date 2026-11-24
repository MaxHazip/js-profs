const board = {

    id: 1,
    title: "Первая доска",
    ownerEmail: "example@mail.com",
    isPublic: true,
    likes: 8

}

console.log(board.id)
console.log(board.title)
console.log(board.ownerEmail)
console.log(board.isPublic)
console.log(board.likes)

let likes = 0

for(let i = 0; i < 3; i++) {

    likes+=1

}

console.log(likes)

const boards = [

    {
        id: 1,
        title: "Первая доска",
        isPublic: true,
        likes: 8
    },
    {
        id: 2,
        title: "Вторая доска",
        isPublic: true,
        likes: 10
    },
    {
        id: 3,
        title: "Третья доска",
        isPublic: false,
        likes: 12
    },
    {
        id: 4,
        title: "Четвертая доска",
        isPublic: true,
        likes: 1
    },
    {
        id: 5,
        title: "Пятая доска",
        isPublic: false,
        likes: 5
    },

]

for (const oneBoard of boards) {

    console.log(oneBoard.title)

}

const onlyPublicBoards = []

for (const oneBoard of boards) {

    if (oneBoard.isPublic == true) onlyPublicBoards.push(oneBoard)

}

let allLikes = 0

for (const oneBoard of boards) {

    allLikes += oneBoard.likes

}

console.log(allLikes)

function changeBoardTitle(boards, board_id) {

    for (const board of boards) {

        if (board.id === board_id) {
            board.title = "Измененное название"
            return
        }

    }

    console.log(`Нет доски с id ${board_id}`)

}

changeBoardTitle(boards, 1)
changeBoardTitle(boards, 10)

function getPublicBoards(boards, minLikes) {

    const onlyPublicBoards = []

    for (const board of boards) {

        if (board.isPublic && board.likes >= minLikes) onlyPublicBoards.push(board)

    }

    return onlyPublicBoards

}

function boardSortByLikes(boards, mode) {

    const toSort = [...boards]

    for (let i = 0; i < toSort.length - 1; i++) {

        for (let j = i + 1; j < toSort.length; j++) {

            if (mode === "ascending" && toSort[i].likes > toSort[j].likes) {

                let temp = toSort[i]
                toSort[i] = toSort[j]
                toSort[j] = temp                

            } else if (mode === "descending" && toSort[i].likes < toSort[j].likes) {

                let temp = toSort[i]
                toSort[i] = toSort[j]
                toSort[j] = temp

            }

        }

    }

    return toSort

}

const sorted = boardSortByLikes(boards, "ascending")
console.log(sorted)

function getBoardById(board_id, boards) {

    for (const board of boards) {

        if (board.id === board_id) {

            return board

        }

    }

    console.log(`Нет курса с id ${board_id}`)
    return null

}

function increaseLikesById(board_id, boards) {

    for (const board of boards) {

        if (board.id === board_id) {

            board.likes += 1
            console.log(`У доски теперь ${board.likes} лайков`)
            return board.likes

        }

    }

    console.log(`Нет доски с id ${board_id}`)
    return null

}

