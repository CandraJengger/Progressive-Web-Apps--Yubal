
const webPush = require('web-push')

const vapidKeys = {
    "publicKey": "<Your key>",
    "privateKey": "<Your key>"
}
  
webPush.setVapidDetails(
    '<Your email>',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)


const pushSubscription = {
    "endpoint": "<Your End Point>",
    "keys": {
        "p256dh": "<Your key>"",
        "auth": "<Your key>"
    }
}

const payload = 'Tonight! Champions league final, Chelsea vs Arsenal at the San Siro Stadium, Italy'
const options = {
    gcmAPIKey: '<Your gcmAPIKey>',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)
