import categoryFilter from "./helper-functions/categoryFilter"
import ShowcaseCard from "../ShowcaseCard"

function Homepage({productList=[], order, orderCallback}) {
    const productsByCategories = categoryFilter(productList)
    const categoriesList = Object.keys(productsByCategories)

    function toUpperCase(s)  {
        s = s.split(" ")
        s = s.map(word => {
            return word.charAt(0).toLocaleUpperCase() + word.slice(1)
        })
        
        return s.join(" ")
    }
    return (
        <>
            <h1>Homepage</h1>
            {categoriesList.map(category => {
                return (
                    <div key={category}>
                        <h2 data-testid="category-heading">{toUpperCase(category)}</h2>
                        <div>
                            {productsByCategories[category].map((id) => <ShowcaseCard order={order} orderCallback={orderCallback} key={id} productObj={productList[id-1]}/>)}
                        </div>
                    </div>
            )
            })}
        </>
    )
}

export default Homepage