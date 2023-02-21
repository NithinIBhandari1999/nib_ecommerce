import {
    Route,
    Routes
} from "react-router-dom";

import ProductSearchPage from '../pages/pSearch/ProductSearchPage';
import UserCart from '../pages/pCart/UserCart';

const CustomRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<ProductSearchPage />}
            />
            <Route
                path="/search"
                element={<ProductSearchPage />}
            />
            <Route
                path="/cart"
                element={<UserCart />}
            />
        </Routes>
    )
};

export default CustomRouter;