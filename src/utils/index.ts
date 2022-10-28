export const formatCurrency = (value: number | bigint) => {
    if(!value) return "$ --";
    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
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