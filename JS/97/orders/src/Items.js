
export default function Items(props) {
    const { items } = props;


    return (
        <div>
            <h4>Items:</h4>
            {display(items)}
            <span></span>
        </div>
    )
}


function display(items) {
    if (items.length > 0) {

        const item = items.map((i =>
            <ul key={i}>
                <li>Item: {i.name}</li>
                <li>quantity: {i.quantity}</li>
                <li>price: ${(i.total / i.quantity).toFixed(2)}</li>
            </ul>))
        return item;
    }
    else {
        return <li> No Items</li>;
    }
}