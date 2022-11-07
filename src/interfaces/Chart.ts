export type TimePeriod = "1h" | "12h" | "24h" | "7d" | "30d" | "3m" | "1y" | "all";

export interface ITimePeriod {
    label: string;
    value: TimePeriod;
};