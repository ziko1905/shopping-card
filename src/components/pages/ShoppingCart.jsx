import { useNavigate } from "react-router-dom"
import ShoppingCard from "../ShoppingCard.jsx"


function ShoppingCart({order, orderCallback}) {
    const navigate = useNavigate()

    function prettyPrice(inputPrice) {
        let priceStr = new String(inputPrice)

        if (!priceStr.includes(".")) priceStr += "."
        while (priceStr.length < 4 || priceStr.charAt(priceStr.length - 3) !== ".") priceStr += "0"

        return priceStr
    }

    function calculatePrice() {
        let price = 0
        order.forEach(ord => price += +ord.productObj.price * ord.amount)

        return prettyPrice(price)
    }

    function handleCheckout() {
        const props = ["/thank-you-page"]
        if (!order.length) props.push({state: {error: "Empty order"}})

        navigate(...props)
    }

    return (
        <>
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
        </>
    )
}

export default ShoppingCart