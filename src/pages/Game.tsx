import React, { useEffect, useState } from 'react';
import { TCardShape, TUserName } from '../types';
import Cards from '../components/Cards';
import Player from '../components/Player';
import '../css/game.scss';

const Game = () => {
    const [shapeList, setShapeList] = useState<TCardShape[]>(['diamond', 'club', 'heart', 'spade']);
    const [cardList, setCardList] = useState<string[]>([]); // 전체 카드
    const [isStart, setIsStart] = useState<boolean>(false);

    const [userList, setUserList] = useState<{
        green: string[];
        black: string[];
        orange: string[];
        red: string[];
        yellow: string[];
    }>({
        green: [],
        black: [],
        orange: [],
        red: [],
        yellow: [],
    });

    useEffect(() => {
        let arr: any = [];
        shapeList.forEach((shape: TCardShape) => {
            arr = [...arr, ...cardAdd(shape)];
        });
        // 생성된 카드를 셔플
        arr.sort(() => Math.random() - 0.5);
        setCardList(arr);
    }, []);

    // useEffect(() => {
    //     if (cardList.length === 0) return;
    //     console.log('adfasf', cardList);
    // }, [cardList]);

    useEffect(() => {
        if (isStart) {
            cardPlay();
        }
    }, [isStart]);

    // -----------------------------------------------------------
    // 모양별 카드 생성 함수
    const cardAdd = (shape: TCardShape) => {
        const arr: string[] = [];
        for (let index = 1; index < 14; index++) {
            arr.push(`${shape}_${index}`);
        }
        return arr;
    };
    // 카드 분배하는 함수
    const cardPlay = () => {
        const cards: string[] = cardList;
        const { green, black, red, yellow, orange } = userList;

        green.push(cards.shift() || 'error');
        red.push(cards.shift() || 'error');
        black.push(cards.shift() || 'error');
        orange.push(cards.shift() || 'error');
        yellow.push(cards.shift() || 'error');

        // 카드 분배 후 state 를 업데이트
        setCardList(cards);
        setUserList({
            green,
            red,
            black,
            orange,
            yellow,
        });
    };

    return (
        <div className="game-wrap">
            {isStart ? (
                <button className="btn-play" onClick={() => cardPlay()}>
                    다음
                </button>
            ) : (
                <button className="btn-play" onClick={() => setIsStart(true)}>
                    게임 시작
                </button>
            )}

            <div className="user-wrap">
                <Player photo="black" isPlay={false} cardList={userList.black} />
                <Player photo="orange" isPlay={false} cardList={userList.orange} />
            </div>
            <div className="user-wrap">
                <Player photo="red" isPlay={false} cardList={userList.red} />
                <Player photo="yellow" isPlay={false} cardList={userList.yellow} />
            </div>
            <div className="player-wrap">
                <Player photo="green" isPlay={true} cardList={userList.green} />
            </div>
        </div>
    );
};

export default Game;
