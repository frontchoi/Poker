import { createContext, useMemo, useState, ReactNode } from 'react';

type TUserContext = [any, (user: any) => void]; // 사용자 타입에 맞게 `any`를 적절히 변경

export const UserContext = createContext<TUserContext | null>(null);

export const UserContextProvider = (props: { children: ReactNode }) => {
    const [selectUser, setSelectUser] = useState<any>('');

    const value = useMemo(() => {
        const setUser = (user: any) => {
            setSelectUser(user);
        };

        return [selectUser, setUser] as TUserContext;
    }, [selectUser]);

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
