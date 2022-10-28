import axiosClient from "../api/axiosClient";
import IPagination from "../interfaces/Pagination";
import ICoin from '../interfaces/Coin';

export const getCoinsApi = (page: number, limit: number, orderBy?: string, orderDirection?: string, keyword?: string): Promise<IPagination<ICoin>> => {
    return new Promise((resolve, reject) => {

        let url = `/coins?page=${page}&limit=${limit}`;

        if (orderBy) {
            url += `&orderBy=${orderBy}`
        }

        if(orderDirection){
            url += `&orderDirection=${orderDirection}`
        }

        if(keyword){
            url += `&keyword=${keyword}`;
        }

        return axiosClient.get(url).then((resp) => {
            resolve(resp.data);
        }, (err) => {
            reject(err);
        })
    })
};