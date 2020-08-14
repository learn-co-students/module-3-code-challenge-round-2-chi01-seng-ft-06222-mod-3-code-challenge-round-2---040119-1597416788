fetch('http://localhost:3000/beers')
   .then(resp => resp.json())
   .then(beers => {
      beers.forEach(beer => {
         ulTag.innerHTML += createBeerLi(beer)
      })
   })
const ulTag = document.querySelector('#list-group');
const divTag = document.querySelector('#beer-detail');
const createBeerLi = (beer) => {
   return `
   <li class="list-group-item" data-id="${beer.id}">
   ${beer.name}
   </li>
   `
}
const createBeerDiv = (beer) => {
   return `
      <h1 data-id="${beer.id}">${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea name="description">${beer.description}</textarea>
      <br/>
      <button id="edit-beer" class="btn btn-info">
      Save Comment
      </button>
   `
}
ulTag.addEventListener('click', (event) => {
   if (event.target.className === 'list-group-item') {
      return fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
         .then(resp => resp.json())
         .then(beer => {
            divTag.innerHTML = createBeerDiv(beer)
         })
   }
})
const updateBeerInfo = (id, description) => {
   fetch(`http://localhost:3000/beers/${id}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
         description: description
      })
   })
      .then(resp => resp.json())
      .then(beerDOM => {
         beerDOM.innerHTML = description
      })
}
divTag.addEventListener('click', (e) => {
   e.preventDefault();
   if (e.target.className === 'btn btn-info') {
    const updatedBeerDesc = e.target.parentElement.children[3].value;
    const beerId = e.target.parentElement.children[0].dataset.id;     
updateBeerInfo(beerId, updatedBeerDesc)
   }
})