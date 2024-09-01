import React, { useEffect } from 'react';
import { TUserName, IPlayerProps } from '../types';
import Cards from './Cards';

const Player: React.FC<IPlayerProps> = ({ photo, isPlay, cardList, isSelect }) => {
    return (
        <div className="card-box">
            <div className={`photo ${photo} ${isSelect ? 'check' : ''}`}></div>
            <div className="cards">
                <ul>
                    {cardList.map((item, idx) => {
                        const shape: string[] = item.split('_');
                        return (
                            <li key={idx}>
                                <Cards shape={shape[0]} num={shape[1]} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default Player;
