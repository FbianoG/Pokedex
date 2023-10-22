let allPokemon = []
let iconTypes = {
    "grass": '<i class="fa-solid fa-leaf"></i>',
    "fire": '<i class="fa-solid fa-fire"></i>',
    "water": '<i class="fa-solid fa-droplet"></i>',
    "bug": '<i class="fa-solid fa-bug"></i>',
    "poison": '<i class="fa-solid fa-skull-crossbones"></i>',
    "fighting": '<i class="fa-solid fa-hand-back-fist"></i>',
    "rock": '<i class="fa-solid fa-hill-rockslide"></i>',
    "dragon": '<i class="fa-solid fa-dragon"></i>',
    "electric": '<i class="fa-solid fa-bolt"></i>',
    "fairy": '<i class="fa-solid fa-wand-magic-sparkles"></i>',
    "ground": '<i class="fa-solid fa-mound"></i>',
    "normal": '<i class="fa-solid fa-filter"></i>',
    "psychic": '<i class="fa-solid fa-brain"></i>',
    "ghost": '<i class="fa-solid fa-ghost"></i>',
    "ice": '<i class="fa-solid fa-cubes"></i>',
    "dark": '<i class="fa-solid fa-circle-half-stroke"></i>',
    "flying": '<i class="fa-solid fa-dove"></i>',
}
let valueTarget = document.querySelectorAll('.input-count')[0]
let btnGerar = document.querySelectorAll('.btn-load')[0]
let filterName = document.querySelectorAll('.input-search')[0]
let alvoTemp = ''
let card = document.querySelectorAll('.card')[0]
let list = document.querySelectorAll('.list')[0]
let filterStatus = document.querySelectorAll('.input-status')[0]
let ordStatus = document.querySelectorAll('.input-tidy')[0]
let filterCategory = document.querySelectorAll('.input-category')[0]
let count = document.querySelectorAll('h3')[0]
let help = document.querySelectorAll('.help')[0]
let deepHelp = document.querySelectorAll('.deep-help')[0]



// Eventos

filterName.addEventListener('keyup', searchPokemon)
filterStatus.addEventListener('change', ordenar)
ordStatus.addEventListener('change', ordenar)
filterCategory.addEventListener('change', filter)
btnGerar.addEventListener('click', getApi)
help.addEventListener('click', showHelp)


// Funções

function showHelp() { // Botão de help no final da página
    if (deepHelp.style.right == '50px') {
        deepHelp.style.right = "-350px"
        deepHelp.style.opacity = "0"
    } else {
        deepHelp.style.right = "50px"
        deepHelp.style.opacity = "1"
    }

}

function countPokemon() { // Muda a contagem de acordo com o total de pokemons gerados da API
    let cards = document.querySelectorAll('.card')
    count.textContent = `${cards.length} / 649`
}

async function getApi() { // faz requisição à api
    list.innerHTML = ''
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
        for (let i = numPokemon; i <= valueTarget.value; i++) {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            let data = await api.json()
            let pokemon = createPokemon(data) // criar um pokemon com os dados da api
            createCard(pokemon) // cria  html do pokemon
            allPokemon.push(pokemon) // inclui o pokemon no array
            localStorage.setItem("Cache Pokemon:", JSON.stringify(allPokemon)) // salva o array no cache
            countPokemon()
        }
        console.log("Lista de Pokemon foi gerada com sucesso!");
    } catch (error) {
        console.log("Um erro foi encontrado:", error);
    }
    list.addEventListener('click', showStatus)
    countPokemon()
}

function searchPokemon() { // function de pesquisar o pokemon por "nome" ou "id"
    let allFilter = allPokemon.filter(element => {
        if (!isNaN(filterName.value) && filterName.value != "") { // Verifica se o valor digitado é um "número"
            return element.id == filterName.value
        } else {
            return element.name.includes(filterName.value)
        }
    })
    list.innerHTML = ''
    allFilter.forEach(element => {
        createCard(element)
    });
    countPokemon()
}

