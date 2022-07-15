var newUser = document.querySelector("#new-user");

newUser.addEventListener("click", createUser);

function createUser(event){
    event.preventDefault();
    document.location.replace('/newUser');
}

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-address').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
      const response = await fetch('/users/chkLogin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const result = await response.json();
        showModal(result.title,result.message);
      }
    }
    else{
      showModal('Incomplete details','Please provide username and password');
    }
  };




document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);