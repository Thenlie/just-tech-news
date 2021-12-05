async function deleteFormHandler(evt) {
    evt.preventDefault();
    const id =  window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);