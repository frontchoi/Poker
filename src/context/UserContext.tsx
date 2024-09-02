import { createContext, useMemo, useState, ReactNode } from 'react';

type TUserContext = [any, (user: any) => void, (name: string, score: number, number: number) => void]; // 사용자 타입에 맞게 `any`를 적절히 변경
type TMadeType = {
    [key: string]: number;
};
export const UserContext = createContext<TUserContext | null>(null);

export const UserContextProvider = (props: { children: ReactNode }) => {
    const [selectUser, setSelectUser] = useState<any>('');

    // 원페어: 1점
    // 투페어: 2점
    // 트리플: 3점
    // 플러시: 4점
    // 풀하우스: 5점
    // 포카드: 6점

    const [greenMade, setGreenMade] = useState<TMadeType>({
        score: 0,
        number: 0,
    });
    const [blackMade, setBlackMade] = useState<TMadeType>({
        score: 0,
        number: 0,
    });
    const [orangeMade, setOrangeMade] = useState<TMadeType>({
        score: 0,
        number: 0,
    });
    const [redMade, setRedMade] = useState<TMadeType>({
        score: 0,
        number: 0,
    });
    const [yellowMade, setYellowMade] = useState<TMadeType>({
        score: 0,
        number: 0,
    });

    const value = useMemo(() => {
        const setUser = (user: any) => {
            setSelectUser(user);
        };

        const setScore = (name: string, score: number, number: number) => {
            switch (name) {
                case 'green':
                    setGreenMade({ score, number });
                    break;
                case 'black':
                    setBlackMade({ score, number });
                    break;
                case 'orange':
                    setOrangeMade({ score, number });
                    break;
                case 'red':
                    setRedMade({ score, number });
                    break;
                case 'yellow':
                    setYellowMade({ score, number });
                    break;

                default:
                    break;
            }
        };

        return [selectUser, setUser, setScore] as TUserContext;
    }, [selectUser]);

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
