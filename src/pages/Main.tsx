import React, { useEffect, useState } from 'react';
import { TUserName } from '../types';
import { Link } from 'react-router-dom';
import 'css/main.scss';

const Main = () => {
    const [playerList, setPlayerList] = useState<TUserName[]>([
        'green',
        'black',
        'orange',
        'red',
        'yellow',
    ]);

    return (
        <div className="main-wrap">
            <h1>POKER 승자 맞추기 게임</h1>
            <ul className="player-list">
                {playerList.map((item, idx) => {
                    return <li key={idx} className={`${item}`}></li>;
                })}
            </ul>
            <ul className="rule-list">
                <li>
                    - <strong>탑 → 1페어 → 2페어 → 트리플 → 플러시 → 풀하우스 → 포카드</strong>{' '}
                    까지만 구현되어 있고 오픈된 카드들을 확인 후 해당 라운드의 승자를 예측하는
                    게임입니다.
                </li>
                <li>
                    - <strong>총 10번</strong>의 라운드를 진행합니다.
                </li>
                <li>
                    - 플레이어의 <strong>패는 항상 공개</strong>됩니다.
                </li>
            </ul>

            <Link to="/game">게임 시작</Link>
        </div>
    );
};

export default Main;
