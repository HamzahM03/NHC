// function toggleMenu(){
//   const menu = document.getElementById("hamburger-icon")
//   const links = document.getElementById("hamburger-links");
//   menu.classList.toggle("open");
//   links.classList.toggle("open");
// }

function toggleEyeIcon(){
  const togglePassword = document.querySelector(".toggle-password-eye");
  const password = document.getElementById("password");
  let type = password.getAttribute('type');
  if (type==="password"){
    type="text";
    togglePassword.setAttribute('src', '/images/eyelash.png')
  }
  else{
    type="password";
    togglePassword.setAttribute('src', '/images/eye.png')
  }
  password.setAttribute('type', type);

  }

  // function validateEmail() {
  //   const email = document.getElementById("email").value;
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email regex
  //   const errorMessage = document.getElementById("error-message");
  
  //   if (!regex.test(email)) {
  //     errorMessage.style.display = 'inline';
  //     return false; // Prevent form submission
  //   }
  
  //   errorMessage.style.display = 'none';
  //   return true; // Allow form submission
  // }