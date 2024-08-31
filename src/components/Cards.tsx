import React from 'react';

interface ICardsProps {
    shape: string;
    num: string;
}

const Cards: React.FC<ICardsProps> = ({ shape, num }) => {
    return <div className={`card ${shape + num}`}></div>;
};

export default Cards;
