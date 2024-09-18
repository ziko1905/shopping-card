import App from "./App"
import ShoppingCart from "./components/ShoppingCart.jsx"
import ErrorPage from "./ErrorPage"

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/shopping-cart",
                element: <ShoppingCart />
            }
        ]
    }

]

export default routes