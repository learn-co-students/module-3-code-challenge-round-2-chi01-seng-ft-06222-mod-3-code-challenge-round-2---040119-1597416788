function main(){
    fetchBeers()
    beerClickListner()
}

function fetchBeers(){
    //Xfind where to populate list
    //Xmake fetch request
    //Xiterate through array to get single item
    //Xmake lis
    //Xappend to DOM
    const beerList = document.getElementById("list-group")
    fetch("http://localhost:3000/beers")
        .then(resp=> resp.json())
        .then(beerData=> {
            beerData.forEach(beer=> {
                const li = document.createElement("li")
                li.innerText = beer.name 
                li.className = "list-group-item"
                li.id = beer.id
                beerList.append(li)
            })
            //console.log(beerData)
        })
}

function beerClickListner(){
    //Xfind the thing list holding the beers
    //Xadd event listner 
    //Xisolate the id
    //Xmake a fetch request w/ id
    const beerList = document.getElementById("list-group")
    beerList.addEventListener('click', function(event){
        const selectedBeerId = event.target.id
        //console.log(selectedBeerId)
        fetch(`http://localhost:3000/beers/${selectedBeerId}`)
        .then(resp=> resp.json())
        .then(beer=> {
            //Xrender "show" page
                //Xfind where show page is
                //Xmake a render function
                //Xmake html
                //X.innerHTML to page 
                showPageBeer(beer)
                editBeerDescription(beer)
                //console.log(beer)
            })
        })
    }
    
    
    
    function showPageBeer(beer){
    const beerShowPage = document.getElementById("beer-detail")  
    const beerPage = `
        <h1>${beer.name}</h1>
            <img src="${beer.image_url}"/>
                <h3>${beer.tagline}</h3>
                    <textarea id="description-area">${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">Save</button>
            <h3>First Brewed</h3>
            <p>${beer.first_brewed}</p>
            <h3>Brewer Tips</h3>
            <p>${beer.brewers_tips}</p>
            <h3>Food Pairings</h3>
                <ul id="food-list">
                </ul>
    ` 
    beerShowPage.innerHTML = beerPage
    
    renderFood(beer)
}

function renderFood(beer){
    const ul = document.getElementById("food-list")
    beer.food_pairing.forEach(food=> {
        ul.innerHTML += `<li>${food}</li>`
    })    
}




function editBeerDescription(beer){
    //XI want to find where the save button lives // show page
    //Xadd event listener
    //XI want to find description area 
    //Xwant to save to const 
    //Xwant to find beer id from button
    //Xneed to make patch request 
    //Xneed to make reqObj
    //Xwant to update DOM
    const beerShowPage = document.getElementById("beer-detail")
    beerShowPage.addEventListener('click', function(event){
        if (event.target.tagName === "BUTTON"){
            //console.log(event.target)
            const descriptArea = document.getElementById("description-area")
            const newBeerDescription = {
                description: descriptArea.value
            }
            //console.log(newBeerDescription)
            const selectedBeerId = event.target.dataset.id 
            //console.log(selectedBeerId)
            const reqObj = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newBeerDescription)
            }

            fetch(`http://localhost:3000/beers/${selectedBeerId}`, reqObj)
                .then(resp=> resp.json())
                .then(beerDescription => {
                    const descriptArea = document.getElementById("description-area")
                    descriptArea.innerText = beerDescription
                    //console.log(beerDescription)
                })
        }
    })

}


main()