importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')


// Cek Workbox
if (workbox) console.log('Workbox berhasil dimuat')
else console.log('Workbox gagal dimuat')

// Precaching
workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/club.html', revision: '2' },
    { url: '/nav.html', revision: '1' },
    { url: '/app.js', revision: '1' },
    { url: '/registrasi.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/src/components/CardImage.js', revision: '1' },
    { url: '/src/components/MainContent.js', revision: '1' },
    { url: '/src/components/NavBar.js', revision: '1' },
    { url: '/src/components/Preloader.js', revision: '1' },
    { url: '/src/components/StandingsDetail.js', revision: '1' },
    { url: '/src/components/TableMatches.js', revision: '1' },
    { url: '/src/components/TablePlayerScorers.js', revision: '1' },
    { url: '/src/components/TableSquad.js', revision: '1' },
    { url: '/src/components/TableStandings.js', revision: '1' },
    { url: '/src/components/WrapTab.js', revision: '1' },
    { url: '/src/components/WrapTable.js', revision: '1' },
    { url: '/src/data/api.js', revision: '1' },
    { url: '/src/data/db.js', revision: '1' },
    { url: '/src/data/idb.js', revision: '1' },
    { url: '/src/stylesheets/materialize.min.css', revision: '1' },
    { url: '/src/stylesheets/style.css', revision: '1' },
    { url: '/src/view/club.js', revision: '1' },
    { url: '/src/view/main.js', revision: '1' },
    { url: '/src/view/materialize.min.js', revision: '1' }

], {

    ignoreUrlParametersMatching: [/.*/]

})



// Caching
workbox.routing.registerRoute(
    new RegExp('/images/'),
    workbox.strategies.cacheFirst({
        cacheName: 'images'
    })
)

workbox.routing.registerRoute(
    new RegExp('/fonts/'),
    workbox.strategies.cacheFirst({
        cacheName: 'fonts-webfont'
    })
)

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
)

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-football'
    })
)



// Push
self.addEventListener('push', function(event) {
    let body 
    if (event.data) {
        body = event.data.text()
    } else {
        body = 'Push message no payload'
    }

    const options = {
        body: body,
        badge: './src/images/icons/icon-144x144.png',
        icon: './src/images/icons/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Yubal', options)
    )
})