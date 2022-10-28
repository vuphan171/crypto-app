import { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import Pagination from '../../components/Pagination';
import { languages } from '../../config';
import ICoin from '../../interfaces/Coin';
import ITableHeadCell from '../../interfaces/TableHeadCell';
import { getCoinsApi } from '../../services/CoinService';
import NoResults from './components/NoResults';
import Row from './components/Row';
import RowSkeletion from './components/RowSkeleton';
import SearchInput from './components/SearchInput';
import TableHead from './components/TableHead';
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
        { id: 'rank', label: '#', allowSort: false },
        { id: 'name', label: languages[languageCode].tableCoins.name, allowSort: false },
        { id: 'price', label: languages[languageCode].tableCoins.price, allowSort: true },
        { id: 'change', label: languages[languageCode].tableCoins.change, allowSort: true },
        { id: '24hVolume', label: languages[languageCode].tableCoins.volumn, allowSort: true },
        { id: 'marketCap', label: languages[languageCode].tableCoins.cap, allowSort: true },
        { id: 'chart', label: languages[languageCode].tableCoins.chart, allowSort: false },
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
        <div className='container max-w-screen-xl mx-auto shadow-lg bg-gray-50 dark:bg-gray-800 rounded-md py-5'>
            <div className="flex justify-start px-7 py-5">
                <SearchInput value={data.keyword} onSearch={handleChangeKeyword} onReset={handleReset}/>
            </div>
            <div className='flex justify-center items-center'>
                <table id="coins" className='border-collapse w-full'>
                    <TableHead onRequestSort={handleRequestSort} order={data.order} headCells={TABLE_HEAD} orderBy={data.orderBy} />
                    <tbody>
                        {loading ? Array.from(Array(10).keys()).map((_, index) => {
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
            <div className='flex justify-end p-4'>
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


// import { FC, useEffect, useState, useContext } from 'react';
// import ICoin from '../../interfaces/Coin';
// import IPagination from '../../interfaces/Pagination';
// import { getCoinsApi } from '../../services/CoinService';
// import Row from './components/Row';
// import RowSkeletion from './components/RowSkeleton';
// import "./main.scss";
// import { languages } from '../../config';
// import { AppContext } from '../../App';
// import Pagination from '../../components/Pagination';
// import TableHead from './components/TableHead';
// import { ITableHeadCell } from '../../interfaces/TableHeadCell';
// import SearchInput from './components/SearchInput';
// import NoResults from './components/NoResults';


// const Table: FC = () => {

//     const [data, setData] = useState<IPagination<ICoin>>({
//         data: [],
//         limit: 50,
//         page: 1,
//         total: 0,
//     });

//     const [loading, setLoading] = useState<boolean>(false);

//     const [order, setOrder] = useState<"asc" | "desc">('desc');
//     const [orderBy, setOrderBy] = useState<string>('marketCap');
//     const [keyword, setKeyword] = useState<string>('');

//     const { languageCode } = useContext(AppContext);

//     const TABLE_HEAD: ITableHeadCell[] = [
//         { id: 'rank', label: '#', allowSort: false },
//         { id: 'name', label: languages[languageCode].tableCoins.name, allowSort: false },
//         { id: 'price', label: languages[languageCode].tableCoins.price, allowSort: true },
//         { id: 'change', label: languages[languageCode].tableCoins.change, allowSort: true },
//         { id: '24hVolume', label: languages[languageCode].tableCoins.volumn, allowSort: true },
//         { id: 'marketCap', label: languages[languageCode].tableCoins.cap, allowSort: true },
//         { id: 'chart', label: languages[languageCode].tableCoins.chart, allowSort: false },
//     ];

//     useEffect(() => {
//         setLoading(true);
//         getCoinsApi(data.page, data.limit, orderBy, order, keyword).then(resp => {
//             setData(resp);
//             setLoading(false);
//         }, () => {
//             setLoading(false);
//         })
//     }, [data.limit, data.page, orderBy, order, keyword]);


//     const handleChangePage = (page: number) => {
//         setData(preState => ({
//             ...preState,
//             page: page
//         }))
//     }

//     const handleRequestSort = (id: string, direction: "asc" | "desc") => {
//         const isAsc = orderBy === id && direction === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(id);
//         setData(preState => ({
//             ...preState,
//             page: 1
//         }))
//     };

//     const handleChangeKeyword = (value: string) => {
//         setData(preState => ({
//             ...preState,
//             page: 1
//         }))
//         setKeyword(value);
//     }

//     const handleReset = () => {
//         setData(preState => ({
//             ...preState,
//             page: 1
//         }))
//         setKeyword('');
//     }

//     return (
//         <div className='container max-w-screen-xl mx-auto shadow-lg bg-gray-50 dark:bg-gray-800 rounded-md py-5'>
//             <div className="flex justify-start px-7 py-5">
//                 <SearchInput value={keyword} onSearch={handleChangeKeyword} onReset={handleReset} />
//             </div>
//             <div className='flex justify-center items-center'>
//                 <table id="coins" className='border-collapse w-full'>
//                     <TableHead onRequestSort={handleRequestSort} order={order} headCells={TABLE_HEAD} orderBy={orderBy} />
//                     <tbody>
//                         {loading ? Array.from(Array(10).keys()).map((_, index) => {
//                             return <RowSkeletion key={index} />
//                         }) : data && data.data.length ? data.data.map((coin: ICoin) => {
//                             return <Row key={coin.uuid} coin={coin} />
//                         }) : null
//                         }
//                     </tbody>
//                 </table>
//             </div>
//             <div className="flex justify-center items-center">
//                 {!loading && data && data.data && !data.data.length ? <NoResults onReset={handleReset} keyword={keyword} /> : null}
//             </div>
//             <div className='flex justify-end p-4'>
//                 {data && data.total > data.limit && <Pagination
//                     count={Math.ceil(data.total / data.limit)}
//                     page={data.page}
//                     onChange={handleChangePage}
//                 />
//                 }
//             </div>
//         </div>
//     );
// };

// export default Table;