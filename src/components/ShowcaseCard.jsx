import { useState } from "react"
import Card from "./Card.jsx"

function ShowcaseCard({productObj, orderCallback, order}) {
    const [amount, setAmount] = useState(1)
    const addToCartBtn = { text: "Add To Cart", onClick: () => handleOrderUpdate({ productObj, productId: productObj.id, amount: amount}) }

    function handleAmountChange(newAmount) {
        if (newAmount < 1 || isNaN(+newAmount)) return
        else setAmount(Math.floor(newAmount))
    }    

    function handleOrderUpdate(obj) {
        const oldOrderElem = order.filter(order => order.productId === obj.productId)[0]
        if (oldOrderElem) {
            oldOrderElem.amount += obj.amount
            orderCallback(order)
        }
        else {
            orderCallback([...order, obj])
        } 
    }

    return (
        <Card productObj={productObj} amountCallback={handleAmountChange} amount={amount} addOnBtns={[addToCartBtn]}/>
    )
}

export default ShowcaseCard