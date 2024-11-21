$(document).ready(function () {
    // Retrieve stored users data from local storage
    let users = JSON.parse(localStorage.getItem('users')) || {};

    // Toggle to Login Form
    $('#goToLogin').click(function () {
      $('#registration').hide();
      $('#login').show();
    });
  
    // Toggle to Registration Form
    $('#goToRegister').click(function () {
      $('#login').hide();
      $('#registration').show();
    });
  
    // Register a User
    $('#registerButton').click(function () {
      const username = $('#regUsername').val();
      const password = $('#regPassword').val();
  
      if (!username || !password) {
        alert('Please fill in all fields!');
        return;
      }
  
      if (users[username]) {
        alert('Username already exists!');
      } else {
        users[username] = password;
        alert('Registration successful! You can now log in.');

        // Save the updated users object to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        $('#registerForm')[0].reset();
        $('#registration').hide();
        $('#login').show();
      }
    });
  
    // Login
    $('#loginButton').click(function () {
      const username = $('#loginUsername').val();
      const password = $('#loginPassword').val();
  
      if (users[username] && users[username] === password) {
        alert('Login successful!');
        // when succeed navigate to product page
        window.location.href = "http://127.0.0.1:5500/product.html";
      } else {
        alert('Invalid username or password!');
      }
    });
  });
