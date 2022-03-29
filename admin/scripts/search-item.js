class SearchItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let container = document.createElement('div');
        container.classList = ['search-item-container'];

        let album = document.createElement('img');
        album.src = this.getAttribute('src');
        album.width = '40';
        album.height = '40';
        album.style = 'margin: 0px 5px;'
        container.append(album);


        let title = document.createElement('div')
        title.innerHTML = this.getAttribute('title');
        title.classList = ['noselect'];
        
        let artist = document.createElement('div');
        artist.innerHTML = this.getAttribute('artist');
        artist.classList = ['noselect'];
        artist.style.fontSize = '14px';

        let information = document.createElement('div');
        information.style = `width: 100%;
                            text-align: left;
                            flex-grow: 1;
                            margin: 0 0 10px 0;
                            color: black;`;
                            
        information.appendChild(title);
        information.appendChild(artist);
        container.appendChild(information);

        this.appendChild(container);
    }
}

customElements.define('search-item', SearchItem);

