import React from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends React.Component {

    state = {
        chars: []
    }

    marvelService = new MarvelService();

    updateAllChars = () => {
        this.marvelService.getAllCharacters()
        .then(this.onAllCharsLoaded);
    }

    onAllCharsLoaded = (res) => {
        this.setState({chars: res})
    }

    componentDidMount() {
        this.updateAllChars();
    }

    render() {
        console.log(this.state.chars)
        const {chars} = this.state;
        const char = chars.map(item => {
            return (
                <li key={item.id} className="char__item">
                        <img src={item.thumbnail} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <div className="char__list">
                <ul className="char__grid">
                {char}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;