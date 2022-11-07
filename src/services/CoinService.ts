import axiosClient from "../api/axiosClient";
import ICoin from '../interfaces/Coin';
import IPagination from "../interfaces/Pagination";
import { convertCoinHistoryData, sortCoinHistoryByTime } from '../utils';

export const getCoinsApi = (page: number, limit: number, orderBy?: string, orderDirection?: string, keyword?: string): Promise<IPagination<ICoin>> => {
    return new Promise((resolve, reject) => {

        let url = `/coins?page=${page}&limit=${limit}`;

        if (orderBy) {
            url += `&orderBy=${orderBy}`
        }

        if (orderDirection) {
            url += `&orderDirection=${orderDirection}`
        }

        if (keyword) {
            url += `&keyword=${keyword}`;
        }

        return axiosClient.get(url).then((resp) => {
            resolve(resp.data);
        }, (err) => {
            reject(err);
        })
    })
};

export const getCoinApi = (id: string): Promise<ICoin> => {
    return new Promise((resolve, reject) => {
        let url = `/coins/${id}`;
        return axiosClient.get(url).then(resp => {
            resolve(resp.data);
        }, (err) => {
            reject(err);
        })
    })
};

export const getCoinHistoryApi = (id: string, timePeriod: string = '24h'): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
        let url = `/coins/${id}/history?timePeriod=${timePeriod}`;
        return axiosClient.get(url).then(resp => {
            let dataAfterSort = sortCoinHistoryByTime(resp.data);
            let data = convertCoinHistoryData(dataAfterSort);
            resolve(data);
        }, (err) => {
            reject(err);
        })
    })
};