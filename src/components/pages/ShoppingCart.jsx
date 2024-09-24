import { useNavigate } from "react-router-dom"
import ShoppingCard from "../ShoppingCard.jsx"
import prettyPrice from "../helper-functions/prettyPrice.js"

function ShoppingCart({order, orderCallback}) {
    const navigate = useNavigate()

    function calculatePrice() {
        let price = 0
        order.forEach(ord => price += +ord.productObj.price * ord.amount)

        return prettyPrice(price)
    }

    function handleCheckout() {
        const props = ["/checkout"]

        navigate(...props)
    }

    return (
        <div className="content">
            <h1>Shopping Cart</h1>
            <div>
                {!!order.length && order.map(card => {
                    return <ShoppingCard orderCallback={orderCallback} key={card.productObj.id} amount={card.amount} productObj={card.productObj} order={order} />
                })}
                {!order.length && <h3>Shopping cart is empty</h3>}
            </div>
            <div>
                <p aria-label="Order price">Price: {calculatePrice()}$</p>
            </div>
            <button onClick={handleCheckout}>Proceed To Checkout</button>
        </div>
    )
}

export default ShoppingCart