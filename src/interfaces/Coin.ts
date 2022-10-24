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
};