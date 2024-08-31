export type TCardShape = 'diamond' | 'club' | 'heart' | 'spade';
export type TUserName = 'green' | 'black' | 'orange' | 'red' | 'yellow';

export interface IPlayerProps {
    photo: TUserName;
    isPlay: boolean;
    cardList: string[];
}
