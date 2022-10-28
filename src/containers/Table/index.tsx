import { FC, useContext, useEffect, useState } from 'react';
// context
import { AppContext } from '../../App';
// config
import { languages } from '../../config';
// interfaces
import ICoin from '../../interfaces/Coin';
import ITableHeadCell from '../../interfaces/TableHeadCell';
// services
import { getCoinsApi } from '../../services/CoinService';
// utils
import { range } from '../../utils';
// components
import NoResults from './components/NoResults';
import Row from './components/Row';
import RowSkeletion from './components/RowSkeleton';
import SearchInput from './components/SearchInput';
import TableHead from './components/TableHead';
import Pagination from '../../components/Pagination';
// scss
import "./main.scss";

interface ITableState {
    coins: ICoin[];
    page: number;
    total: number;
    order: "asc" | "desc";
    orderBy: string;
    keyword: string;
};

const limit: number = 50;

const Table: FC = () => {

    const [data, setData] = useState<ITableState>({
        coins: [],
        page: 1,
        total: 0,
        order: 'desc',
        orderBy: 'marketCap',
        keyword: ''
    });

    const [loading, setLoading] = useState<boolean>(false);

    const { languageCode } = useContext(AppContext);

    const TABLE_HEAD: ITableHeadCell[] = [
        { id: 'rank', label: '#', allowSort: false, allowScroll: false },
        { id: 'name', label: languages[languageCode].tableCoins.name, allowSort: false, allowScroll: false },
        { id: 'price', label: languages[languageCode].tableCoins.price, allowSort: true, allowScroll: true },
        { id: 'change', label: languages[languageCode].tableCoins.change, allowSort: true, allowScroll: true },
        { id: '24hVolume', label: languages[languageCode].tableCoins.volumn, allowSort: true, allowScroll: true },
        { id: 'marketCap', label: languages[languageCode].tableCoins.cap, allowSort: true, allowScroll: true },
        { id: 'chart', label: languages[languageCode].tableCoins.chart, allowSort: false, allowScroll: true },
    ];

    useEffect(() => {
        setLoading(true);
        getCoinsApi(data.page, limit, data.orderBy, data.order, data.keyword).then(resp => {
            let { data, page, total } = resp;
            setData(preState => ({
                ...preState,
                coins: data,
                page: page,
                total: total
            }));
            setLoading(false);
        }, () => {
            setLoading(false);
        })
    }, [data.page, data.order, data.orderBy, data.keyword]);


    const handleChangePage = (page: number) => {
        setData(preState => ({
            ...preState,
            page: page
        }));
    }

    const handleRequestSort = (id: string, direction: "asc" | "desc") => {
        let { orderBy } = data;
        const isAsc = orderBy === id && direction === 'asc';
        setData(preState => ({
            ...preState,
            page: 1,
            order: isAsc ? 'desc' : 'asc',
            orderBy: id,
        }));
    };

    const handleChangeKeyword = (value: string) => {
        setData(preState => ({
            ...preState,
            page: 1,
            keyword: value
        }));
    }

    const handleReset = () => {
        setData(preState => ({
            ...preState,
            page: 1,
            keyword: ''
        }));
    }

    return (
        <div className='p-4 sm:p-5'>
            <div className='shadow-lg bg-gray-50 dark:bg-gray-800 rounded-md py-7'>
                <div className="flex justify-start px-7 pb-5">
                    <SearchInput value={data.keyword} onSearch={handleChangeKeyword} onReset={handleReset} />
                </div>
                <div className='block overflow-x-scroll md:overflow-x-auto'>
                    <table id="coins" className='border-collapse w-full'>
                        <TableHead onRequestSort={handleRequestSort} order={data.order} headCells={TABLE_HEAD} orderBy={data.orderBy} />
                        <tbody>
                            {loading ? range(1, 10).map((_, index) => {
                                return <RowSkeletion key={index} />
                            }) : data && data.coins.length ? data.coins.map((coin: ICoin) => {
                                return <Row key={coin.uuid} coin={coin} />
                            }) : null
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center">
                    {!loading && data && data.coins && !data.coins.length ? <NoResults onReset={handleReset} keyword={data.keyword} /> : null}
                </div>
            </div>
            <div className='flex justify-center md:justify-end py-4 overflow-hidden'>
                {data && data.total > limit && <Pagination
                    count={Math.ceil(data.total / limit)}
                    page={data.page}
                    onChange={handleChangePage}
                />
                }
            </div>
        </div>
    );
};

export default Table;