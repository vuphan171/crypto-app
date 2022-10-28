import { FC, Fragment } from 'react';
import Table from '../containers/Table';
import Trending from '../containers/Trending';

const DashBoard: FC = () => {
    return (
        <Fragment>
            <Trending />
            <Table />
        </Fragment>
    );
};

export default DashBoard;