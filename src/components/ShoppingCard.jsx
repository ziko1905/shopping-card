import Card from "./Card";


function ShoppingCard({productObj, orderCallback, amount, order=[]}) {
    const removalBtn = {text: "Remove", className: "remove-btn", onClick: handleRemoval}

    function handleOrderUpdate(newAmount) {
        if (newAmount > 0) {
            order.forEach(obj => {
            if (obj.productId === productObj.id) obj.amount = +newAmount
        })}
        orderCallback(order)
    }

    function handleRemoval() {
        orderCallback(
            order.filter(obj => obj.productId !== productObj.id)
        )
    }

    return (
        <Card productObj={productObj} amount={amount} amountCallback={handleOrderUpdate} addOnBtns={[removalBtn]}/>
    )
}

export default ShoppingCard