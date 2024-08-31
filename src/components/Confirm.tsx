import React from 'react';

const Confirm = () => {
    return (
        <div className="confirm-popup">
            <div className="popup-content">
                <p>게임의 승자를 예측해 보세요.</p>
                <ul>
                    <li className="photo black"></li>
                    <li className="photo orange"></li>
                    <li className="photo red"></li>
                    <li className="photo yellow"></li>
                    <li className="photo green"></li>
                </ul>
                <button>확인</button>
            </div>
        </div>
    );
};

export default Confirm;
