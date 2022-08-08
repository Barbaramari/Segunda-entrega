class Veterinario {
    constructor(nombre, descripcion) {
        this.nombre = nombre
        this.descripcion = descripcion
    }
}

let veterinarios = []

if (localStorage.getItem('veterinario')) {
    veterinarios = JSON.parse(localStorage.getItem('veterinario'))
} else {
    localStorage.setItem('veterinarios', JSON.stringify(veterinarios))
}

const formVeterinarios = document.getElementById("formVeterinarios")
const divVeterinarios = document.getElementById("divVeterinarios")
const botonVeterinarios = document.getElementById("botonVeterinarios")

formVeterinarios.addEventListener('submit', (e) => {
    e.preventDefault(e.target)
    let datForm = new FormData(e.target)

    console.log(datForm.get('nombre'), datForm.get('descripcion'))

    const veterinario = new Veterinario(datForm.get('nombre'), datForm.get('descripcion'))

    veterinarios.push(veterinario)

    console.log(veterinarios)
    localStorage.setItem('veterinarios', JSON.stringify(veterinarios))
    formVeterinarios.reset()
})

botonVeterinarios.addEventListener('click', () => {
    let arrayStorage = JSON.parse(localStorage.getItem('veterinarios'))
    divVeterinarios.innerHTML = ""
    arrayStorage.forEach((veterinario, indice) => {
        divVeterinarios.innerHTML += `
        <div class="card text-white bg-primary mb-3" id="veterinario${indice}" style="max-width: 20rem; margin:4px">
        <div class="card-header"><h2>${veterinario.nombre}</h2></div>
        <div class="card-body">
            <p class="card-title">${veterinario.descripcion}</p>
            <button class="btn btn-danger">Eliminar veterinario</button>
        </div>
    </div>
    `
    });

    arrayStorage.forEach((veterinario, indice) => {
        let botonCard = document.getElementById(`veterinario${indice}`).lastElementChild.lastElementChild
        botonCard.addEventListener('click', () => {
            document.getElementById(`veterinario${indice}`).remove()
            veterinarios.splice(indice, 1)
            localStorage.setItem('veterinarios', JSON.stringify(veterinarios))
            console.log(`${veterinario.nombre} Eliminado`)
        })
    })
})