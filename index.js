'use strict'
const field = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
const container = document.getElementById('#container');


function paint(field) {
  const children = container.children;
  field.flat().forEach((element, index) => {
    let child = children[index].firstChild
    if(element !== 0 ) {
      child.textContent = element
    } else {
      child.textContent = ''
      children[index].style.background = '#FFFFFF'
    }
    switch (element) {
      case 0:
        children[index].style.background = '#FFFFFF'
        break
      case 2:
        children[index].style.background = '#E4E1D8'
        break
      case 4:
        children[index].style.background = '#DFDACD'
        break
      case 8:
        children[index].style.background = '#B2CEC7'
        break
      case 16:
        children[index].style.background = '#8FBCB1'
        break
      case 32:
        children[index].style.background = '#678F83'
        break
      case 64:
        children[index].style.background = '#51796D'
        break
      case 128:
        children[index].style.background = '#FAA1AA'
        break
      case 256:
        children[index].style.background = '#F07D88'
        break
      case 512:
        children[index].style.background = '#B7CCEB'
        break
      case 1024:
        children[index].style.background = '#A6BAD8'
        break
      case 2048:
        children[index].style.background = '#BFA6D8'
        break
    }
  })
}


function logic(field) {

}


function sortNulls(row, flag, field, columIndex) {
  if (flag === 'right') {
    row.sort((a, b) => {
      if (a === 0 && a !== b) {
        return -1
      }
      if (a !== 0 && b === 0) {
        return 1
      }
    })
  }
  if (flag === 'left') {
    row.sort((a, b) => {
      if (a === 0 && a !== b) {
        return 1
      }
      if (a !== 0 && b === 0) {
        return -1
      }
    })
  }
  if (flag === 'top') {
    sortNullsTop(field, columIndex)
  }
  if (flag === 'bot') {
    sortNullsBot(field, columIndex)
  }
  function sortNullsTop(arr, columIndex) {
    let arrayToSort = []
    for (let s = 0; s < arr.length; s++) {
      arrayToSort.push(arr[s][columIndex])
    }
    arrayToSort.sort((a, b) => {
      if (a === 0 && a !== b) {
        return 1
      }
      if (a !== 0 && b === 0) {
        return -1
      }
    })
    for (let f = 0; f < arr.length; f++) {
      arr[f][columIndex] = arrayToSort[f]
    }
  }
  function sortNullsBot(arr, columIndex) {
    let arrayToSort = []
    for (let s = 0; s < arr.length; s++) {
      arrayToSort.push(arr[s][columIndex])
    }
    arrayToSort.sort((a, b) => {
      if (a === 0 && a !== b) {
        return -1
      }
      if (a !== 0 && b === 0) {
        return 1
      }
    })
    for (let f = 0; f < arr.length; f++) {
      arr[f][columIndex] = arrayToSort[f]
    }
  }
}

function pushedRight(field) {
  for (let i = 0; i < field.length; i++) {
    for (let y = 0; y < field[i].length; y++) {
      sortNulls(field[i], 'right')
      if (field[i][y] === field[i][y + 1]) {
        field[i][y + 1] = field[i][y + 1] * 2
        field[i][y] = 0      

      }
    }
    if (field[field.length - 1] === field[field.length - 2]) {
      field[field.length - 1] = field[field.length - 1] * 2
      field[field.length - 2] = 0
    }
    sortNulls(field[i], 'right')
  }
}

function pushedLeft(field) {
  for (let i = 0; i < field.length; i++) {
    for (let y = field[i].length; y > 0; y--) {
      if (field[i][y] === field[i][y - 1]) {
        field[i][y - 1] = field[i][y - 1] * 2
        field[i][y] = 0
        sortNulls(field[i], 'left')
      }
    }
    if (field[0] === field[1]) {
      field[0] = field[0] * 2
      field[1] = 0
    }
    sortNulls(field[i], 'left')
  }

}

function pushedTop(field) {
  for (let i = 0; i < field.length; i++) {
    for (let j = field.length - 1; j > 0; j--) {
      sortNulls(null, 'top', field, i)
      if (field[j][i] === field[j - 1][i]) {
        field[j - 1][i] = field[j - 1][i] * 2
        field[j][i] = 0
        sortNulls(null, 'top', field, i)
      }
    }
    if (field[0][i] === field[1][i]) {
      field[0][i] = field[0][i] * 2
      field[1][i] = 0
    }    
  }
}


function pushedBot(field) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field.length - 1; j++) {
      sortNulls(null, 'bot', field, i)
      if (field[j][i] === field[j + 1][i]) {
        field[j + 1][i] = field[j + 1][i] * 2
        field[j][i] = 0
        sortNulls(null, 'bot', field, i)
      }
    }
    if (field[field.length - 1][i] === field[field.length - 2][i]) {
      field[field.length - 1][i] = field[field.length - 1][i] * 2
      field[field.length - 2][i] = 0
    }    
  }
}

//Старт игры
function init(field) {
  for (let i = 0; i < 2; i++) {
    generateRandom(field)
  }
}


function generateRandom(field) {
  let numberOfNulls = foundNulls(field)
  let random = Math.floor(0 + Math.random() * (numberOfNulls.length - 0))
  let randomized = numberOfNulls[random]
  field[randomized[0]][randomized[1]] = 2
  return
}

function foundNulls(field) {
  let arrayOfNulls = []
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      let arr = [i, j]
      if (field[i][j] === 0) {
        arrayOfNulls.push(arr)
      }
    }
  }
  return arrayOfNulls
}


document.addEventListener('keydown', event => {
  if (event.keyCode == 68) {
    pushedRight(field)
    generateRandom(field)
    paint(field)
  }
  if (event.keyCode == 65) {
    pushedLeft(field)
    generateRandom(field)
    paint(field)
  }
  if (event.keyCode == 87) {
    pushedTop(field)
    generateRandom(field)
    paint(field)
  }
  if (event.keyCode == 83) {
    pushedBot(field)
    generateRandom(field)
    paint(field)
  }
});



init(field)
paint(field)