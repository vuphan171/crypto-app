export interface ICurrency {
    uuid: string;
    type: "coin" | "fiat" | "denominator";
    name: string;
    iconUrl: string;
    symbol: string;
    sign: string;
};