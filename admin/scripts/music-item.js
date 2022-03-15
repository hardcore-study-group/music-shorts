class MusicItem extends HTMLElement {
    constructor() {
        super();
        this.mainBackgroundColor = '#222222';
    }

    connectedCallback() {
        let container = document.createElement('div');
        container.id = 'music-item-container';

        let album = document.createElement('img');
        album.src = this.getAttribute('src');
        album.width = '40';
        album.height = '40';
        album.style = 'margin: 0px 5px;'
        container.append(album);


        let title = document.createElement('div')
        title.innerHTML = this.getAttribute('title');
        
        let artist = document.createElement('div');
        artist.innerHTML = this.getAttribute('artist');

        let information = document.createElement('div');
        information.style = `text-align: left;
                            flex-grow: 1;
                            margin: 0 20px;`;
        information.appendChild(title);
        information.appendChild(artist);
        container.appendChild(information);


        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'delete';
        deleteButton.style = `border: none;
                            margin: 0px 10px; 
                            cursor: pointer;
                            color: white;
                            background-color:${this.mainBackgroundColor}`;
        container.appendChild(deleteButton);
        deleteButton.addEventListener('mouseenter', event => {
            event.target.style.textDecoration = 'underline';
        })
        deleteButton.addEventListener('mouseleave', event => {
            event.target.style.textDecoration = 'none';
        })

        this.appendChild(container);
    }
}

customElements.define('music-item', MusicItem);

