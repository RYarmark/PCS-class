import React, { Component } from 'react'
import ListComponent from './ListComponent';

export default class RecipeDetails extends Component {

    render() {
        const { name, ingredients, directions } = this.props.recipe;


        return (
            <>
                <h2>{name}</h2>
                <br />
                <ListComponent name="ingredients" items={ingredients} />
                <ListComponent name="directions" items={directions} />
            </>
        );
    }
}