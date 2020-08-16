class MainContent extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `<div class="container" id="body-content"></div>`
    }
}

customElements.define('main-content', MainContent)