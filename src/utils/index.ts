import numeral from 'numeral';
import { ICoinHistory } from '../interfaces/Coin';

export const formatCurrency = (value: number, isNotation: boolean = false) => {
    if (!value) return "$ --";
    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 1,
        maximumFractionDigits: 4,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 4,
        notation: isNotation ? "compact" : "standard"
    });
    return dollarUS.format(value);
};

export const isPositiveChange = (valueStr: string): Boolean => {
    let value = parseFloat(valueStr);
    return value > 0 ? true : false;
};

export const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({
        length
    }, (_, i) => start + i);
};

export const commarize = (input: string | number) => {
    if (!input) return "N/A";
    let value = numeral(input).format('0.0a');
    return value ? value.toUpperCase() : "";
};

export const convertCoinHistoryData = (data: ICoinHistory[]) => {
    let initialValue: number[][] = [];
    let convert = data.reduce(
        (previousValue, currentValue) => [...previousValue, [new Date(currentValue.timestamp * 1000).getTime(), parseFloat(parseFloat(currentValue.price).toFixed(3))]],
        initialValue
    );
    return convert;
};

export const sortCoinHistoryByTime = (data: ICoinHistory[]) => {
    return data.sort((a, b) => a.timestamp - b.timestamp);
};