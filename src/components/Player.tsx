import React, { useEffect } from 'react';
import { TUserName, IPlayerProps } from '../types';
import Cards from './Cards';

const Player: React.FC<IPlayerProps> = ({ photo, isPlay, cardList }) => {
    // console.log('cardList', cardList);

    return (
        <div className="card-box">
            <div className={`photo ${photo}`}></div>
            <div className="cards">
                {cardList.map((item, idx) => {
                    const shape: string[] = item.split('_');
                    return <Cards shape={shape[0]} num={shape[1]} key={idx} />;
                })}
            </div>
        </div>
    );
};
export default Player;
