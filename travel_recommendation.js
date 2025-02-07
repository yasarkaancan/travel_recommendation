let searchBtn = document.getElementById("searchBtn")
let clearBtn = document.getElementById("clearBtn")
let placesList = document.getElementById("placesList")

function searchPlaces(){
    let searchInput = document.getElementById("searchInput").value.toLowerCase().trim()
    let places = []
    
    if (searchInput == "beach"){searchInput = "beaches"}
    else if (searchInput == "country"){searchInput = "countries"}
    else if (searchInput == "temple"){searchInput = "temples"}
    
    fetch("./travel_recommendation_api.json")

    .then(response => response.json())
    .then(data => {
        if (searchInput == "countries"){
            data[searchInput].forEach((country) => {
                country.cities.forEach((place) => {
                    places.push(place)
                })
            })
        }else{
            data[searchInput].forEach((place) => {
                places.push(place)
            })
        }

        placesGenerate(places)

    })
}

function placesGenerate(places){
    
    places.forEach((place) => {
        let newHtml = `<h3>${place.name}</h3> <img src="${place.imageUrl}"> <p>${place.description}</p>`

        let newLi = document.createElement("li")
        newLi.className = "place"
        newLi.innerHTML = newHtml
        placesList.appendChild(newLi)
    })
}


function searchClear(){
    placesList.innerHTML = ""
    places = []
}

searchBtn.addEventListener("click", searchPlaces)
clearBtn.addEventListener("click", searchClear)