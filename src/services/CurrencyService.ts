import axiosClient from "../api/axiosClient";
import { ICurrency } from '../interfaces/Currency';
import IPagination from "../interfaces/Pagination";

export const getCurrenciesApi = (offset: number, limit: number): Promise<IPagination<ICurrency>> => {
    return new Promise((resolve, reject) => {
        let url = `/reference-currencies?offset=${offset}&limit=${limit}`;
        return axiosClient.get(url).then((resp) => {
            resolve(resp.data);
        }, (err) => {
            reject(err);
        });
    })
};

