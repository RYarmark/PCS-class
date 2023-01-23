import { Component } from "react"

export default class ListComponent extends Component {

    selectRecipe = i => {
        this.props.selectedRecipe(i)
    }
    render() {
        const lineItems = this.props.items.map((i, id) => <li key={i} onClick={
            () => this.props.selectRecipe(id)}>{i}</li>);
        return (
            <>
                <h4>{this.props.name}</h4>
                <ul className="bulletless">
                    {lineItems}
                </ul>
            </>
        )
    }
}