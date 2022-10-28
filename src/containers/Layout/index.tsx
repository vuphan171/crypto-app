import React, { FC } from 'react';
import { Outlet } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Layout: FC = () => {
    return (
        <div>
            <Header />
            <div className="bg-gray-200 dark:bg-gray-900 min-h-screen min-w-full pt-24 pb-10">
                <div className='container max-w-screen-xl mx-auto'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;