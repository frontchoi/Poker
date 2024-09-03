import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'context/UserContext';
import 'css/nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [selectUser, setUser, setScore, getWinner, getResult, setResult] =
        useContext<any>(UserContext);

    const [round, setRound] = useState<number>(1);
    useEffect(() => {
        setRound(getResult().findIndex((item: boolean | null) => item === null) + 1);
    });

    return (
        <div className="nav-wrap">
            <Link to="/">메인으로</Link>
            {/* {getWinner().name ? (
                <div className="result">
                    <p>
                        예상 승자 : <span className={`${selectUser}`}></span>{' '}
                    </p>
                    <p>
                        최종 승자 : <span className={`${getWinner()?.name}`}></span>
                    </p>
                </div>
            ) */}
            <p className="playing">{`${round} 라운드 게임이 진행중 입니다.`}</p>
            <ul className="result-history">
                {getResult().map((item: boolean | null, idx: number) => {
                    return (
                        <li
                            key={idx}
                            className={`${item === true ? 'success' : ''} ${
                                item === false ? 'fail' : ''
                            }`}
                        ></li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Nav;
