import React, { useEffect, useState } from 'react';
import { TCardShape, TUserName } from '../types';
import Cards from '../components/Cards';
import Player from '../components/Player';
import '../css/game.scss';

enum EIsProgress {
    INIT,
    PLAY,
    END,
}

const Game = () => {
    const [shapeList, setShapeList] = useState<TCardShape[]>(['diamond', 'club', 'heart', 'spade']);
    const [cardList, setCardList] = useState<string[]>([]); // 전체 카드
    const [isProgress, setIsProgress] = useState<EIsProgress>(EIsProgress.INIT);
    const [isCount, setIsCount] = useState<number>(0);

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

    useEffect(() => {
        if (isProgress === EIsProgress.PLAY) {
            {
                [...Array(3)].map((_, i) => cardPlay());
            }
        }
    }, [isProgress]);

    useEffect(() => {
        if (isCount === 7) setIsProgress(EIsProgress.END);
    }, [isCount]);

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
        // 상태 업데이트 함수에 이전 상태를 기반으로 새로운 상태를 설정
        setIsCount((prevCount) => prevCount + 1);
    };

    return (
        <div className="game-wrap">
            {isProgress === EIsProgress.INIT ? (
                <button className="btn-play" onClick={() => setIsProgress(EIsProgress.PLAY)}>
                    게임 시작
                </button>
            ) : undefined}
            {isProgress === EIsProgress.PLAY ? (
                <button className="btn-play" onClick={() => cardPlay()}>
                    다음
                </button>
            ) : undefined}

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
