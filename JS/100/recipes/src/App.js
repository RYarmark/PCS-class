import { useState } from 'react';
import './App.css';
import RecipeDetails from './RecipeDetails';
import ListComponent from './ListComponent';

export default function App() {
  const [state, setState] = useState({
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
  })


  state.selectRecipe = selectedRecipe => {
    setState({
      ...state,
      selectedRecipe: selectedRecipe
    });
  }

  const recipes = state.recipes.map(r => <li key={r.id}>{r.name}</li>);

  return (
    <div className="container text-center">
      <h1>PCS Recipes</h1>
      <div>
        <ListComponent items={recipes}
          selectRecipe={state.selectRecipe} />
      </div>
      <hr />
      <RecipeDetails recipe={state.recipes[state.selectedRecipe]} />

    </div>
  );

}

