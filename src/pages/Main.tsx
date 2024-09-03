import React, { useState } from 'react';
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
                {playerList.map((item) => {
                    return <li className={`${item}`}></li>;
                })}
            </ul>
            <ul className="rule-list">
                <li>
                    - 개인 스터디용으로 시도해 볼 수 있는게 많을 것 같아 시작한 결과물이기 때문에
                    개발 로직 외의 퀄리티는 고려하지 않았습니다.
                </li>
                <li>
                    - <strong>탑 → 1페어 → 2페어 → 트리플 → 플러시 → 풀하우스 → 포카드</strong>{' '}
                    까지만 구현되어 있고 오픈된 카드들을 확인 후 해당 라운드의 승자를 맞추는
                    게임입니다.
                </li>
                <li>
                    - 5명의 플레이어가 존재하며 1명은 랜덤으로 모든 패를 공개하며, 4명은 3장의
                    카드는 비공개 합니다.
                </li>
                <li>- 총 10번을 진행하여 몇 번의 예측을 성공하였는지 확인합니다.</li>
            </ul>

            <Link to="/game">게임 시작</Link>
        </div>
    );
};

export default Main;
