import './TableStandings.js'
import './TablePlayerScorers.js'

class WrapTable extends HTMLElement {
    connectedCallback() {
        this.title = this.getAttribute('title') || null
        this.id = this.getAttribute('id') || null
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="white row wrapper">
            <div class="col s12 m12 l12 ${ this.id === 'standings' ? 'standings': 'scorers' }">
                <h5 class="center-align">
                    <i class="material-icons">${ this.id === 'standings' ? 'event_note' : 'gps_fixed' }</i>
                    ${ this.title }
                </h5>
            </div>
            <div class="col s12 m12 l12 wrap-content" id=${ this.id }>
                ${
                    (this.id === 'standings') ? 
                    '<table-standings></table-standings>' 
                    : 
                    (this.id === 'scorers') &&
                    '<table-scorers></table-scorers>' 
                 }
            </div>
        </div>
        `
    }
}

customElements.define('wrap-table', WrapTable)