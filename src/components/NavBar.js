class NavBar extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute('id') || null
        this.src = this.getAttribute('src') || null
        this.alt = this.getAttribute('alt') || null
        this.render()
    }

    render() {
        this.innerHTML = `
            <nav class="transparent z-depth-0">
                <div class="nav-wrapper container">
                    <a href="#" class="brand-logo" id="logo-container">
                        <img src=${ this.src } alt=${ this.alt } />
                    </a>
                    ${
                        this.id === 'index-navbar' ?
                        '<a href="#" class="sidenav-trigger" data-target="nav-mobile"><img src="./src/images/icon-bar.svg" class="icon-bar" alt="Icon Bar" /></a>'
                        :
                        this.id === 'club-navbar' ?
                        `<a href="./index.html#league" class="btn black-text btn-back">
                            <div>
                                <i class="material-icons">arrow_back</i>Back
                            </div>
                        </a>`
                        :
                        ''
                    }

                    <ul class="topnav hide-on-med-and-down"></ul>
                    <ul class="sidenav" id="nav-mobile"></ul>
                </div>
            </nav>
        `
    }
}

customElements.define('nav-bar', NavBar)