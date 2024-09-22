import styles from "../../styles/Checkout.module.css"

function Checkout({error, orderCallback}) {
    if (!error) orderCallback([])
    return (
        <div className={!error ? styles.successDiv : styles.failDiv}>
            <h3>{!error ? "Thank you for your purchase!"
                : error
                }</h3>
        </div>
    )
}

export default Checkout