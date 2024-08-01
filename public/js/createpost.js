const createrecipeFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-recipe').value.trim();
    const description = document.querySelector('#description-recipe').value.trim();
    const instructions = document.querySelector('#instructions-recipe').value.trim();
    const ingredients = document.querySelector('#ingredients-recipe').value.trim();
    const foodType = document.querySelector('#foodType-recipe').value.trim();
    // const hasNuts = document.querySelector('#hasnuts-recipe').value.trim();
    // const glutenFree = document.querySelector('#gluten-recipe').value.trim();
    // const vegan = document.querySelector('#vegan-recipe').value.trim();

    if (title && description && instructions) {
      const instArray = instructions.split('.');
      const ingArray = ingredients.split('.');
      const recipeJSON = JSON.stringify({title, description, instructions : instArray, ingredients : ingArray, foodType});
      console.log(recipeJSON);
      const response = await fetch('/api/dashboard/createpost', { //MADE CHANGE HEREEEEEEEE
        method: 'POST',
        body: recipeJSON,
        // body : "{'user_id':2,'title':'Cake','description':'It is a normal cake','foodType':'dessert','instructions':'make a cake'}",
        // headers: { 'Content-Type': 'application/json' },
        headers: {'Content-Type' : 'application/json'},

      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create recipe');
      }
    }
  };

  document
  .querySelector('.createrecipe-form')
  .addEventListener('submit', createrecipeFormHandler);