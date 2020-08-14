function main(){
    getBeers()
}

function getBeers(){

    fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(beersData => {
            beersData.forEach(listBeers)
            beerClickListener()
        })
}

function listBeers(beer){

    let beerUl = document.getElementById('list-group')
    let newLi = document.createElement('li')
    newLi.innerHTML = `<li id=${beer.id} class="list-group-item">${beer.name}</li>`
    beerUl.append(newLi)
}

function beerClickListener(){

    const targetUl = document.getElementById('list-group')
    targetUl.addEventListener('click', function(event){
        beerId = event.target.id 

        fetch(`http://localhost:3000/beers/${beerId}`)
            .then(resp => resp.json())
            .then(beerData => {
                showBeer(beerData)
                editButtonListener()
            })
    })
}

function showBeer(beerData){

    let targetDiv = document.getElementById('beer-detail')
    targetDiv.innerHTML = `
        <h1>${beerData.name}</h1>
        <img src=${beerData.image_url}>
        <h3>${beerData.tagline}</h3>
        <form action="" data-id=${beerData.id}>
            <textarea name="description">${beerData.description}</textarea>
            <button type="submit" id="edit-beer" data-id=${beerData.id} class="btn btn-info">Save</button>
        </form>
    `
}

function editButtonListener(){
    
    const form = document.querySelector('form')
    form.addEventListener('submit', function(event){
        event.preventDefault()
        alert('beer data saved')
        const newDescription = event.target.description.value
        const beerId = event.target.dataset.id 

        const updatedBeerObj = {
            description: newDescription
        }

        const reqObj = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBeerObj)
        }

        fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
            .then(resp => resp.json())
            .then(beerData => {
                showBeer(beerData)
            }
            )            
    })
}

main()