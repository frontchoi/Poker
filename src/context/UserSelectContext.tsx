import { createContext, useMemo, useState, ReactNode } from 'react';

type TUserSelectContext = [any, (user: any) => void]; // 사용자 타입에 맞게 `any`를 적절히 변경

export const UserSelectContext = createContext<TUserSelectContext | null>(null);

export const UserSelectContextProvider = (props: { children: ReactNode }) => {
    const [selectUser, setSelectUser] = useState<any>('');

    const value = useMemo(() => {
        const setUser = (user: any) => {
            setSelectUser(user);
        };

        return [selectUser, setUser] as TUserSelectContext;
    }, [selectUser]);

    return <UserSelectContext.Provider value={value}>{props.children}</UserSelectContext.Provider>;
};
