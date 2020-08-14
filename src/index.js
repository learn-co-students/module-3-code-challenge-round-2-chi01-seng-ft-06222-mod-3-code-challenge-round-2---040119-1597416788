function main() {
    fetchBeers()
    beerInfoListener()
    editListener()
}

function fetchBeers() {
    fetch('http://localhost:3000/beers')
      .then(res => res.json())
      .then(beers => {
        beers.forEach(function(beer){
            renderBeers(beer)
        }
      )}
      )
    }

function renderBeers(beer){
    const ul = document.querySelector('ul')
    ul.innerHTML += `<li data-id=${beer.id} class="list-group-item">${beer.name}</li>`
}


function beerInfoListener() {
    const beerContainer = document.querySelector('ul')
    beerContainer.addEventListener('click', function(event){
        if(event.target.className === 'list-group-item'){
            const beerId = event.target.dataset.id

        
        fetch(`http://localhost:3000/beers/${beerId}`)
          .then(res => res.json())
          .then(beer => {
                const beerDiv = document.getElementById('beer-detail')
                beerDiv.innerHTML = `<h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea data-id=description>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">
                Save
                </button>`
                })


    }}
    )

}


function editListener() {
        const editBtn = document.querySelector('#beer-detail')
        editBtn.addEventListener('click', function(event){
            event.preventDefault()
            if(event.target.id === 'edit-beer'){
                const discrip = event.target.previousElementSibling.innerHTML
                const newDiscription = event.target.previousElementSibling.innerHTML
            console.log(newDiscription);
            }
    
            const objReq = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: newDescription})
            }
    
            fetch('http://localhost:3000/beers/:id', objReq)
              .then(res => res.json())
              .then(description => {
                discription = `${newDescription}`
              });
        })
    }


main()



//not sure how to scrape data from text area. lost track of time.