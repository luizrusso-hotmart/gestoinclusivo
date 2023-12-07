import  { subtitlesArray }  from './formatter.js'
import { getDescription } from './audioDescription.js'

const main = async () => {
    const audioMp3 = await getDescription()
    const mpPlayer = document.querySelector('#sound')
    mpPlayer.src = window.URL.createObjectURL(audioMp3)
    mpPlayer.play()
    document.querySelector('main').click()
    setTimeout(() => {
        startLibras()
    }, 400)

    setTimeout(() => {
        skipAnimation()
        // addSubtitle()
        increaseSpeed()
        translateText()
    }, 8000)   
    
    setTimeout(() => {
        const video = document.querySelector('video')
        video.play()
    }, 2000)
   

    subtitlesArray.forEach(el => {
        const mainElement = document.querySelector('main')
        const paragraph = document.createElement('p')
        paragraph.classList.add('paragraph')
        paragraph.style.color = 'white'
        paragraph.innerHTML = el.subtitle
        mainElement.appendChild(paragraph)
    })
    
}

const startLibras = () => {
    const vLibras = document.querySelector('.access-button')
    vLibras.click()
}

const skipAnimation = () => {
    const skipAnimation = document.querySelector('.vpw-skip-welcome-message')
    skipAnimation.click()
}

const addSubtitle = () => {
    const subtitle = document.querySelector('button[title="Ativar/desativar legenda"]')
    subtitle.click()
}

const translateText = async () => {
    const texts = document.querySelectorAll('.paragraph')

    for(const text of texts) {
        text.click()
        await asyncLoop()
    }
} 

const increaseSpeed = () => {
    const speedButton = document.querySelector('button[title="Alterar velocidade"')
    // speedButton.click()
    speedButton.click()
}

main()

const asyncLoop = () => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            let progressBar = document.querySelector('.noUi-origin').style.left
            if (progressBar === '100%') {
                resolve()
            }
        }, 2000)
    })
}