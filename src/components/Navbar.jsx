import { Link } from "react-router-dom"


function Navbar() {
    return (
        <div>
            <Link to="/">Homepage</Link>
            <ShoppingCartIcon />
        </div>
    )
}

function ShoppingCartIcon({itemsNum}) {
    return (
        <Link to="/shopping-cart">
            <img src="" alt="Shopping cart displaying amount of items in cart" />
            <img src="" alt="Number of items in cart" />
        </Link>
    )
}

export default Navbar