const beers_url = 'http://localhost:3000/beers'
document.addEventListener('DOMContentLoaded', function(event){
    allBeers()
})

// Step 1 - Display All Beer Names

function allBeers(){
    fetch(beers_url)
    .then(resp => resp.json())
        .then(allBeers => {
            allBeers.forEach(beer => displayBeerData(beer))
        })
}

function displayBeerData(beer){
    const beerList = document.getElementById('list-group')
    const newBeerTitle = `<li class="list-group-item" id="${beer.id}">${beer.name}</li>`
    beerList.innerHTML += newBeerTitle
    beerList.addEventListener('click', function(event){
        if (event.target.id === `${beer.id}`) {
            beerInfo(beer)
        }
    })
}

// Step 2 - Display Single Beer Details

function beerInfo(beer){
    const singleBeerInfo = document.getElementById('beer-detail')
    const beerInfo = `<h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea id="text-${beer.id}">${beer.description}</textarea>
    <button id="edit-beer" data-id=${beer.id} class="btn btn-info">
      Save
    </button>`
    singleBeerInfo.innerHTML = beerInfo
    singleBeerInfo.addEventListener('click', function(event){
        if(event.target.id === 'edit-beer'){
            editBeerDescription(event)
        }
    })
}


// Step 3 - Edit Beer Details
function editBeerDescription(event){
    const newDescription = {"description": (event.target.previousElementSibling.value) }
    console.log(newDescription)
    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDescription)
    }

    fetch(`${beers_url}/${event.target.dataset.id}`, reqObj)
        .then(resp => {
            return resp.json()
        })
        .then(jsonData => {
            event.target.previousElementSibling.innerHTML = `${jsonData.description}`
        }
        )

}