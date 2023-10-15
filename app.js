let allPokemon = []




let filterStatus = document.querySelectorAll('select')[0]

filterStatus.addEventListener('change', ()=>{
    let status = filterStatus.value
    let allFilter = allPokemon.sort((a,b)=>{
        return b[status] - a[status]
    })
    list.innerHTML = ''
    console.log(allFilter);
    allFilter.forEach(element => {
        creatCard(element)
    });
    
})





async function getApi() {
    let cachePokemon = localStorage.getItem("Cache Pokemon:")
    numPokemon = 1
    if (cachePokemon) {
        allPokemon = JSON.parse(cachePokemon)
        allPokemon.forEach(element => {
            creatCard(element)
        });
        numPokemon = allPokemon.length + 1
    }
    try {
        for (let i = numPokemon; i <= 250; i++) {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            let data = await api.json()

            let pokemon = {
                id: data.id,
                name: data.name,
                img: data.sprites.other.dream_world.front_default,
                type1: data.types[0].type.name,
                exp: data.base_experience,
                hp: data.stats[0].base_stat,
                atk: data.stats[1].base_stat,
                def: data.stats[2].base_stat,
                spd: data.stats[5].base_stat,
                m: data.height,
                kg: data.weight
            }
            creatCard(pokemon)
            allPokemon.push(pokemon)
            localStorage.setItem("Cache Pokemon:", JSON.stringify(allPokemon))
        }
    } catch (error) {
        console.log("Um erro foi encontrado:", error);
    }


}


let card = document.querySelectorAll('.card')[0].innerHTML
let list = document.querySelectorAll('.list')[0]



function creatCard(e) {
    // array.forEach(e => {
    let newCard = document.createElement('div')
    newCard.classList = "card"
    newCard.innerHTML = modelCard(e)
    list.appendChild(newCard)
    // })

    list.addEventListener('click', showStatus)


};

// let faa = allPokemon.sort((a, b) => {
//     return b.hp - a.hp
// })

// console.log(faa);

let alvoTemp = ''

function showStatus(e) {
    let alvo = e.target

    if (alvo.textContent == 'Status') {
        alvoTemp.style = ''
        let status = alvo.parentElement.parentElement.querySelectorAll('.status')[0]
        let fisico = alvo.parentElement.parentElement.querySelectorAll('.fisico')[0]
        status.style.display = "grid"
        fisico.style.display = "none"
        alvo.style.color = "#01af5b"
        alvo.style.borderBottom = "2px solid"
        alvoTemp = alvo
    } else if (alvo.textContent == 'Físico') {
        alvoTemp.style = ''
        let status = alvo.parentElement.parentElement.querySelectorAll('.status')[0]
        let fisico = alvo.parentElement.parentElement.querySelectorAll('.fisico')[0]
        status.style.display = "none"
        fisico.style.display = "flex"
        alvo.style.color = "#01af5b"
        alvo.style.borderBottom = "2px solid"
        alvoTemp = alvo
    } else {
        return
    }
}


// hp = 255
// atk = 134

function modelCard(e) {
    return `
    <p class="card-id">#${e.id.toString().padStart(3, "0")}</p>
    <div class="card-image">
        <span class="card-image-color1" style="box-shadow: ${changeBack(e)} ;"></span>
        <span class="card-image-color2" style="box-shadow: ${changeBack(e)} ;" ></span>
        <img src="${e.img}" alt="">
    </div>
    <p class="card-name">${e.name}</p>
    <div class="card-types">
        <span>${e.type1}</span>
        <span>${e.type1}</span>
    </div>
    <div class="card-data">
        <div class="card-data-menu">
            <p>About</p>
            <p>Físico</p>
            <p>Status</p>
        </div>
        <div class="status">
            <div class="card-data-status">
                <p>Exp</p>
                <b>
                    <p>${e.exp}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${(e.exp / 635) * 100}%;"></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Hp</p>
                <b>
                    <p>${e.hp}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${(e.hp / 255) * 100}% ;"></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Atk</p>
                <b>
                    <p>${e.atk}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${(e.atk / 134) * 100}% ;" ></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Def</p>
                <b>
                    <p>${e.def}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${(e.def / 230) * 100}%;"></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Spd</p>
                <b>
                    <p>${e.spd}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${(e.spd / 150) * 100}%;"></div>
                </div>
            </div>
        </div>
        <div class="fisico">
            <div class="fisico-data">
                <div class="data-height">
                    <b>
                        <p>${(e.m / 10).toFixed(1)}m (${((e.m / 10) * 3.28).toFixed(2)}ft)</p> 
                    </b>
                    <i class="fa-solid fa-ruler-vertical"></i>
                    <p>Altura</p>
                </div>
                <div class="weigth">
                    <b>
                        <p>${(e.kg / 10).toFixed(1)}kg (${((e.kg / 10) / 2.2).toFixed(2)}lbs)</p>
                    </b>
                    <i class="fa-solid fa-weight-hanging"></i>
                    <p>Peso</p>
                </div>
            </div>
        </div>
    </div>
    `

}

function changeBack(e) {
    // let back1 = e.parentElement.parentElement
    // console.log(e);
    // if (e.type1 == "fire"){
    //     return "20px -20px 100px 75px red"
    // }
}


getApi()