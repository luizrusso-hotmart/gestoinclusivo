import {v4 as uuidv4} from 'uuid';

const captionsToken = '9dd5805948e1484884269c5213a9c23e'
const captionUrl = 'https://hackatoonvision.cognitiveservices.azure.com/computervision/imageanalysis:analyze'

const translationUrl = 'https://api.cognitive.microsofttranslator.com/translate'
const translationToken = '5576ffc4d1214892b6b2ec605798cb46'

const audioUrl = 'https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1'
const audioToken = '48fdb3c6457d4ddaa7c8d83acee9b425'

const getDescription = async () => {

    const caption = await getCaption()
    console.log(caption.captionResult.text)

    const captionTranslated = await getTranslation(caption.captionResult.text)
    console.log(captionTranslated[0])
    return getAudioDescription(captionTranslated[0].translations[0].text)
}  

const getCaption = async () => {
    const headers = {
        'Ocp-Apim-Subscription-Key': captionsToken,
        'Content-Type': 'application/json; charset=utf-8'
    }
    const params = new URLSearchParams({
        'api-version': '2023-02-01-preview',
        language: 'en',
        'gender-neutral-caption': false,
        features: 'caption',
    })

    const body = {url: 'https://lh3.googleusercontent.com/a-/ALV-UjXDzy-WRRaiWEO2OVEeujUpI-ARANGYfeISK6VZjwu5I2A=s88-w88-h88-c-k-no'}
    return await fetch(captionUrl+'?'+params, {body: JSON.stringify(body), method: 'POST', headers: headers} ).then(res => res.json())
}

const getTranslation = async (text) => {
    const headers = {
        'Ocp-Apim-Subscription-Key': translationToken,
        'X-ClientTraceId': uuidv4(),
        'Ocp-Apim-Subscription-Region': 'eastus2',
        'Content-Type': 'application/json; charset=utf-8'
    }
    const params = new URLSearchParams({
        'api-version': '3.0',
        'from': 'en',
        'to': 'pt-BR'
    })

    const body = [{
        text
    }]
    return await fetch(translationUrl+'?'+params, {body: JSON.stringify(body), headers, method: 'POST'} ).then(res => res.json())
}

const getAudioDescription = async (translatedDescription) => {
    console.log('translatedDescription')
    const headers = {
        'Ocp-Apim-Subscription-Key': audioToken,
        'Content-Type': 'text/plain',
        'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3'
    }


    const body =  `<speak version='1.0' xml:lang='pt-BR'><voice xml:lang='pt-BR' xml:gender='Male'
    name='pt-BR-AntonioNeural'>
        ${translatedDescription}
    </voice></speak>`
    return await fetch(audioUrl, {body: body, headers, method: 'POST'} ).then(res => res.blob())
}

export { getDescription }