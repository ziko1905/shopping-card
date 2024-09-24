import Card from "./Card";
import styles from "../styles/ShoppingCard.module.css"

function ShoppingCard({productObj, orderCallback, amount, order=[]}) {
    const removalBtn = {text: "Remove", className: styles["remove-btn"], onClick: handleRemoval}

    function handleOrderUpdate(newAmount) {
        if (newAmount > 0) {
            order.forEach(obj => {
            if (obj.productId === productObj.id) obj.amount = +newAmount
        })}
        orderCallback([...order])
    }

    function handleRemoval() {
        orderCallback(
            order.filter(obj => obj.productId !== productObj.id)
        )
    }

    return (
        <div className={styles.card}>
            <Card productObj={productObj} amount={amount} amountCallback={handleOrderUpdate} addOnBtns={[removalBtn]}/>
        </div>
    )
}

export default ShoppingCard