document.addEventListener("DOMContentLoaded", () => {
const deleteForms = document.querySelectorAll("#delete-form");
let api_url = '/api';
const fStatus = document.getElementById("status");
const sPanel = document.getElementById("status-panel");
const pBtn = document.getElementById("panel-btn");

let showPanel = (bShow) => {
  bShow ? sPanel.style.display = "grid" : sPanel.style.display = "none";
}

pBtn.onclick = () => {
    showPanel(false);
  }

deleteForms.forEach(function (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const input = form.querySelector("input[name='productId']");
        const postDetails = await deletePost({
            id: input.value
        });
        showPanel(true);
        if (postDetails.error) {
            fStatus.innerText = postDetails.error;
            return;
        } else {
            location.reload();
            fStatus.innerText = 'Delete success!';
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
});
