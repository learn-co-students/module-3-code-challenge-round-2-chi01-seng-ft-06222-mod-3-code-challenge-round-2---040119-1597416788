

function main(){
    fetchBeers()
    createShowListener()
}


function fetchBeers(){
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        renderBeers(beers)
    })
}

function renderBeers(beers){
    beers.forEach(function(beer){
      const ul = document.querySelector('.list-group')
      const beerList = document.createElement('li')
      beerList.dataset.id = beer.id
      beerList.innerText = beer.name
      ul.append(beerList)
    })
}

function renderShowBeer(beer){
    const beerDetail = document.querySelector('#beer-detail')
    const beerHtml = 
        `<h1>'${beer.name}'</h1>
        <img src='${beer.image_url}'>
        <br><br>
        <h3>'${beer.tagline}'</h3>
        <textarea class="description-field" >'${beer.description}'</textarea>
        <br><br>
        <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>Save</button>`
    beerDetail.innerHTML = beerHtml
}


function createShowListener(){
    const ul = document.querySelector('.list-group')
    ul.addEventListener('click', function(event){
        if(event.target.tagName === 'LI'){
            const beerId = event.target.dataset.id
            fetch(`http://localhost:3000/beers/${beerId}`)
            .then(resp => resp.json())
            .then(beer => {
                renderShowBeer(beer)
            })
        }
    })
}


function editBeerDetails(){
    const beerButton = document.querySelector('#edit-beer')
    beerButton.addEventListener('submit', function(event){
        if(event.target.tagname === 'BUTTON'){
            const beerDetails = document.querySelector('.beer-detail')
            beerDetails.description.value = event.target.dataset.description
        } else {
            console.log(event.target)
        }
        
    const reqObj = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(description)
    }

    const beerId = event.target.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
    .then(resp => {return resp.json()})
    .then(beerDetails => {
        const beerDetailsField = document.querySelector('.description-field')
        beerDetailsField.innerText = beerDetails
        })
    })
}




//////////// initializer ////////////
main()

