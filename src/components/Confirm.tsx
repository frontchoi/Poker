import React, { useContext, useState } from 'react';
import { TUserName } from '../types';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface IConfirmProps {
    popupClose: (confirm: boolean) => void; // popupClose 함수의 타입 정의
}

export const Confirm: React.FC<IConfirmProps> = ({ popupClose }) => {
    const [isSelect, setIsSelect] = useState<TUserName>('');
    const [selectUser, setUser, setScore] = useContext<any>(UserContext);

    const userSelect = (user: TUserName) => {
        setIsSelect((prevUser) => (prevUser === user ? '' : user));
        setUser(user);
        popupClose(true);
    };

    return (
        <div className="confirm-popup">
            <div className="popup-content">
                <p>이번 라운드의 승자를 예측해 보세요.</p>
                <ul>
                    <li
                        className={`photo black ${isSelect === 'black' ? 'popup-check' : ''}`}
                        onClick={() => setIsSelect('black')}
                    ></li>
                    <li
                        className={`photo orange ${isSelect === 'orange' ? 'popup-check' : ''}`}
                        onClick={() => setIsSelect('orange')}
                    ></li>
                    <li
                        className={`photo red ${isSelect === 'red' ? 'popup-check' : ''}`}
                        onClick={() => setIsSelect('red')}
                    ></li>
                    <li
                        className={`photo yellow ${isSelect === 'yellow' ? 'popup-check' : ''}`}
                        onClick={() => setIsSelect('yellow')}
                    ></li>
                    <li
                        className={`photo green ${isSelect === 'green' ? 'popup-check' : ''}`}
                        onClick={() => setIsSelect('green')}
                    ></li>
                </ul>
                <button
                    disabled={isSelect === '' ? true : false}
                    onClick={() => userSelect(isSelect)}
                >
                    확인
                </button>
                <button onClick={() => popupClose(false)}>닫기</button>
            </div>
        </div>
    );
};

export const GameOver: React.FC<any> = ({ popupClose }) => {
    const navigate = useNavigate();
    return (
        <div className="confirm-popup">
            <div className="popup-content">
                <p className="txt-main">
                    10라운드의 게임이 종료되었습니다.
                    <br />
                    메인으로 이동하시겠습니까?
                </p>
                <button onClick={() => navigate('/')}>확인</button>
                <button onClick={() => popupClose(false)}>닫기</button>
            </div>
        </div>
    );
};
