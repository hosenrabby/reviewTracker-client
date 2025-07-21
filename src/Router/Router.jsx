import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Service from "../Pages/Services/Service";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import NotFound from "../Components/NotFound";
import AddServices from "../Pages/AddServices/AddServices";
import ServiceDetail from "../Pages/ServiceDetail/ServiceDetail";
import MyServices from "../Pages/MyServices/MyServices";
import MyReviews from "../Pages/MyReviews.jsx/MyReviews";
import PrivateRoute from "../Private/PrivateRoute";
import Spinner from "../Components/Spinner";


const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            { path: '/services', element: <Service /> },
            {
                path: '/service-details/:id',
                loader: ({params}) => fetch(`https://service-provider-sarver.vercel.app/service-details/${params.id}`),
                hydrateFallbackElement: <Spinner />,
                element: <PrivateRoute><ServiceDetail /></PrivateRoute>
            },
            { path: '/add-service', element: <PrivateRoute><AddServices /></PrivateRoute> },
            { path: '/my-services', element: <PrivateRoute><MyServices /></PrivateRoute> },
            { path: '/my-reviews', element: <PrivateRoute><MyReviews /></PrivateRoute> },
            { path: '/sign-up', element: <Register /> },
            { path: '/login', element: <Login /> },
            { path: "/*", element: <NotFound /> },
        ]
    }
])

export default Router