import '../components/Preloader.js' 
import '../../registrasi.js'
import '../data/idb.js'
import { getClubFavorite, deleteClubFavorite } from '../data/db.js'
import { getStandings, getScorers } from '../data/api.js'
import club from './club.js'

const main = () => {
    const sidenav = document.querySelector('.sidenav')
    const content = document.querySelector('#body-content')
    let page = window.location.hash.substr(1)

    const getIdLeague = area => {
        switch (area) {
            case 'Germany':
                return 2002
                break
            case 'England':
                return 2021
                break
            case 'Spain':
                return 2014
                break
            case 'Italy':
                return 2019
                break
            case 'France':
                return 2015
                break
            default:
                break
        }
    }

    const getFavorite = async () => {
        // Favorite
        const favorite = document.getElementById('favorite-section')
        let clubs = ''
        const resultFavorite = await getClubFavorite()
                .then(data => {

                    data.forEach(value => {

                        let url = value.crestUrl
                        url = url.replace(/^http:\/\//i, 'https://')
                        let idLeague = getIdLeague(value.area.name)
                        clubs += `
                            <div class="col s12 m6 l4 container-fluid">
                                <div class="row">
                                    <div class="col s12 center-align">
                                        <img src="${ url }" alt="${ value.name }" class=" img-tab">
                                    </div>
                                    <div class="col s12 transparent favorite">
                                        <h4 class="white-text favorite-title">${ value.name }</h4>
                                        <table class="favorite-table">
                                            <tr>
                                                <td><i class="material-icons">home</i></td>
                                                <td>${ value.venue }</td>
                                            </tr>
                                            <tr>
                                                <td><i class="material-icons">public</i></td>
                                                <td><a href="${ value.website }">${ value.website }</a></td>
                                            </tr>
                                            <tr>
                                                <td><i class="material-icons">palette</i></td>
                                                <td>${ value.clubColors }</td>
                                            </tr>
                                            <tr>
                                                <td><i class="material-icons">golf_course</i></td>
                                                <td>${ value.address }</td>
                                            </tr>
                                        </table>
                                        <a 
                                            href="./club.html?idLeague=${ idLeague }&id=${ value.id }&favorite=true" 
                                            class="btn waves-effect waves-light teal my-1"
                                        >
                                            Show Detail
                                        </a>
                                        <a 
                                            class="btn red waves-effect waves-light remove my-1"
                                            data-idClub=${ value.id }
                                        >
                                            Remove
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `
                    })

                    favorite.innerHTML = clubs

                    const urlParams = new URLSearchParams(window.location.search)
                    const idClub = urlParams.get('id')

                    const btnRemove = document.querySelectorAll('.remove')
                    btnRemove.forEach(btn => {
                        btn.addEventListener('click', e => {
                            deleteClubFavorite(parseInt(e.target.dataset.idclub))
                            window.location.reload()
                        })
                    })
                    // btnRemove.addEventListener('click', function() {
                    //     
                    // })

                    if (data.length === 0) {
                        throw new Error()
                    }
                })
                .catch(() => favorite.innerHTML = '<h2 class="center-align grey-text">You have not selected your favorite club</h2>')
        
    }

    const loadedPage = page => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = async function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    content.innerHTML = xhr.responseText

                    // Request API League
                    const league = document.querySelector('.league')
                    document.querySelectorAll('card-image a').forEach(elm => {
                        elm.addEventListener('click', async function() {

                            // Get data to table standings
                            const resultStandings = await getStandings(this.dataset.idleague)
                                .then(data => { 
                                    league.innerHTML = `
                                        <div class="row">
                                            <div class="col s12 row-wrap m12 l7 h-70">
                                                <wrap-table title="Standings" id="standings"></wrap-table>
                                            </div>
                                            <div class="col  s12 m12 l4 offset-l1 row-wrap h-70">
                                                <wrap-table title="Top Score" id="scorers"></wrap-table>
                                            </div>
                                        </div>

                                    `
                                    const tableStandings = document.querySelector('table-standings')

                                    // Mengirimkan data
                                    tableStandings.setStandings = data

                                })
                                .catch(err => {
                                    league.innerHTML = `
                                        <div class="col s12 m6 l5 offset-m3 offset-l4">
                                            <h2 class="grey-text">Something went wrong</h2>
                                            <button class="btn yellow waves-effect waves-yellow waves-light reload">Try Again</button>
                                        </div>
                                    `

                                    const btnReload = document.querySelector('.reload')
                                    btnReload.addEventListener('click', () => {
                                        location.reload()
                                    })
                                })

                            
                            // Get data to table scorers
                            const tableScorers = document.querySelector('table-scorers')
                            const resultScorers = await getScorers(this.dataset.idleague)
                                .then(data => {
                                    tableScorers.setScorers = data.scorers
                                })
                        })
                    })


                    // League
                    const cardImage = document.querySelectorAll('.league .card-image')
                    document.querySelector('.sidenav-trigger').addEventListener('click', function() {
                        if (sidenav.style.transform = 'translateX(0%)') {
                            cardImage.forEach(elm => elm.style.zIndex = '-3')

                            document.querySelector('main').addEventListener('click', function() {
                                sidenav.style.transform = 'translateX(-105%)'
                                cardImage.forEach(elm => elm.style.zIndex = '1')
                            }) 
                        }
                    })

                    if (page === 'favorite') {
                        getFavorite()
                    }
                }
            } else if (this.status === 404) {
                content.innerHTML = '<h2 class="grey-text">Halaman tidak ditemukan</h2>'
            } else {
                content.innerHTML = '<pre-load></pre-load>'
            }
        }
        xhr.open('GET', './src/pages/' + page + '.html', true)
        xhr.send()
    }

    const loadNav = () => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200) return

                // Muat Daftar tautan menu
                document.querySelectorAll('.topnav, .sidenav').forEach(elm => elm.innerHTML = xhr.responseText)

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a').forEach(elm => {
                    elm.addEventListener('click', event => {
                        // Tutup sidenav
                        M.Sidenav.getInstance(sidenav).close()

                        // Muat Konten halaman yang dipanggil
                        page = event.target.getAttribute('href').substr(1)
                        loadedPage(page)
                    })
                })

                // List Navbar
                document.querySelectorAll('nav-bar nav ul li').forEach(elm => {
                    elm.addEventListener('click', () => {
                        document.querySelectorAll('nav-bar nav ul li').forEach(elm => elm.classList.remove('active-link'))
                        elm.classList.add('active-link')
                    })
                })

            }
        }

        xhr.open('GET', 'nav.html', true)
        xhr.send()
    }

    M.Sidenav.init(sidenav, {
        edge: 'left',
        draggable: true
    })
    loadNav()

    if (page === '') page = 'home'
    loadedPage(page)
 

}

export default main