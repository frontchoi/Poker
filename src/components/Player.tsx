import React, { useEffect, useState } from 'react';
import { TUserName, IPlayerProps, ICardMade } from '../types';
import Cards from './Cards';

interface ICardMadeMap {
    [key: string]: ICardMade;
}
// spade > diamond > heart > club
let cardMade: ICardMadeMap = {
    onePair: { made: false, number: 0, shape: '' },
    twoPair: { made: false, number: 0, subNumber: 0 },
    triple: { made: false, number: 0 },
    straight: { made: false, number: 0, shape: '' },
    backStraight: { made: false, number: 0 },
    mountain: { made: false, number: 0 },
    flush: { made: false, number: 0, shape: '' },
    fullHouse: { made: false, number: 0, subNumber: 0 },
    fourCards: { made: false, number: 0 },
};

const Player: React.FC<IPlayerProps> = ({ photo, isPlay, cardList, isSelect }) => {
    const [maxMade, setMaxMade] = useState<string>('');
    const [shapeList, setShapeList] = useState<{
        club: number;
        heart: number;
        diamond: number;
        spade: number;
    }>({
        diamond: 0,
        club: 0,
        heart: 0,
        spade: 0,
    });

    const [numberList, setNumberList] = useState(() => new Array(13).fill(0));

    useEffect(() => {
        if (cardList.length >= 3 && isPlay) {
            console.log('cardList', cardList);

            const arr: string[][] = cardList.map((item) => item.split('_'));

            const shapeArr: string[] = arr.map((item) => {
                return item[0];
            });
            const numberArr: number[] = arr.map((item) => {
                return Number(item[1]);
            });

            console.log('shapeList', shapeList);
            console.log('numberList', numberList);
        }
    });

    return (
        <div className="card-box">
            <div className={`photo ${photo} ${isSelect ? 'check' : ''}`}></div>
            <div className="cards">
                <ul>
                    {cardList.map((item, idx) => {
                        const shape: string[] = item.split('_');
                        return (
                            <li key={idx}>
                                <Cards shape={shape[0]} num={shape[1]} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default Player;
