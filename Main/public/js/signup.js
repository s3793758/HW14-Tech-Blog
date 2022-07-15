const doCheck = async (event) => {
  event.preventDefault();

  var fullname = document.querySelector('#fullname').value;
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;
  var confirmPassword = document.querySelector('#confirm-password').value;

  if (password != confirmPassword) {
    showModal(
      'Password Error',
      'Password does not match, make sure you enter both the password same (min length 8 characters).'
    );
    return;
  }

  if (fullname && email) {
    const response = await fetch('/users/newUser', {
      method: 'POST',
      body: JSON.stringify({ fullname, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      showModal(
        'Error',
        'Error signing up, please check your details and try again.'
      );
      return;
    }
    location.replace('/dashboard');
  } else {
    showModal(
      'Incomplete details',
      'Please complete the form data and press Create Account button.'
    );
  }
};

document.querySelector('.signup-form').addEventListener('submit', doCheck);
