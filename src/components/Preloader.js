class PreLoader extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
            <div class="progress mx-auto">
                <div class="indeterminate yellow"></div>
            </div>
        `
    }
}

customElements.define('pre-load', PreLoader)