let allPokemon = []

let filterName = document.querySelectorAll('input')[0]
let alvoTemp = ''
let card = document.querySelectorAll('.card')[0]
let list = document.querySelectorAll('.list')[0]
let ordStatus = document.querySelectorAll('.ord')[0]
let filterStatus = document.querySelectorAll('select')[0]

console.log(ordStatus);

// Eventos

filterName.addEventListener('keyup', () => {
    let allFilter = allPokemon.filter(element => {
        if (!isNaN(filterName.value) && filterName.value != "") {
            return element.id == filterName.value

        } else {
            return element.name.includes(filterName.value)
        }
    })
    list.innerHTML = ''
    allFilter.forEach(element => {
        createCard(element)
    });
})

filterStatus.addEventListener('change', ordenar)
ordStatus.addEventListener('change', ordenar)


// Funções

function ordenar() {
    let status = filterStatus.value
    let ord = ordStatus.value
    let allChange = allPokemon.sort((a, b) => {
        if (ord == "des") {
            if (status == "name") {
                return b[status].localeCompare(a[status])
            } else {
                return b[status] - a[status]
            }
        } else {
            if (status == "name") {
                return a[status].localeCompare(b[status])
            } else {
                return a[status] - b[status]
            }
        }

    })
    list.innerHTML = ''
    allChange.forEach(element => {
        createCard(element)
    });
}















async function getApi() {
    let cachePokemon = localStorage.getItem("Cache Pokemon:")
    numPokemon = 1
    if (cachePokemon) {
        allPokemon = JSON.parse(cachePokemon)
        allPokemon.forEach(element => {
            createCard(element)
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
            createCard(pokemon)
            allPokemon.push(pokemon)
            localStorage.setItem("Cache Pokemon:", JSON.stringify(allPokemon))
        }

        console.log(allPokemon);
    } catch (error) {
        console.log("Um erro foi encontrado:", error);
    }
    list.addEventListener('click', showStatus)
}

function createCard(e) {
    let newCard = document.createElement('div')
    newCard.classList = "card"
    newCard.innerHTML = modelCard(e)
    list.appendChild(newCard)

};

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


let iconTypes = {
    "grass": '<i class="fa-solid fa-leaf"></i>',
    "fire": '<i class="fa-solid fa-fire"></i>',
    "water": '<i class="fa-solid fa-droplet"></i>',
    "bug": '<i class="fa-solid fa-bug"></i>',
    "poison": '<i class="fa-solid fa-skull-crossbones"></i>',
    "fighting": '<i class="fa-solid fa-hand-back-fist"></i>',
    "rock": '<i class="fa-solid fa-hill-rockslide"></i>',
    "dragon":'<i class="fa-solid fa-dragon"></i>',
    "electric": '<i class="fa-solid fa-bolt"></i>',
    "fairy": '<i class="fa-solid fa-wand-magic-sparkles"></i>',
    "ground": '<i class="fa-solid fa-mound"></i>',
    "normal":'<i class="fa-solid fa-filter"></i>',
    "psychic": '<i class="fa-solid fa-brain"></i>',
    "ghost": '<i class="fa-solid fa-ghost"></i>',
    "ice": '<i class="fa-solid fa-cubes"></i>',
    "dark": '<i class="fa-solid fa-circle-half-stroke"></i>',
}

function modelCard(e) {

type = e.type1

if (type in iconTypes) {
    type = iconTypes[type]
}
console.log(type);

    return `
    <p class="card-id">#${e.id.toString().padStart(3, "0")}</p>
    <div class="card-image">
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
        <div class="about">
            <span>${type}</span>
            <span></span>
        </div>
    </div>
    `
}




// Chamadas
getApi()