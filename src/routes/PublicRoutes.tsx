import { Route, Routes } from "react-router-dom";
import Layout from "../containers/Layout";
import DashBoard from "../pages/DashBoard";
import CoinDetail from "../pages/CoinDetail";

export default function PublicRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<DashBoard />} />
                <Route path="/coin/:coinId" element={<CoinDetail />} />
            </Route>
        </Routes>
    );
};

