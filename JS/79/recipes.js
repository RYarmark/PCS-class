(function () {
    'use strict';

    $('body').append('<div id="header"><div>');
    $('body').append('<div id="name"><div>');
    $('body').append('<div id="pic"><div>');
    $('body').append('<div id="ing"><div>');

    const header = $('#header');
    const name = $('#name');
    const pic = $('#pic');
    const ingDiv = $('#ing');

    $('div').css('text-align', 'center');
    header.css('margin', '2em');
    name.css('font-weight', 'bold');
    name.css('font-size', 'large');
    name.css('margin', '1em');
    ingDiv.css('margin', '1em');
    $('img').css('width', '80%');

    async function getRecipeList() {

        const response = await fetch('recipesList.json');
        const recipes = await response.json();
        recipes.forEach(recipe => {
            header.append('<form id=form></form>');
            $('#form').append(`<label class = "name" id = ${recipe.name}>${recipe.name}</label>`);
            $('#form').append(`<input class = "checkbox" id = ${recipe.name} value = ${recipe.link} type = "radio" name = "recipe"></input`);
        });

        $('label').css('margin', '3px');
        $('.checkbox').change(() => loadRecipe($('input[name=recipe]:checked', '#form').val()));

    }
    async function loadRecipe(recipe) {
        name.empty();
        pic.empty();
        ingDiv.empty();
        const response = await fetch(`${recipe}`);
        const myRecipe = await response.json();
        name.text(myRecipe[0].name);
        pic.append(`<image src = ${myRecipe[0].pic}></image>`);
        myRecipe[0].ing.forEach(ing =>
            ingDiv.append(`${ing}\n`));
    }
    getRecipeList();


})();