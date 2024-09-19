import { useState } from "react"
import Card from "./Card.jsx"

function ShowcaseCard(props) {
    const [amount, setAmount] = useState(1)
    const addToCartBtn = { text: "Add To Cart", onClick: () => handleOrderUpdate({ productId: props.productId, amount: amount}) }

    function handleAmountChange(newAmount) {
        if (newAmount < 1 || isNaN(+newAmount)) return
        else setAmount(Math.floor(newAmount))
    }    

    function handleOrderUpdate(obj) {
        const oldOrderElem = props.order.filter(order => order.productId === obj.productId)[0]
        if (oldOrderElem) {
            oldOrderElem.amount += obj.amount
            props.orderCallback(props.order)
        }
        else {
            props.orderCallback([...props.order, obj])
        } 
    }

    return (
        <Card {...props} amountCallback={handleAmountChange} amount={amount} addOnBtns={[addToCartBtn]}/>
    )
}

export default ShowcaseCard