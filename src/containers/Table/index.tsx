import { Pagination } from 'antd';
import 'antd/dist/antd.min.css';
import { FC, useEffect, useState, useContext } from 'react';
import ICoin from '../../interfaces/Coin';
import IPagination from '../../interfaces/Pagination';
import { getCoinsApi } from '../../services/CoinService';
import Row from './components/Row';
import RowSkeletion from './components/RowSkeleton';
import "./main.scss";
import { languages } from '../../config';
import { AppContext } from '../../App';

const Table: FC = () => {

    const [data, setData] = useState<IPagination<ICoin>>({
        data: [],
        limit: 50,
        page: 1,
        total: 0,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const { languageCode } = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        getCoinsApi(data.page, data.limit).then(resp => {
            setData(resp);
            setLoading(false);
        }, () => {
            setLoading(false);
        })
    }, [data.limit, data.page])

    const handleChangePage = (page: number) => {
        setData({
            ...data,
            page: page
        });
    }

    return (
        <div className='container max-w-screen-xl mx-auto shadow-lg bg-gray-50 dark:bg-gray-800'>
            <div className='flex justify-center items-center'>
                <table id="coins" className='border-collapse'>
                    <thead>
                        <tr>
                            <th className='text-left dark:text-white'>#</th>
                            <th className='text-left dark:text-white'>{languages[languageCode].tableCoins.name}</th>
                            <th className='text-left dark:text-white'>{languages[languageCode].tableCoins.price}</th>
                            <th className='text-left dark:text-white'>{languages[languageCode].tableCoins.change}</th>
                            <th className='text-left dark:text-white'>{languages[languageCode].tableCoins.volumn}</th>
                            <th className='text-left dark:text-white'>{languages[languageCode].tableCoins.cap}</th>
                            <th className='text-left dark:text-white'>{languages[languageCode].tableCoins.chart}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? Array.from(Array(10).keys()).map((_, index) => {
                            return <RowSkeletion key={index} />
                        }) : data ? data.data.map((coin: ICoin) => {
                            return <Row key={coin.uuid} coin={coin} />
                        }) : null
                        }

                    </tbody>
                </table>

            </div>
            <div className='flex justify-end p-4'>
                {data && data.total > data.limit && <Pagination
                    onChange={handleChangePage}
                    total={data.total}
                    pageSize={data.limit}
                    current={data.page}
                    showSizeChanger={false}
                />
                }
            </div>
        </div>
    );
};

export default Table;