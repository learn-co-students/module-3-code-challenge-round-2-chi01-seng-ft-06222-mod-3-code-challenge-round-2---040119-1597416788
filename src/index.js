
function main() {
    fetchBeers()
    beerClickListener()
}



const beersRoute = "http://localhost:3000/beers"

function fetchBeers() {
    fetch(beersRoute)
    .then(resp => resp.json())
    .then(beers => {
        renderBeerList(beers)
    })
}

function renderBeerList(beers) {
    beers.forEach(function(beer) {
        const beerListContainer = document.querySelector('ul')
        const newBeerListEl = document.createElement('li')
        newBeerListEl.dataset.id = beer.id
        newBeerListEl.innerHTML = beer.name
        newBeerListEl.className = "list-group-item"
        beerListContainer.append(newBeerListEl)
    })
}



function beerClickListener() {
    const beerListContainer = document.querySelector('ul')
    beerListContainer.addEventListener('click', function(event) {
        const selectedBeerId = event.target.dataset.id
        
        fetch(`${beersRoute}/${selectedBeerId}`)
            .then(resp => resp.json())
            .then(beer =>{
                const beerInfoContainer = document.querySelector("#beer-detail")
                const beerHtml = `<h1>${beer.name}</h1><img src="${beer.image_url}"><h3>${beer.tagline}</h3 ><textarea id="beer-description" >${beer.description}</textarea><button id="edit-beer" class="btn btn-info">Save</button>`
                beerInfoContainer.innerHTML = beerHtml
                beerSaveListener(beer)
            })
    })
}

function beerSaveListener(beer) {
    const beerDetailContainer = document.querySelector("#edit-beer")
    beerDetailContainer.addEventListener('click', function(event) {
        
        const currentDescription = document.querySelector("#beer-description").value
        const reqObj = {
            method: 'PATCH',
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
            body: JSON.stringify({description: currentDescription})
        }

        fetch(`${beersRoute}/${beer.id}`, reqObj)
    })
}



main()
