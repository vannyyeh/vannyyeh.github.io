// password-protect.js

// Set your desired password
const correctPassword = '2024';

// Prompt the user for the password
const userPassword = prompt('Please enter the password:');

// Check if the entered password is correct
if (userPassword !== correctPassword) {
  alert('Incorrect password. Access denied.');
  // Redirect to another page or do something else if access is denied
  window.location.href = 'https://example.com';
}
