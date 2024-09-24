import { useEffect, useState } from "react"
import styles from "../../styles/Checkout.module.css"

function Checkout({error, orderCallback}) {
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        if (!error) orderCallback([])
        else setErrorMsg(error)
    }, [])
    return (
        <div className={!errorMsg ? styles.successDiv : styles.failDiv}>
            <h3>{!errorMsg ? "Thank you for your purchase!"
                : errorMsg
                }</h3>
        </div>
    )
}

export default Checkout