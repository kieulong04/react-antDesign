import DashboardPage from "@/page/dashboard";
import LayoutPage from "@/page/layout";
import ProductAddPage from "@/page/product/add/page";
import ProductEditPage from "@/page/product/edit/page";
import LoginPage from "@/page/product/login/page";
import ProductPage from "@/page/product/page";
import RegisterPage from "@/page/product/register/page";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return <div>
     <Routes>
        <Route path="admin" element={<LayoutPage />}>
            <Route index element={<DashboardPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/add" element={<ProductAddPage />} />
            <Route path="product/:id/edit" element={<ProductEditPage />} />
            <Route path="signin" element={<LoginPage />} />
            <Route path="signup" element={<RegisterPage />} />
        </Route>
    </Routes>;

    </div>
};
export default Router;
