import React, { useContext, useEffect, useState } from 'react';
import { TUserName, TCardShape, IPlayerProps, ICardMade, IShapeList } from '../types';
import Cards from './Cards';
import { UserContext } from '../context/UserContext';

interface ICardMadeMap {
    [key: string]: ICardMade;
}
type TNumberListType = {
    [key: string]: number;
};
const Player: React.FC<IPlayerProps> = ({ name, cardList, winner, gameEnd }) => {
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
    // ------------------------------------------------------------------
    const [currentMade, setCurrentMade] = useState<string>('');
    const [selectUser, setUser, setScore, getWinner] = useContext<any>(UserContext);

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

        // 2. 페어, 트리플, 풀하우스, 포카드 확인
        const numberArr: number[] = arr.map((item) => {
            return Number(item[1]);
        });

        numberArr.forEach((item: number) => {
            numberList[item.toString()] += 1;
        });
        // 플러시 확인
        for (const [key, value] of Object.entries(shapeList)) {
            if (value >= 5) {
                cardMade.flush.made = true;

                const flushArr: number[] = cardList.map((item) => {
                    if (item.includes(key)) {
                        return Number(item.replace(`${key}_`, ''));
                    } else {
                        return 0;
                    }
                });
                if (flushArr.some((item) => item === 1)) cardMade.flush.number = 1; // A 예외처리
                else cardMade.flush.number = Math.max(...flushArr);
            }
        }

        cardMade.noPair.number = numberList['1'] > 0 ? numberList['1'] : Math.max(...numberArr); // 배열 안에서 제일 높은 수 찾기

        for (const [key, value] of Object.entries(numberList)) {
            // 원페어 확인
            if (value === 2) {
                cardMade.onePair.made = true;
                cardMade.onePair.number = numberList['1'] === 2 ? 1 : Number(key || 0);
            }
            // 트리플 확인
            if (value >= 3) {
                cardMade.triple.made = true;
                cardMade.triple.number = numberList['1'] === 3 ? 1 : Number(key || 0);
            }
            // 풀 하우스 확인
            if (cardMade.onePair.made && cardMade.triple.made) {
                cardMade.fullHouse.made = true;
                cardMade.fullHouse.number =
                    numberList['1'] === 3 ? 1 : Number(cardMade.triple.number || 0);
            }
            // 포카드 확인
            if (value >= 4) {
                cardMade.fourCards.made = true;
                cardMade.fourCards.number = numberList['1'] === 4 ? 1 : Number(key || 0);
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
        let score = 0;
        let number = 0;
        const { noPair, onePair, twoPair, triple, flush, fullHouse, fourCards } = cardMade;

        let txt = `${
            noPair.number && (noPair.number === 1 || noPair.number > 10)
                ? jqkaToStr(noPair.number)
                : noPair.number
        } 탑`;
        if (onePair.made) {
            score = 1;
            number = onePair.number || 0;
            txt = `${
                onePair.number && (onePair.number === 1 || onePair.number > 10)
                    ? jqkaToStr(onePair.number)
                    : onePair.number
            } 원페어`;
        }
        if (twoPair.made) {
            score = 2;
            number = twoPair.number || 0;
            txt = `${
                twoPair.number && (twoPair.number === 1 || twoPair.number > 10)
                    ? jqkaToStr(twoPair.number)
                    : twoPair.number
            } 투페어`;
        }
        if (triple.made) {
            score = 3;
            number = triple.number || 0;
            txt = `${
                triple.number && (triple.number === 1 || triple.number > 10)
                    ? jqkaToStr(triple.number)
                    : triple.number
            } 트리플`;
        }
        if (flush.made) {
            score = 4;
            number = flush.number || 0;
            txt = `${
                flush.number && (flush.number === 1 || flush.number > 10)
                    ? jqkaToStr(flush.number)
                    : flush.number
            } 플러시`;
        }
        if (fullHouse.made) {
            score = 5;
            number = fullHouse.number || 0;
            txt = `${
                fullHouse.number && (fullHouse.number === 1 || fullHouse.number > 10)
                    ? jqkaToStr(fullHouse.number)
                    : fullHouse.number
            } 풀하우스`;
        }
        if (fourCards.made) {
            score = 6;
            number = fourCards.number || 0;
            txt = `${
                fourCards.number && (fourCards.number === 1 || fourCards.number > 10)
                    ? jqkaToStr(fourCards.number)
                    : fourCards.number
            } 포카드`;
        }

        if (number === 1) number = 14; // A일 경우 제일 높은 값으로 변경

        setScore(name, score * number);
        setCurrentMade(txt);
    };

    const jqkaToStr = (txt: number) => {
        if (txt === 11) return 'J';
        else if (txt === 12) return 'Q';
        else if (txt === 13) return 'K';
        else if (txt === 1) return 'A';
    };

    return (
        <div className="card-box">
            <div className={`photo ${name} ${gameEnd ? (winner ? 'winner' : 'loser') : ''}`}>
                <span></span>
            </div>
            <p className="txt-made">{currentMade}</p>
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
