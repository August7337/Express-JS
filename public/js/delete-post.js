const deleteForms = document.querySelectorAll("#delete-form");
let api_url = '/api';

deleteForms.forEach(function (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const input = form.querySelector("input[name='productId']");
        const postDetails = await deletePost({
            id: input.value
        });
        if (postDetails.error) {
            console.log(postDetails.error);
            return;
        } else {
            location.reload();
        }
    });
});

async function deletePost(data) {
    const res = await fetch(`${api_url}/posts`, {
      method: 'DELETE',
      credentials:'include',
      cache:'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await res.json();
}

