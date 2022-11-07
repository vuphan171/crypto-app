export default interface ICoin {
    uuid: string;
    symbol: string;
    name: string;
    iconUrl: string;
    price: string;
    marketCap: string;
    rank: number;
    sparkline: number[];
    change: string;
    "24hVolume": string;
    description: string;
    supply: ISupply;
};

export interface ISupply {
    confirmed: boolean;
    supplyAt: string;
    max: string;
    total: string;
    circulating: string;
};

export interface ICoinHistory{
    price: string;
    timestamp: number;
}