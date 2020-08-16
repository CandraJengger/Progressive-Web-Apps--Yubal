class StandingsDetail extends HTMLElement {

    set setStandingsDetail(standings) {
        this._standings = standings
        this.render()
    }

    render() {
        this.innerHTML = `
            <div class="row stand-detail">
                <div class="col s12">Position</div>
                <p class="stand-detail-number">${ this._standings.position }</p>
                <div class="col s6 m4 l4 shadow-stand-detail offset-l2 offset-m4">Play</div>
                <div class="col s6 m4 l4 red">${ this._standings.playedGames }</div>
                <div class="col s6 m4 l4 shadow-stand-detail offset-l2 offset-m4">Win</div>
                <div class="col s6 m4 l4 red">${ this._standings.won }</div>
                <div class="col s6 m4 l4 shadow-stand-detail offset-l2 offset-m4">Lost</div>
                <div class="col s6 m4 l4 red">${ this._standings.lost }</div>
                <div class="col s6 m4 l4 shadow-stand-detail offset-l2 offset-m4">Draw</div>
                <div class="col s6 m4 l4 red">${ this._standings.draw }</div>
                <div class="col s6 m4 l4 shadow-stand-detail offset-l2 offset-m4">GD</div>
                <div class="col s6 m4 l4 red">${ this._standings.goalDifference }</div>
                <div class="col s6 m4 l4 shadow-stand-detail offset-l2 offset-m4">PTS</div>
                <div class="col s6 m4 l4 red">${ this._standings.points }</div>
                
            </div>
        `
    }

}

customElements.define('standings-detail', StandingsDetail)