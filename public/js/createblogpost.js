const createblogpostFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-blogpost').value.trim();
    const description = document.querySelector('#description-blogpost').value.trim();
   
    if (title && description) {
      const recipeJSON = JSON.stringify({title, description});
      console.log(recipeJSON);
      const response = await fetch('/api/blogpost/createblogpost', { 
        method: 'POST',
        body: recipeJSON,
        headers: {'Content-Type' : 'application/json'},

      });
  
      if (response.ok) {
        document.location.replace('/api/users');
      } else {
        alert('Failed to create blogpost');
      }
    }
  };

  document
  .querySelector('.createblogpost-form')
  .addEventListener('submit', createblogpostFormHandler);