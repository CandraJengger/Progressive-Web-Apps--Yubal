import './TableSquad.js'
import './TableMatches.js'
import './StandingsDetail.js'

class WrapTab extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute('id') || null
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="white row wrapper">
            <div class="col s12 m12 l12 wrap-content">
                ${ 
                    this.id === 'wrap-squad' ? 
                    '<table-squad></table-squad>'
                    :
                    this.id === 'wrap-matches' ?
                    '<table-match></table-match>'
                    : 
                    this.id === 'wrap-standings' &&
                    '<standings-detail></standings-detail>'  
                }
            </div>
        </div>
        `
    }
}

customElements.define('wrap-tab', WrapTab)