const createPost = async (event) => {
  event.preventDefault();

  var title = document.querySelector('#post-title').value;
  var content = document.querySelector('#post-content').value;

  if (title && content) {
    const response = await fetch('/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      showModal(
        'Error',
        'Error creating post, please check your details and try again.'
      );
      return;
    }
    location.replace('/');
  } else {
    showModal(
      'Incomplete details',
      'Please complete the post data and press Create button.'
    );
  }
};

document
  .querySelector('.create-post-form')
  .addEventListener('submit', createPost);
