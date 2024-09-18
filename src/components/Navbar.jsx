import { Link } from "react-router-dom"
import styles from "../styles/Navbar.module.css"
import cartSrc from "../assets/cart-outline.svg"

function Navbar({itemsNum}) {
    return (
        <div className={styles.navbar}>
            <Link to="/">Homepage</Link>
            <ShoppingCartIcon itemsNum={itemsNum}/>
        </div>
    )
}

function ShoppingCartIcon({itemsNum=0}) {
    return (
        <Link to="/shopping-cart" className={styles["cart-div"]}>
            <img className={styles.cart} src={cartSrc} alt="Shopping cart displaying amount of items in cart" />
            {!!itemsNum && <div className={styles["product-num"]} aria-label="Number of items in cart">
                <span>
                    {itemsNum < 10 
                    ? itemsNum
                    : "+9"}
                </span>
            </div>}
        </Link>
    )
}

export default Navbar