function editDesctription(){
const beerDescription = document.querySelector('.description')//class
//const beerDescription = document.getElementsByClassName('description')//class

//Could you please tell me why in this case, line 3 does NOT work but line 2 works? THANK U!

beerDescription.addEventListener('submit', function(event){
    console.log(event)
    event.preventDefault()
    const descri = {
      description: event.target[0].value
      }
    //console.log()
    const reqObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify(descri)
    }
  const beerId = event.target.dataset.id  //set to beerID
  fetch(`http://localhost:3000/beers/${beerId} `, reqObj)
  .then(resp => resp.json())
  .then(beerDescription => {
     //const beerDescriptionField = document.querySelector('.description-field')//class
     const beerDescriptionField = document.getElementsByClassName('description-field')
     beerDescriptionField.innerText = beerDescription
     })
   })

  // get existing description
  // 'submit event listener
  // prevent default
  // get input from the form
  // patch request to the backend
  // show new description on the front end
}





function createClickListener(){
  const ul = document.querySelector('ul')
  ul.addEventListener('click', function(event){
    if(event.target.tagName === 'LI') {
      const beerId = event.target.dataset.id
      fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(beer => {
        showBeer(beer)
      })

    }
  })
}

function showBeer(beer) {
  const showDetail = document.getElementById('beer-detail')
  const beerHtml= `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <form class="description" data-id="${beer.id}">
  <textarea class="description-field">${beer.description}</textarea>
  <button>Save</button>
  </form>`
//<button id="edit-beer" class="btn btn-info">
   showDetail.innerHTML = beerHtml
   editDesctription()
  }


function fetchBeers(){
  fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(beers => {
    renderBeers(beers)
  })
}


function renderBeers(beers){
  beers.map(function(beer){
    const ul = document.querySelector('ul')
    const beerLi = document.createElement('li')
    beerLi.dataset.id = beer.id
    beerLi.innerText = beer.name
    ul.append(beerLi)
    // grab the ul
    // create a new li for each beer
    // throw that li into the ul
  })
}





////invoke
fetchBeers()
createClickListener()

