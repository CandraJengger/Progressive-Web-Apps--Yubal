
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
}


const registerServiceWorker = () => {
    
    return navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Pendaftaran ServiceWorker berhasil'))
        .catch(() => console.log('Pendafataran ServiceWorker gagal'))
}

const requestPermission = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === 'denied') {
                console.log('Fitur notifikasi tidak diijinkan')
                return
            } else if (result === 'undefined') {
                console.error('Pengguna menutup kotak dialog permintaan')
                return
            }
            
            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true, 
                            applicationServerKey: urlBase64ToUint8Array('BIX--w4j365a_mvKq4dSBLJ9LC8mOu7eK4EtPrJSdr1R4f4-x9nQmcVGOOqmKW5kYZUDdYbuKrbileyGH7NFuSw')
                        
                        })
                        .then(subscribe => {
                            console.log(`Berhasil melakukan subscribe dengan endpoint: ${ subscribe.endpoint }`)
                            console.log(`Berhasil melakukan subscribe dengan p256dh key: ${ 
                                btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))
                             }`)
                            console.log(`Berhasil melakukan subscribe dengan auth key: ${
                                btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))
                            }`)
                        })
                        .catch(err => console.log(`Tidak dapat melakukan subscribe: ${ err }`))
                    })
                }
            })
        })
    }
}

// Registrasi
if (!('serviceWorker' in navigator)) {
    console.log('Service worker tidak didukung browser ini')
} else {
    registerServiceWorker()
    requestPermission()
}

