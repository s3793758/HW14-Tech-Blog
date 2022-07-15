const createPost = async (event) => {
  event.preventDefault();
  var comment = document.querySelector('#comment-content').value;

  if (comment) {
    const response = await fetch('/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      showModal(
        'Error',
        'Error creating comment, please check your details and try again.'
      );
      return;
    }
    location.replace('/post/' + postId);
  } else {
    showModal(
      'Incomplete details',
      'Please complete the comment data and press Create button.'
    );
  }
};

const postId = document.querySelector('#post-id').value;
document
  .querySelector('.create-comment-form')
  .addEventListener('submit', createPost);
