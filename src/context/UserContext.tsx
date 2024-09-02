import { createContext, useMemo, useState, ReactNode } from 'react';

type TUserContext = [any, (user: any) => void, (name: string, score: number, number: number) => void, () => any]; // 사용자 타입에 맞게 `any`를 적절히 변경
type TMadeType = {
    [key: string]: number | string;
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
        name: 'green',
        score: 0,
        number: 0,
    });
    const [blackMade, setBlackMade] = useState<TMadeType>({ name: 'black', score: 0, number: 0 });
    const [orangeMade, setOrangeMade] = useState<TMadeType>({ name: 'orange', score: 0, number: 0 });
    const [redMade, setRedMade] = useState<TMadeType>({ name: 'red', score: 0, number: 0 });
    const [yellowMade, setYellowMade] = useState<TMadeType>({ name: 'yellow', score: 0, number: 0 });

    const value = useMemo(() => {
        const setUser = (user: any) => {
            setSelectUser(user);
        };

        const setScore = (name: string, score: number, number: number) => {
            switch (name) {
                case 'green':
                    setGreenMade({ name, score, number });
                    break;
                case 'black':
                    setBlackMade({ name, score, number });
                    break;
                case 'orange':
                    setOrangeMade({ name, score, number });
                    break;
                case 'red':
                    setRedMade({ name, score, number });
                    break;
                case 'yellow':
                    setYellowMade({ name, score, number });
                    break;

                default:
                    break;
            }
        };

        const getWinner = () => {
            const scoreArr: any = [greenMade, blackMade, orangeMade, redMade, yellowMade];
            const maxScore: number = Math.max(...scoreArr.map((item: any) => item.score));
            const maxScoreUser = scoreArr.find((item: any) => item.score === maxScore); // filter()
            return maxScoreUser;
        };

        return [selectUser, setUser, setScore, getWinner] as TUserContext;
    }, [selectUser]);

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
