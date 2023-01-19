import { Component } from 'react';
import './App.css';
import RecipeDetails from './RecipeDetails';
import ListComponent from './ListComponent';

class App extends Component {
  state = {
    recipes: [
      {
        id: 1,
        name: 'hot dog',
        ingredients: ['hot dog', 'bun', 'ketchup', 'mustard'],
        directions: ['grill hot dog', 'put in bun', 'add desired condiments'],
      },
      {
        id: 2,
        name: 'burger',
        ingredients: ['burger', 'bun', 'ketchup', 'mustard'],
        directions: ['grill burger', 'put in bun', 'add desired condiments'],
      }
    ],
    selectedRecipe: 0
  }


  selectRecipe = selectedRecipe => {
    this.setState({
      selectedRecipe: selectedRecipe
    });
  }

  render() {
    const recipes = this.state.recipes.map(r => <li key={r.id}>{r.name}</li>);

    return (
      <div className="container text-center">
        <h1>PCS Recipes</h1>
        <div>
          <ListComponent items={recipes} selectRecipe={this.selectRecipe} />
        </div>
        <hr />
        <RecipeDetails recipe={this.state.recipes[this.state.selectedRecipe]} />

      </div>
    );
  }
}

export default App;