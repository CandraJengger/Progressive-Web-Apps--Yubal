class TablePlayerScorers extends HTMLElement {
    set setScorers(scorers) {
        this._scorers = scorers
        this.count = 0
        this.render()
    }

    render() {
        this.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Name Player</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${
                    this._scorers.map(value => (
                        `
                            <tr>
                                <td>${ this.count+=1 }</td>
                                <td>${ value.player.name }</td>
                                <td>${ value.numberOfGoals }</td>
                            </tr>
                        `
                    )).join(' ')
                }
            </tbody>
        </table>
        `
    }
}

customElements.define('table-scorers', TablePlayerScorers)