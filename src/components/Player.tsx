import React, { useEffect, useState } from 'react';
import { TUserName, TCardShape, IPlayerProps, ICardMade, IShapeList } from '../types';
import Cards from './Cards';

interface ICardMadeMap {
    [key: string]: ICardMade;
}
type TNumberListType = {
    [key: string]: number;
};
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
let shapeList: IShapeList = {
    club: 0,
    heart: 0,
    diamond: 0,
    spade: 0,
};
let numberList: TNumberListType = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
};
const Player: React.FC<IPlayerProps> = ({ photo, isPlay, cardList, isSelect }) => {
    const [maxMade, setMaxMade] = useState<string>('');

    useEffect(() => {
        if (cardList.length < 3 || !isPlay) return; // 카드의 숫자가 3개 미만이거나 플레이어가 아니면 리턴

        madeReset();
        const arr: string[][] = cardList.map((item) => item.split('_'));

        // 1. shapeArr 로 현재 shape 갯수 확인
        const shapeArr: string[] = arr.map((item) => {
            return item[0];
        });

        shapeArr.forEach((item) => {
            switch (item) {
                case 'club':
                    shapeList.club++;
                    break;
                case 'heart':
                    shapeList.heart++;
                    break;
                case 'diamond':
                    shapeList.diamond++;
                    break;
                case 'spade':
                    shapeList.spade++;
                    break;

                default:
                    break;
            }
        });

        // 2. 페어, 트리플, 스트레이트, 풀하우스, 포카드 확인
        const numberArr: number[] = arr.map((item) => {
            return Number(item[1]);
        });

        numberArr.forEach((item) => {
            numberList[item.toString()] += 1;
        });
    }, [cardList]);

    // 플러시 확인
    useEffect(() => {
        if (cardList.length < 3 || !isPlay) return; // 카드의 숫자가 3개 미만이거나 플레이어가 아니면 리턴

        // 객체 for 문
        for (const [key, value] of Object.entries(shapeList)) {
            if (value >= 5) {
                cardMade.flush.made = true;
                cardMade.flush.shape = key as TCardShape;
            }
        }
    }, [shapeList]);
    // -----------------------------------------------------------

    const madeReset = () => {
        shapeList = {
            club: 0,
            heart: 0,
            diamond: 0,
            spade: 0,
        };
        numberList = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0,
            '11': 0,
            '12': 0,
            '13': 0,
        };
    };

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
