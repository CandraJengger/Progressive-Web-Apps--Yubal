import '../components/Preloader.js'

const base_url = 'https://api.football-data.org/'
const token = 'cc92f201a96b49f79ea79d54275ba9d7'
const loading = document.getElementById('loading')
const clubDetail = document.getElementById('club-detail')
const mainContent = document.getElementsByTagName('main-content')[0]

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": token
        }
    })
}

const showLoading = () => {
    loading.style.display = 'block'
    loading.innerHTML = '<pre-load></pre-load>'
    if (mainContent !== undefined && mainContent !== null) {
        mainContent.style.display = 'none'
    }
    if (clubDetail !== undefined && clubDetail !== null) {
        clubDetail.style.display = 'none'
    }
}

const hideLoading = () => {
    loading.style.display = 'none'
    loading.innerHTML = ''
    if (mainContent !== undefined && mainContent !== null) {
        mainContent.style.display = 'block'
    }
    if (clubDetail !== undefined && clubDetail !== null) {
        clubDetail.style.display = 'block'
    }
}

const getStandings = idLeague => {

    return new Promise((resolve, reject) => {

        if ('caches' in window) {
            caches.match(`${ base_url }v2/competitions/${ idLeague }/standings?standingType=TOTAL`).then(response => {
                if (response) {
                    response.json().then(data => resolve(data))
                }
            })
        }

        fetchAPI(`${ base_url }v2/competitions/${ idLeague }/standings?standingType=TOTAL`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error(response.statusText))
                } else {
                    return response.json()
                }
            })
            .then(responseJson => {
                resolve(responseJson)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

const getScorers = idLeague => {
    showLoading()
    return new Promise((resolve, reject) => {

        if ('caches' in window) {
            caches.match(`${ base_url }v2/competitions/${ idLeague }/scorers`).then(response => {
                if (response) {
                    response.json().then(data => resolve(data))
                }
            })
        }

        fetchAPI(`${ base_url }v2/competitions/${ idLeague }/scorers`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error(response.statusText))
                } else {
                    return response.json()
                }
            })
            .then(responseJson => resolve(responseJson))
            .finally(() => {
                hideLoading()
            })
            .catch(err => reject(err))
    }) 
}

const getClubById = idClub => {

    showLoading()
    return new Promise((resolve, reject) => {

        // Request
        if ('caches' in window) {
            caches.match(`${ base_url }v2/teams/${ idClub }`).then(response => {
                if (response) {
                    response.json().then(data => resolve(data))
                }
            })
        }

        fetchAPI(`${ base_url }v2/teams/${ idClub }`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error(response.statusText))
                } else {
                    return response.json()
                }
            })
            .then(responseJson => resolve(responseJson))
            .finally(() => {
                hideLoading()
            })
            .catch(err => reject(err))
    })
}


const getMatchesClubById = idClub => {

    return new Promise((resolve, reject) => {

        if ('caches' in window) {
            caches.match(`${ base_url }v2/teams/${ idClub }/matches?status=FINISHED`).then(response => {
                if (response) {
                    response.json()
                        .then(data => resolve(data))
                }
            })
        }

        fetchAPI(`${ base_url }v2/teams/${ idClub }/matches?status=FINISHED`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error(response.statusText))
                } else {
                    return response.json()
                }
            })
            .then(responseJson => resolve(responseJson))
            .catch(err => reject(err))
    })
}


export { getStandings, getScorers, getClubById, getMatchesClubById}