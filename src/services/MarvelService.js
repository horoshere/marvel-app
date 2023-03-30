import axios from "axios"

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=c91f341a2dfaa43527cb63fbdfcd9b04';

    getResource = async (url) => {
        let res = await axios.get(url);

        return await res;
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.data.results.map(item => this._transformCharacter(item));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.data.results[0]);
    }

    changeDescr = (descr) => {
        let cutDescr = descr;
        if (!cutDescr) {
            cutDescr = 'Description is missing...';
        } else if (descr.length > 140) {
            cutDescr = `${descr.slice(0, 140)}...`;
        }
        return cutDescr;
    }

    _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            descr: this.changeDescr(res.description),
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
}

export default MarvelService;