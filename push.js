
const webPush = require('web-push')

const vapidKeys = {
    "publicKey": "BIX--w4j365a_mvKq4dSBLJ9LC8mOu7eK4EtPrJSdr1R4f4-x9nQmcVGOOqmKW5kYZUDdYbuKrbileyGH7NFuSw",
    "privateKey": "kzblCv5vpkFJIe07hRc1zMzrnHKBKyPHdeQbYKsWFu0"
}
  
webPush.setVapidDetails(
    'mailto:cakjengger@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)


const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fWmrMNThe6A:APA91bFIlhjlSoszZt6C_Y2sdS7p-UK11tY950mt_cpmHJUGSvkipzpFGXnTJJaCVxytvnetF7FMK4pGPAmW_LPfyG2snpp0LKIuvB2Z6LO8JV5O2tbUn05N39qjoS_5I3BfzcGyKrI0",
    "keys": {
        "p256dh": "BIjSFXLAEdgKYLLUuT0KU6Si7ZQV3/sSC/YJ3y5Q+Poc+PbX0+sUtybjOYbkSu6F8L+8BKQbilbY5Fn8EAXJTsA=",
        "auth": "QUk/M6I4aEW1IVyV/Lr0yA=="
    }
}

const payload = 'Tonight! Champions league final, Chelsea vs Arsenal at the San Siro Stadium, Italy'
const options = {
    gcmAPIKey: '541964131155',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)