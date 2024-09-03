import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'context/UserContext';

const Nav = () => {
    const [selectUser, setUser, setScore, getWinner] = useContext<any>(UserContext);

    useEffect(() => {
        console.log('getWinner', getWinner());
    }, [getWinner]);

    return <div id="nav">Nav</div>;
};

export default Nav;
