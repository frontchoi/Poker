import React, { useContext, useEffect, useState } from 'react';
import { TCardShape, TUserName, EIsProgress } from 'types';
import Nav from 'components/Nav';
import Cards from 'components/Cards';
import Player from 'components/Player';
import Confirm from 'components/Confirm';
import { UserContext } from 'context/UserContext';
import 'css/game.scss';

const Game = () => {
    const [shapeList, setShapeList] = useState<TCardShape[]>(['diamond', 'club', 'heart', 'spade']);
    const [cardList, setCardList] = useState<string[]>([]); // 전체 카드
    const [isProgress, setIsProgress] = useState<EIsProgress>(EIsProgress.INIT);
    const [playCount, setPlayCount] = useState<number>(0);
    const [winner, setWinner] = useState<{ name: string; score: number; number: number }>({
        name: '',
        score: 0,
        number: 0,
    });

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
    const [selectUser, setUser, setScore, getWinner, getResult, setResult] =
        useContext<any>(UserContext);

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
        if (playCount === 7) setIsProgress(EIsProgress.END);
        else if (playCount > 0 && playCount < 3) cardPlay(); // 처음 시작 시 3장의 카드를 받게함
    }, [playCount]);

    useEffect(() => {
        if (isProgress >= EIsProgress.RESULT) setWinner(getWinner());
    }, [isProgress]);
    // -----------------------------------------------------------
    // 모양별 카드 생성 함수
    const cardAdd = (shape: TCardShape) => {
        const arr: string[] = [];
        for (let index = 1; index < 14; index++) {
            arr.push(`${shape}_${index}`);
        }
        return arr;
    };
    // 게임 시작
    const gameStart = () => {
        setIsProgress(EIsProgress.PLAY);
        cardPlay();
    };
    // 카드 분배하는 함수
    const cardPlay = () => {
        const cards: string[] = JSON.parse(JSON.stringify(cardList));
        let { green, black, red, yellow, orange } = { ...userList };

        green.push(cards.shift() || 'error');
        red.push(cards.shift() || 'error');
        black.push(cards.shift() || 'error');
        orange.push(cards.shift() || 'error');
        yellow.push(cards.shift() || 'error');

        setUserList({
            green: [...green], // 스프레드 문법을 사용하여 새로운 배열 복사
            red: [...red],
            black: [...black],
            orange: [...orange],
            yellow: [...yellow],
        });

        setCardList(cards);

        // 상태 업데이트 함수에 이전 상태를 기반으로 새로운 상태를 설정
        setPlayCount((prevCount) => prevCount + 1);
    };
    // 유저 선택 팝업 닫힘
    const closeUserSelect = (confirm: boolean) => {
        if (confirm) setIsProgress(EIsProgress.RESULT);
        else setIsProgress(EIsProgress.CONFIRM);
    };

    // 다음 라운드 (초기화)
    const nextRound = () => {
        setResult(selectUser === getWinner()?.name); // 컨텍스트에 히스토리 저장
        setIsProgress(EIsProgress.INIT);
    };

    return (
        <>
            <Nav />
            <div className="game-wrap">
                {isProgress === EIsProgress.INIT ? (
                    <button className="btn-play" onClick={() => gameStart()}>
                        카드 주기
                    </button>
                ) : undefined}
                {isProgress === EIsProgress.PLAY ? (
                    <button className="btn-play" onClick={() => cardPlay()}>
                        다음 카드
                    </button>
                ) : undefined}
                {isProgress === EIsProgress.END || isProgress === EIsProgress.CONFIRM ? (
                    <button className="btn-play" onClick={() => setIsProgress(EIsProgress.POPUP)}>
                        승자 예측
                    </button>
                ) : undefined}
                {isProgress === EIsProgress.RESULT ? (
                    <button className="btn-play" onClick={() => nextRound()}>
                        다음 라운드
                    </button>
                ) : undefined}
                <div className={`user-wrap ${isProgress === EIsProgress.RESULT ? 'result' : ''}`}>
                    <Player
                        name="black"
                        cardList={userList.black}
                        winner={winner.name === 'black'}
                        gameEnd={isProgress === EIsProgress.RESULT}
                    />
                    <Player
                        name="orange"
                        cardList={userList.orange}
                        winner={winner.name === 'orange'}
                        gameEnd={isProgress === EIsProgress.RESULT}
                    />
                </div>
                <div className={`user-wrap ${isProgress === EIsProgress.RESULT ? 'result' : ''}`}>
                    <Player
                        name="red"
                        cardList={userList.red}
                        winner={winner.name === 'red'}
                        gameEnd={isProgress === EIsProgress.RESULT}
                    />
                    <Player
                        name="yellow"
                        cardList={userList.yellow}
                        winner={winner.name === 'yellow'}
                        gameEnd={isProgress === EIsProgress.RESULT}
                    />
                </div>
                <div className="player-wrap">
                    <Player
                        name="green"
                        cardList={userList.green}
                        winner={winner.name === 'green'}
                        gameEnd={isProgress === EIsProgress.RESULT}
                    />
                </div>
                {isProgress === EIsProgress.POPUP && <Confirm popupClose={closeUserSelect} />}
            </div>
        </>
    );
};

export default Game;
