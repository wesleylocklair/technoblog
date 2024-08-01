const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (email && password && username) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ 'name': username, 'email': email, 'password': password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/api/recipes');
        alert('Successfully Logged In!')
      } else {
        alert('Failed to log in');
      }
    }
    else {
      alert('Please fill out the login information.');
    }
};
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({ 'name': username, 'email' : email, 'password': password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/api/users/login');
        alert('Account Created Successfully. Please Sign in!')
      } else {
        alert('Failed to sign up.');
      }
    }
  };


  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

    document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  