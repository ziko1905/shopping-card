function Card({title, src, amountCallback, amount=0, addOnBtns=[]}) {
    const buttons = [{ text: "+"}, { text: "-"}];
    addOnBtns.forEach(btn => buttons.push(btn))
    if (amountCallback) {
        buttons[0].onClick = () => amountCallback(amount + 1)
        buttons[1].onClick = () => amountCallback(amount - 1)
    }

    return (<div data-testid="product-card">
                <h3>{title}</h3>
                <img alt={`Image of ${title}`} src={src}></img>
                {buttons.map((btn, i) => {
                    const props = {...btn}
                    delete props.text
                    return <button {...props} key={i}>{btn.text}</button>
                })}
                <input onChange={(e) => amountCallback(+e.target.value)} value={amount} aria-label="Input for changing amount with current amount" type="text" />
            </div>)
}

export default Card