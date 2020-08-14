function main() {
  fetchBeers()
  createClickListener()
  editTextArea()
}

function editTextArea(){
  // const text
  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: 'your new description'
    })
  }

  fetch('http://localhost:3000/beers/${beerID}', reqObj)
  .then(resp => resp.json())
  .then(jsonData => console.log(jsonData))

}




function createClickListener(){
  const ul = document.querySelector('ul')
  ul.addEventListener('click', function(event){
    if(event.target.tagName === 'LI') {
      event.target.style.color = 'red'

      const beerID = event.target.dataset.id
      // console.log(event.target.dataset.id)

      fetch(`http://localhost:3000/beers/${beerID}`)
      .then(resp => resp.json())
      .then(beer => {
        renderShowBeer(beer)
      })
    }
  })
}

function renderShowBeer(beer) {
  const beerPanel = document.getElementById('beer-detail')
  const beerHTML = `<h1>${beer.name}</h1>
  <img src="${beer.image_url}"/>
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>`
    // console.log(beer)
  beerPanel.innerHTML = beerHTML
}





function fetchBeers() {
  fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(beers => {
    // console.log(beers)
    renderBeers(beers)
  })
}

function renderBeers(beers){
  beers.forEach(function(beer){
    const ul = document.querySelector('ul')
    const beerLi = document.createElement('li')
    beerLi.dataset.id = beer.id
    beerLi.innerText = beer.name

    ul.append(beerLi)
    // const li = document.createElement('li')
    // const beerLi = document.getElementById('list-group')
    // beerLi.innerHTML += `<li class="list-group-item">${beer.name}</li>`

    // li.append(beerLi)
  })
  
}


main()