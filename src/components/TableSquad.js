class TableSquad extends HTMLElement {
    
    set setSquad(squad) {
        this._squad = squad
        this.count = 0
        this.render()
    }

    render() {

        this.innerHTML = `
            <table>
                <thead class="red-text">
                    <tr>
                        <th>#</th>
                        <th>Name Player</th>
                        <th>Posision</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                        this._squad.map(value => (
                            `
                                <tr>
                                    <td>${ this.count+=1 }</td>
                                    <td>${ value.name }</td>
                                    <td>${ value.position }</td>
                                </tr>
                            `
                        )).join(' ')
                    }
                </tbody>
            </table>
        `
    }
}

customElements.define('table-squad', TableSquad)