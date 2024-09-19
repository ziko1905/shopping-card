import { useState } from "react"
import Card from "./Card.jsx"

function ShowcaseCard(props) {
    const [amount, setAmount] = useState(0)
    const addToCartBtn = { text: "Add To Cart" }

    function handleAmountChange(newAmount) {
        if (newAmount < 0 || isNaN(+newAmount)) return
        else setAmount(Math.floor(newAmount))
    }    

    return (
        <Card {...props} amountCallback={handleAmountChange} amount={amount} addOnBtns={[addToCartBtn]}/>
    )
}

export default ShowcaseCard