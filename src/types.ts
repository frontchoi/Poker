export type TCardShape = '' | 'diamond' | 'club' | 'heart' | 'spade';
export type TUserName = '' | 'green' | 'black' | 'orange' | 'red' | 'yellow';

export interface IPlayerProps {
    name: TUserName;
    cardList: string[];
    winner: boolean;
    gameEnd: boolean;
}

export enum EIsProgress {
    INIT,
    PLAY,
    END,
    CONFIRM,
    RESULT,
}

export interface ICardMade {
    made: boolean;
    number?: number;
}

export interface IShapeList {
    club: number;
    heart: number;
    diamond: number;
    spade: number;
}
