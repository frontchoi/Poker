import React, { useContext, useEffect, useState } from 'react';
import { TCardShape, TUserName, EIsProgress } from 'types';
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
    const [selectUser] = useContext<any>(UserContext);

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
        if (playCount > 0 && playCount < 3) cardPlay();
        else if (playCount === 7) setIsProgress(EIsProgress.END);
    }, [playCount]);

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
        const { green, black, red, yellow, orange } = { ...userList };

        green.push(cards.shift() || 'error');
        red.push(cards.shift() || 'error');
        black.push(cards.shift() || 'error');
        orange.push(cards.shift() || 'error');
        yellow.push(cards.shift() || 'error');

        // 카드 분배 후 state 업데이트
        setCardList(cards);
        setUserList({
            green,
            red,
            black,
            orange,
            yellow,
        });

        // 상태 업데이트 함수에 이전 상태를 기반으로 새로운 상태를 설정
        setPlayCount((prevCount) => prevCount + 1);
    };

    // 유저 선택 팝업 닫힘
    const closeUserSelect = () => {
        setIsProgress(EIsProgress.RESULT);
    };

    return (
        <div className="game-wrap">
            {/* selectUser : {selectUser} */}
            {isProgress === EIsProgress.INIT ? (
                <button className="btn-play" onClick={() => gameStart()}>
                    게임 시작
                </button>
            ) : undefined}
            {isProgress === EIsProgress.PLAY ? (
                <button className="btn-play" onClick={() => cardPlay()}>
                    다음
                </button>
            ) : undefined}
            {isProgress === EIsProgress.END ? (
                <button className="btn-play" onClick={() => setIsProgress(EIsProgress.CONFIRM)}>
                    승자 예측
                </button>
            ) : undefined}
            <div className={`user-wrap ${isProgress === EIsProgress.RESULT ? 'result' : ''}`}>
                <Player photo="black" isPlay={false} isSelect={selectUser === 'black'} cardList={userList.black} />
                <Player photo="orange" isPlay={false} isSelect={selectUser === 'orange'} cardList={userList.orange} />
            </div>
            <div className={`user-wrap ${isProgress === EIsProgress.RESULT ? 'result' : ''}`}>
                <Player photo="red" isPlay={false} isSelect={selectUser === 'red'} cardList={userList.red} />
                <Player photo="yellow" isPlay={false} isSelect={selectUser === 'yellow'} cardList={userList.yellow} />
            </div>
            <div className="player-wrap">
                <Player photo="green" isPlay={true} isSelect={selectUser === 'green'} cardList={userList.green} />
            </div>
            {isProgress === EIsProgress.CONFIRM && <Confirm popupClose={closeUserSelect} />}
        </div>
    );
};

export default Game;
