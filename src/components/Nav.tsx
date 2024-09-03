import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'context/UserContext';
import 'css/nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [selectUser, setUser, setScore, getWinner] = useContext<any>(UserContext);
    return (
        <div className="nav">
            <Link to="/">메인으로</Link>
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
