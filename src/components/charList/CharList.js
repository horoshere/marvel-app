import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends React.Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    }

    marvelService = new MarvelService();

    updateAllChars = (offset) => {
        this.onAllCharsLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onAllCharsLoaded)
        .catch(this.onError);
    }

    onAllCharsLoading = () => {
        this.setState({newItemLoading: true})
    }

    onAllCharsLoaded = (res) => {
        this.setState(({chars, offset}) => ({
            chars: [...chars, ...res], 
            loading: false, 
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    componentDidMount() {
        this.updateAllChars();
    }

    render() {
        const {chars, loading, error, newItemLoading, offset} = this.state;
        const char = chars.map(item => {
            let styleThumbnail = item.thumbnail;
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styleThumbnail = <img style={{objectFit: 'unset'}} src={item.thumbnail} alt="abyss"/>;
            } else {
            styleThumbnail = <img src={item.thumbnail} alt="abyss"/>;
            }
            return (
                <li key={item.id} 
                    className="char__item"
                    onClick={() => this.props.onCharSelected(item.id)}>
                        {styleThumbnail}
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? char : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.updateAllChars(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;