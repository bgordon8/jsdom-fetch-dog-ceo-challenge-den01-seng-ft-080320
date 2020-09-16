console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
const breedList = document.getElementById('dog-breeds')
const select = document.getElementById('breed-dropdown')
const items = document.getElementsByTagName('li')

let breedArr = []

fetch(imgUrl)
    .then(response => response.json())
    .then(images => handleData(images))

fetch(breedUrl)
    .then(response => response.json())
    .then(breeds => {
        breedArr = Object.keys(breeds.message)
        handleBreedData(breedArr)
    })

function handleData(images) {
    images.message.forEach(renderData)
}

function renderData(image) {
    const newImage = document.getElementById('dog-image-container')
    const img = document.createElement('img')
    img.src = image
    newImage.append(img)
}

function handleBreedData(breedArr) {
    breedArr.forEach((breed) => {
        const li = document.createElement('li')
        li.innerHTML = breed
        breedList.appendChild(li)
    })
    changeColor(items)
}

function changeColor(items) {

    Array.from(items).forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.style.color !== 'red') {
                e.target.style.color = 'red'
            }
            else {
                e.target.style.color = 'black'
            }
        })
    })
}

select.addEventListener('change', (e) => {
    const filteredList = breedArr.filter(breed => breed.charAt(0) === e.target.value)
    resetParent(breedList)
    handleBreedData(filteredList)
})

function resetParent(parent) {
    console.log(parent)
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}






