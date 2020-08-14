//  X   FIRST DELIVERABLE
//  X   When the page loads, I should see a list of all of the beer names retrieved from the API on the left hand side of the screen. The API endpoint we need to
//  X   retrieve all the beers is a conventional RESTful
//  X   route* **Route:** GET `http://localhost:3000/beers`
//  X   Styling for each Li: inclue class name "list-group-item"

function main() {
  fetchBeers();
  createClickListener();
}

function fetchBeers() {
  fetch("http://localhost:3000/beers")
    .then((resp) => resp.json())
    .then((beers) => {
      renderBeers(beers);
    });
}

function renderBeers(beers) {
  beers.forEach(function (beer) {
    const beerListUl = document.querySelector("ul");
    const beerLi = document.createElement("li");
    beerLi.className = "list-group-item";
    beerLi.dataset.id = beer.id;
    beerLi.innerText = beer.name;

    beerListUl.append(beerLi);
  });
}

function createClickListener() {
  const beerListUl = document.querySelector("ul");
  beerListUl.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      //console.log("I am a single Beer with my unique ID")

      const beerId = event.target.dataset.id;

      fetch(`http://localhost:3000/beers/${beerId}`)
        .then((resp) => resp.json())
        .then((beer) => {
          //console.log(beer)
          renderShowPanel(beer);
        });
    }
  });
}

function renderShowPanel(beer) {
  const showPanel = document.getElementById("beer-detail");
  const beerHtml = `    
                        <h1>Beer Name</h1>
                        <img src="${beer.image_url}">
                        <h3>Beer Tagline</h3>
                        <textarea name="description">${beer.description}</textarea>
                        <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
                        Save
                        </button>
                        `;
    showPanel.innerHTML = beerHtml


     showPanel.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.className === 'btn btn-info') {
           console.log(event.target.parentElement)
           const updatedBeerDesc = event.target.parentElement.children[3].value;
            const beerId = event.target.parentElement.children[0].dataset.id;
           
            updateBeerInfo(event, updatedBeerDesc)
            
        }

     })
}

updateBeerInfo = (event, description) => {
    fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
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
       .then(beer => {
          beer.innerHTML = description
          
       })
 }

//  X   SECOND DELIVERABLE
//  X   Create a Click Listener for the ul
//  X   Prevent devault behavior
//  X   conditional to check if you are clicking for the specific
//  X   beer by id connected to li
//  X   Fetch request for the single beer
//  X   make a renderShowPanel function to do the work
//  X   grab show panel
//  X   make singleBeerHtml
//  X   showPanel.innerHTML = that singleBeerHtml 

// THIRD DELIVERABLE
// Find the button
// Check if found and click is tied to unique beer
// addEventListener submit => event
// helper method to do the work
// create a new object with the from scraped data
// fetch Patch request
// finish fetch with rendering the updated beer

main();
