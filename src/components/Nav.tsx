import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'context/UserContext';
import 'css/nav.scss';

const Nav = () => {
    const [selectUser, setUser, setScore, getWinner] = useContext<any>(UserContext);

    useEffect(() => {}, [selectUser]);

    return (
        <div className="nav">
            {getWinner().name ? (
                <div className="result">
                    <p>
                        예상 승자 : <span className={`${selectUser}`}></span>{' '}
                    </p>
                    <p>
                        최종 승자 : <span className={`${getWinner()?.name}`}></span>
                    </p>
                </div>
            ) : (
                <p className="playing">게임이 진행중 입니다.</p>
            )}
        </div>
    );
};

export default Nav;
