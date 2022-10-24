import axiosClient from "../api/axiosClient";
import IPagination from "../interfaces/Pagination";
import ICoin from '../interfaces/Coin';

export const getCoinsApi = (page: number, limit: number, orderBy?: string): Promise<IPagination<ICoin>> => {
    return new Promise((resolve, reject) => {

        let url = `/coins?page=${page}&limit=${limit}`;

        if (orderBy) {
            url = `/coins?page=${page}&limit=${limit}&orderBy=${orderBy}`
        }

        return axiosClient.get(url).then((resp) => {
            resolve(resp.data);
        }, (err) => {
            reject(err);
        })
    })
};