document.getElementById('post-form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const fieldName = document.querySelector('.name-input').value;

    fetch(`http://localhost:3001/user/${fieldName}`)
      .then(resolve => resolve.json()).then(data => console.log(data))
  })