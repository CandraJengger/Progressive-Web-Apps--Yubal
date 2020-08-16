import '../components/WrapTab.js'
import '../components/Preloader.js'
import '../data/idb.js'
import { saveClubFavorite, deleteClubFavorite, getClubFavorite } from '../data/db.js'
import { getClubById, getMatchesClubById, getStandings } from '../data/api.js'

const club = async () => {
    const tabs = document.querySelectorAll('.tabs')

    M.Tabs.init(tabs, {
        swipeable: true
    })

    // Request
    const urlParams = new URLSearchParams(window.location.search)
    const idClub = urlParams.get('id')
    const idLeague = urlParams.get('idLeague')
    const detailELement = document.querySelector('.detail')
    const tabSquad = document.querySelector('#wrap-squad table-squad')
    const tabMatches = document.querySelector('#wrap-matches table-match')
    const tabStandings = document.querySelector('#wrap-standings standings-detail')
    const isFromFavorite = urlParams.get('favorite')

    const resultClub = await getClubById(idClub)
        .then(data => {
            let url = data.crestUrl
            url = url.replace(/^http:\/\//i, 'https://')

            detailELement.innerHTML = `
                <h4 class="white-text detail-title">${ data.name }</h4>
                <table class="detail-table">
                    <tr>
                        <td><i class="material-icons">home</i></td>
                        <td>${ data.venue }</td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">public</i></td>
                        <td><a href="${ data.website }">${ data.website }</a></td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">palette</i></td>
                        <td>${ data.clubColors }</td>
                    </tr>
                    <tr>
                        <td><i class="material-icons">golf_course</i></td>
                        <td>${ data.address }</td>
                    </tr>
                </table>
            `
            detailELement.previousElementSibling.children[0].src = `${ url }` //untuk image / logo club
            detailELement.previousElementSibling.children[0].addEventListener('error', function() {
                this.src = './src/images/default.png'
            })
            detailELement.previousElementSibling.children[0].alt = `${ data.name }` //untuk nama club
            tabSquad.setSquad = data.squad //mengirimkan data squad pada componen tabSquad
        })
        .catch(err => {
            detailELement.parentElement.parentElement.innerHTML = `
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

    const resultMatches = await getMatchesClubById(idClub) //untuk mendapatkan match terakhir
        .then(response => response.matches.slice(response.matches.length-5, response.matches.length))
        .then(data => {
            tabMatches.setMatches = data
        })

    const resultStandingsDetail = await getStandings(idLeague) // untuk mendapatkan posisi klub 
        .then(response => response.standings[0].table)
        .then(data => {
            data.forEach(elm => {
                if (elm.team.id === parseInt(idClub)) {
                    tabStandings.setStandingsDetail = elm
                }
            })
        })

    // Save
    const clubFav = getClubById(idClub)
    const btnSave = document.getElementById('save')

    if (isFromFavorite) { //cek apakah dari favorite
        btnSave.children[0].classList.add('black-icon')
        btnSave.children[0].style.color = '#000'
    } else {
        btnSave.children[0].classList.remove('black-icon')
        btnSave.children[0].style.color = '#fff'
    }

    btnSave.addEventListener('click', function() {
        if (btnSave.children[0].classList.contains('black-icon')) {
            btnSave.children[0].classList.remove('black-icon')
            btnSave.children[0].style.color = '#fff'
            clubFav.then(club => deleteClubFavorite(club.id))
        } else {
            btnSave.children[0].classList.add('black-icon')
            btnSave.children[0].style.color = '#000'    
            clubFav.then(club => saveClubFavorite(club))   
        }
    })
        

}

export default club