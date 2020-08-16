class TableStandings extends HTMLElement {

    set setStandings(standings) {
        this._standings = standings
        this.render()
    }

    render() {
        this.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Name Club</th>
                        <th>P</th>
                        <th>W</th>
                        <th>L</th>
                        <th>D</th>
                        <th>PT</th>
                    </tr>
                </thead>
                <tbody>
                    ${ 
                        this._standings.standings[0].table.map(value => (
                            `
                                <tr 
                                    class="tooltiped" 
                                    data-position="top" data-tooltip="Click to more detail !"
                                >
                                    <td>${ value.position }</td>
                                    <td>
                                        <a 
                                            href="./club.html?idLeague=${ this._standings.competition.id }&id=${ value.team.id }" 
                                            class="black-text" data-idClub="${ value.team.id }"
                                        >
                                            ${ value.team.name }
                                        </a>
                                    </td>
                                    <td>${ value.playedGames }</td>
                                    <td>${ value.won }</td>
                                    <td>${ value.lost }</td>
                                    <td>${ value.draw }</td>
                                    <td>${ value.points }</td>
                                </tr>
                            `
                        )).join(' ')
                     }
                </tbody>
            </table>
        `

        this.elems = this.querySelectorAll('.tooltiped')
        this.instance = M.Tooltip.init(this.elems)

    }
}

customElements.define('table-standings', TableStandings)