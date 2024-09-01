import React, { useContext, useState } from 'react';
import { TUserName } from '../types';
import { UserContext } from '../context/UserContext';

interface IConfirmProps {
    popupClose: () => void; // popupClose 함수의 타입 정의
}

const Confirm: React.FC<IConfirmProps> = ({ popupClose }) => {
    const [isSelect, setIsSelect] = useState<TUserName>('');
    const [selectUser, setUser] = useContext<any>(UserContext);

    const userSelect = (user: TUserName) => {
        setIsSelect((prevUser) => (prevUser === user ? '' : user));

        setUser(user);
    };

    return (
        <div className="confirm-popup">
            <div className="popup-content">
                <p>게임의 승자를 예측해 보세요.</p>
                <ul>
                    <li className={`photo black ${isSelect === 'black' ? 'check' : ''}`} onClick={() => userSelect('black')}></li>
                    <li className={`photo orange ${isSelect === 'orange' ? 'check' : ''}`} onClick={() => userSelect('orange')}></li>
                    <li className={`photo red ${isSelect === 'red' ? 'check' : ''}`} onClick={() => userSelect('red')}></li>
                    <li className={`photo yellow ${isSelect === 'yellow' ? 'check' : ''}`} onClick={() => userSelect('yellow')}></li>
                    <li className={`photo green ${isSelect === 'green' ? 'check' : ''}`} onClick={() => userSelect('green')}></li>
                </ul>
                <button disabled={isSelect === '' ? true : false} onClick={popupClose}>
                    확인
                </button>
            </div>
        </div>
    );
};

export default Confirm;
