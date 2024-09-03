import { createContext, useMemo, useState, ReactNode } from 'react';

type TMadeType = {
    [key: string]: number | string;
};
export const UserContext = createContext<any>(null);

export const UserContextProvider = (props: { children: ReactNode }) => {
    const [selectUser, setSelectUser] = useState<any>('');
    const [greenMade, setGreenMade] = useState<TMadeType>({ name: 'green', score: 0 });
    const [blackMade, setBlackMade] = useState<TMadeType>({ name: 'black', score: 0 });
    const [orangeMade, setOrangeMade] = useState<TMadeType>({ name: 'orange', score: 0 });
    const [redMade, setRedMade] = useState<TMadeType>({ name: 'red', score: 0 });
    const [yellowMade, setYellowMade] = useState<TMadeType>({ name: 'yellow', score: 0 });

    const [playResult, setPlayResult] = useState<(boolean | null)[]>(
        Array.from({ length: 10 }, () => null),
    );

    const [playRound, setPlayRound] = useState(1);

    const value = useMemo(() => {
        // 선택한 유저 저장
        const setUser = (user: any) => {
            setSelectUser(user === selectUser ? '' : user);
        };

        // 유저별 현재 점수 계산하여 저장
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

        // 승자 확인
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
        // 현재 결과 확인
        const getResult = () => {
            return playResult;
        };
        // 현재 결과 셋팅
        const setResult = (result: boolean) => {
            const arr = playResult;
            const num = arr.findIndex((item) => item === null);
            arr[num] = result;
            setPlayResult(arr);
        };

        const setRound = (round: number) => {
            setPlayRound(round);
        };
        const getRound = () => {
            return playRound;
        };

        return [
            selectUser,
            setUser,
            setScore,
            getWinner,
            getResult,
            setResult,
            setRound,
            getRound,
        ] as any;
    }, [selectUser]);

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
