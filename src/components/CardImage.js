class CardImage extends HTMLElement {
    connectedCallback() {
        this.src = this.getAttribute('src') || null
        this.alt = this.getAttribute('alt') || null
        this.title = this.getAttribute('title') || null
        this.year = this.getAttribute('year') || null
        this.idLeague = this.getAttribute('idLeague') || null
        // this.href = this.getAttribute('href') || null
        this.render()
    }

    render() {
        this.innerHTML = `
            <a href="#"
                data-idleague=${ this.idLeague }
                class="card-panel white z-depth-1 card-image waves-effect waves-light container-fluid valign-wrapper py-2"
            >
                <div class="row valign-wrapper">
                    <div class="col l5">
                        <img src=${ this.src } alt=${ this.alt } class="responsive-img">
                    </div>
                    <div class="col l7">
                        <div class="row my-0">
                            <span class="black-text">
                                ${ this.title }
                            </span>
                        </div>
                        <div class="row my-0">${ this.year }</div>
                    </div>
                </div>
            </a>
        `
    }
}

customElements.define('card-image', CardImage)