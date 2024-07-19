const inputText = document.getElementById('input-text')
const encriptar = document.getElementById('encriptar')
const desencriptar = document.getElementById('desencriptar')
const outputText = document.querySelector('.output-text')
const outputSection = document.querySelector('.output-section')


const keys = {
    e: 'enter', 
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
}

encriptar.addEventListener('click', () => {
    encriptarTexto(agarrarTexto())
})

desencriptar.addEventListener('click', () => {
    desencriptarTexto(agarrarTexto())
})

function encriptarTexto(texto) {
    let textoEcriptado = ''

    for(let i = 0; i < texto.length; i++) {
        if(keys[texto[i]]) {
            textoEcriptado += keys[texto[i]]
        } else {
            textoEcriptado += texto[i]
        }
    }

    actualizarDOM(textoEcriptado)
}

function desencriptarTexto(texto) {
    let textoDesencriptado = ''
    let i = 0

    while(texto.length > i) {
        let encontrado = false
        
        for(let key in keys) {
            if(texto.startsWith(keys[key], i)) {
                
                textoDesencriptado += key
                i += keys[key].length
                
                encontrado = true
                break
            }
        }

        if(!encontrado) {
            textoDesencriptado += texto[i]
            
            i++
        }
    }
    actualizarDOM(textoDesencriptado)

}

function agarrarTexto() {
    if(!inputText.value) {
        mustraAlerta('alert', 'Engresa texto')
    } else {
        return inputText.value.toLocaleLowerCase()
    }
}

function actualizarDOM(contenido) {

    while(outputSection.children.length > 0) {
        outputSection.removeChild(outputSection.firstChild)
    }

    const elementoP = document.createElement('p')
        elementoP.classList.add('texto-encriptado')
        outputSection.appendChild(elementoP)
        elementoP.innerHTML = contenido

    const btnCopiar = document.createElement('button') 
        btnCopiar.classList.add('btn-copiar')
        btnCopiar.textContent = 'Copiar'
        outputSection.appendChild(btnCopiar)
    
    document.querySelector('.btn-copiar').addEventListener('click', copiarTexto)
}


function copiarTexto() {
    
    const textoCopiado = document.querySelector('.texto-encriptado')

    const range = document.createRange()

    range.selectNodeContents(textoCopiado)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)

    document.execCommand('copy')

    selection.removeAllRanges()

    textoCopiado.style.backgroundColor = '#D9D9D9'
    textoCopiado.style.Color = '#020202'
   mustraAlerta('popup', 'el texto se ha copiado')
}

function mustraAlerta(clase, texto) {
    let alert = document.querySelector(`.${clase}`) 
    alert.classList.remove('hide-alert')
    alert.textContent = texto

    setTimeout(() => {
        alert.classList.add('hide-alert')
        alert.textContent = ''
        
    }, 2000);
}


