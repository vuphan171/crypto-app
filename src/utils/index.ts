export const formatCurrency = (value: number | bigint) => {
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