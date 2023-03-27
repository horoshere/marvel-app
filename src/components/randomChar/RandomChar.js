import React from 'react';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';

class RandomChar extends React.Component {
    constructor() {
        super();
        this.updateChar();
    }

    state = {
        char: {},
        loading: true
    }

    marvelService = new MarvelService();

    onCharLoaded = (res) => {
        this.setState({char: res, loading: false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(error => {
            console.log("error", error);
          });
    }

    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner /> : <View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {thumbnail, name, descr, homepage, wiki} = char;
        return (
            <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {descr}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
        )
}

export default RandomChar;