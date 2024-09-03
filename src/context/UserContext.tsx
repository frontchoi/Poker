import { createContext, useMemo, useState, ReactNode } from 'react';

type TUserContext = [
    any,
    (user: any) => void,
    (name: string, score: number, number: number) => void,
    () => any,
]; // 사용자 타입에 맞게 `any`를 적절히 변경
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
    });
    const [blackMade, setBlackMade] = useState<TMadeType>({ name: 'black', score: 0 });
    const [orangeMade, setOrangeMade] = useState<TMadeType>({ name: 'orange', score: 0 });
    const [redMade, setRedMade] = useState<TMadeType>({ name: 'red', score: 0 });
    const [yellowMade, setYellowMade] = useState<TMadeType>({ name: 'yellow', score: 0 });

    const value = useMemo(() => {
        const setUser = (user: any) => {
            setSelectUser(user === selectUser ? '' : user);
        };
        const setScore = (name: string, score: number) => {
            switch (name) {
                case 'green':
                    setGreenMade({ name, score });
                    break;
                case 'black':
                    setBlackMade({ name, score });
                    break;
                case 'orange':
                    setOrangeMade({ name, score });
                    break;
                case 'red':
                    setRedMade({ name, score });
                    break;
                case 'yellow':
                    setYellowMade({ name, score });
                    break;

                default:
                    break;
            }
        };

        const getWinner = () => {
            // 스코어 계산 전 실행 방지 (원래는 게임의 진행 상태를 context 에 저장하여 컨트롤하는게 제일 이상적임)
            const scoreArr: TMadeType[] = [greenMade, blackMade, orangeMade, redMade, yellowMade];
            const maxScore: number = Math.max(...scoreArr.map((item: any) => item.score));
            const maxScoreUser: TMadeType = scoreArr.find(
                (item: any) => item.score === maxScore,
            ) || { name: '', score: 0 };

            if (maxScore === 0) return { name: '', score: 0 };
            else return maxScoreUser;
        };

        return [selectUser, setUser, setScore, getWinner] as TUserContext;
    }, [selectUser]);

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
