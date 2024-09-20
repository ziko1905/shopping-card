function Card({productObj, amountCallback, amount=0, addOnBtns=[]}) {
    const title = productObj.title
    const src = productObj.image
    const buttons = [
        { text: "+", "aria-label": "Increment amount by one", onClick: () => amountCallback(amount + 1)},
        { text: "-", "aria-label": "Decrement amount by one", onClick: () => amountCallback(amount - 1)}
    ];
    addOnBtns.forEach(btn => buttons.push(btn))

    return (<div data-testid="product-card">
                <h3>{title}</h3>
                <img alt={`Image of ${title}`} src={src}></img>
                {buttons.map((btn, i) => {
                    const props = {...btn}
                    delete props.text
                    return <button {...props} key={i}>{btn.text}</button>
                })}
                <input onChange={(e) => amountCallback(e.target.value)} value={amount} aria-label="Input for changing amount with current amount" type="text" />
            </div>)
}

export default Card