import { createContext, useMemo, useState } from 'react';

export const UserSelectContext = createContext(null);
const UserSelectContextProvider = (props) => {
    const [selectUser, setSelectUser] = useState('');

    // selectUser에 변경이 있을 때만 새로 렌더링
    const value = useMemo(() => {
        return [{ ...selectUser }];
    }, [selectUser]);

    return <UserSelectContext.Provider value={value} {...props} />;
};

export default UserSelectContextProvider;
