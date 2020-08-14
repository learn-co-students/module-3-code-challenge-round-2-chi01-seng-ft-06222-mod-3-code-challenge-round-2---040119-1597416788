const beersUrl = 'http://localhost:3000/beers'
// const singleBeerUrl = `http://localhost:3000/beers/${beer.id}`

function main (){
    fetchBeers()
}

function fetchBeers(){
    fetch(beersUrl)
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach((beer) => renderBeer(beer))
    })
}

function renderBeer(beer){
    const beerList = document.querySelector('#list-group')
    beerList.innerHTML +=  `<li data-id="${beer.id}" class="list-group-item">${beer.name}</li>`
    addBeerClick(beer)
    // updateDescription(beer)
}

function addBeerClick(beer){

    ///////// this only works on the very first beer, BUZZ
    const beerLi = document.querySelector('.list-group-item')
    
    beerLi.addEventListener('click', function(){
        fetch(`${beersUrl}/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(beer => {
        const beerDeets = document.querySelector('#beer-detail')
        beerDeets.innerHTML = `<h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea class="beer-form">${beer.description}</textarea>
        <button data-id="${beer.id}" id="edit-beer" class="btn btn-info">
          Save
        </button>`
        console.log(beer)
        })       
    })
    //grab li
    //we want to bind a click listener to the LI of a beer
    //grab beer detail div
    //show clicked beer in that div

    /////////////haley note: this only shows the first beer :/ 
}



////////////////// started working on the code below, but it messes with my list


// function updateDescription(beer){
//     const reqObj = (`${beersUrl}/${event.target.dataset.id}`, {
//         method: 'PATCH',
//         headers:  {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           },
//         body: {description: newDescription}
//     })
//     const descriptionForm = document.querySelector('.beer-form')
//     const newDescription = event.target[0].value
//     descriptionForm.addEventListener('submit', reqObj)
    

//     //we want to find the button
//     //set an event listener for the button
//     //scrape the data
//     //send data to backend
//     //render that on a front end

// }



main()