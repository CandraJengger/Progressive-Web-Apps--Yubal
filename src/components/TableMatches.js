class TableMatches extends HTMLElement {

    set setMatches(matches) {
        this._matches = matches
        this.render()
    }

    render() {
        this.innerHTML = `
            <div class="row match">
                ${ 
                    this._matches.map(value => (
                        `

                            <div class="row">
                                <div class="col s7 l4 offset-l1 right-align">${ value.homeTeam.name }</div>
                                <div class="col s4 l2 center-align red match-score">${ value.score.fullTime.homeTeam } : ${ value.score.fullTime.awayTeam }</div>
                                <div class="col s12 l4 left-align">${ value.awayTeam.name }</div>
                            </div>
                        `
                    )).join(' ') 
                }
            </div>
        `
    }
}

customElements.define('table-match', TableMatches)