function ordenar() { // Ordenar a lista por "status"
    let status = filterStatus.value
    let ord = ordStatus.value
    console.log(ord);
    let allChange = allPokemon.sort((a, b) => {
        if (ord == "des") {
            console.log("chegou aqui");
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

function filter() { // Filtra os Pokemons pelo tipo
    let type = filterCategory.value
    let filterPokemon1 = allPokemon.filter(element => {
        return element.type1 == type
    })
    let filterPokemon2 = allPokemon.filter(element => {
        return element.type2 == type
    })
    if (filterPokemon1.length > 0) {
        list.innerHTML = ""
        filterPokemon1.forEach(element => {
            createCard(element)
        });
    } else {
        list.innerHTML = ""
    }
    if (filterPokemon2.length > 0) {
        filterPokemon2.forEach(element => {
            createCard(element)
        });
    }

}

function createCard(e) { // cria o html do pokemon
    let newCard = document.createElement('div')
    newCard.classList = "card"
    newCard.innerHTML = modelCard(e)
    list.appendChild(newCard)
};

function showStatus(e) { // alterna entre as abas do status do pokemon
    let alvo = e.target
    let status = alvo.parentElement.parentElement.querySelectorAll('.status')[0]
    let fisico = alvo.parentElement.parentElement.querySelectorAll('.fisico')[0]
    let about = alvo.parentElement.parentElement.querySelectorAll(".about")[0]

    if (alvo.textContent == 'Status') {
        alvoTemp.style = ''
        status.style.display = "grid"
        fisico.style.display = "none"
        about.style.display = "none"
        alvo.style.color = "#01af5b"
        alvo.style.borderBottom = "2px solid"
        alvoTemp = alvo
    } else if (alvo.textContent == 'Físico') {
        alvoTemp.style = ''
        status.style.display = "none"
        about.style.display = "none"
        fisico.style.display = "flex"
        alvo.style.color = "#01af5b"
        alvo.style.borderBottom = "2px solid"
        alvoTemp = alvo
    } else if (alvo.textContent == "About") {
        alvoTemp.style = ''
        status.style.display = "none"
        fisico.style.display = "none"
        about.style.display = "flex"
        alvo.style.color = "#01af5b"
        alvo.style.borderBottom = "2px solid"
        alvoTemp = alvo
    }
}

function createPokemon(e) { // cria um pokemon
    let typeT = ''
    if (e.types[1]) {
        typeT = e.types[1].type.name
    } else {
        typeT = ""
    }
    return {
        id: e.id,
        name: e.name,
        img: e.sprites.other.dream_world.front_default,
        type1: e.types[0].type.name,
        type2: typeT,
        exp: e.base_experience,
        hp: e.stats[0].base_stat,
        atk: e.stats[1].base_stat,
        def: e.stats[2].base_stat,
        spd: e.stats[5].base_stat,
        m: e.height,
        kg: e.weight

    }
}

function modelCard(e) { // cria o html do pokemon
    const id = e.id.toString().padStart(3, "0")
    const img = e.img;
    const name = e.name;
    let type1 = e.type1;
    let type2 = e.type2
    const exp = e.exp
    const expWidth = (e.exp / 635) * 100;
    const hp = e.hp
    const hpWidth = (e.hp / 255) * 100;
    const atk = (e.atk)
    const atkWidth = (e.atk / 165) * 100
    const def = (e.def)
    const defWidth = (e.def / 230) * 100
    const spd = (e.spd)
    const spdWidth = (e.spd / 160) * 100
    if (type1 in iconTypes) {
        type1 = iconTypes[type1]
    }
    if (type2 in iconTypes) {
        type2 = `<span>${iconTypes[type2]}</span>`
    }
    const html = `
    <p class="card-id">#${id}</p>
    <div class="card-image">
        <img src="${img}" alt="">
    </div>
    <p class="card-name">${name}</p>
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
                    <p>${exp}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${expWidth}%;"></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Hp</p>
                <b>
                    <p>${hp}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${hpWidth}% ;"></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Atk</p>
                <b>
                    <p>${atk}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${atkWidth}% ;" ></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Def</p>
                <b>
                    <p>${def}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${defWidth}%;"></div>
                </div>
            </div>
            <div class="card-data-status">
                <p>Spd</p>
                <b>
                    <p>${spd}</p>
                </b>
                <div class="status-bar">
                    <div class="status-bar-back" style="width:${spdWidth}%;"></div>
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
            <span>${type1}</span>
            <label>${e.type1}</label>
            ${type2}
            <label>${e.type2}</label>
        </div>
    </div>
    `
    return html
}




// Chamadas

getApi() // faz requisição à api