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
    noPair: { made: true, number: 0 },
    onePair: { made: false, number: 0 },
    twoPair: { made: false, number: 0 },
    triple: { made: false, number: 0 },
    flush: { made: false, number: 0 },
    fullHouse: { made: false, number: 0 },
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
    const [currentMade, setCurrentMade] = useState<string>('');

    useEffect(() => {
        if (cardList.length < 3) return; // 카드의 숫자가 3개 미만이거나 플레이어가 아니면 리턴

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
        // 플러시 확인
        for (const [key, value] of Object.entries(shapeList)) {
            if (value >= 5) {
                cardMade.flush.made = true;
                // cardMade.flush.shape = key as TCardShape;
            }
        }

        // 2. 페어, 트리플, 풀하우스, 포카드 확인
        const numberArr: number[] = arr.map((item) => {
            return Number(item[1]);
        });

        numberArr.forEach((item: number) => {
            numberList[item.toString()] += 1;
        });

        cardMade.noPair.number = Math.max(...numberArr); // 배열 안에서 제일 높은 수 찾기

        for (const [key, value] of Object.entries(numberList)) {
            // 원페어 확인
            if (value >= 2) {
                cardMade.onePair.made = true;
                cardMade.onePair.number = Number(key || 0);
            }
            // 트리플 확인
            if (value >= 3) {
                cardMade.triple.made = true;
                cardMade.triple.number = Number(key || 0);
            }
            // 풀 하우스 확인
            if (cardMade.onePair.made && cardMade.triple.made) {
                cardMade.fullHouse.made = true;
                cardMade.fullHouse.number = Number(cardMade.triple.number || 0);
            }
            // 포카드 확인
            if (value >= 4) {
                cardMade.fourCards.made = true;
                cardMade.fourCards.number = Number(key || 0);
            }
        }

        madeCheck(); // 현재 메이드 체크하기
    }, [cardList]);
    // -----------------------------------------------------------
    // 메이드 초기화 함수 (카드리스트 변경될 때마다 새로 계산)
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
    const madeCheck = () => {
        const { noPair, onePair, twoPair, triple, flush, fullHouse, fourCards } = cardMade;

        let txt = `${noPair.number} 노페어`;
        // if (onePair.made) {
        //     txt = `${onePair.number} 원페어`;
        // }

        setCurrentMade(txt);
    };

    return (
        <div className="card-box">
            <p className="txt-made">{currentMade}</p>
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
