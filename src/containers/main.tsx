import { FC } from 'react';
import Header from '../components/Header';
import Table from './Table';
import Trending from './Trending';


const Main: FC = () => {

    return (
        <div>
            <Header />
            <div className="bg-gray-200 dark:bg-gray-900 min-h-screen min-w-full pt-24 pb-24">
                <Trending />
                <Table />
            </div>
        </div>
    );
};

export default Main;