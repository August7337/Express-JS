document.addEventListener("DOMContentLoaded", () => {
let api_url = '/api';
const addPost = document.getElementById("add-post");
const fStatus = document.getElementById("status");
const sPanel = document.getElementById("status-panel");
const pBtn = document.getElementById("panel-btn");

let showPanel = (bShow) => {
  bShow ? sPanel.style.display = "grid" : sPanel.style.display = "none";
}

addPost.onsubmit = async e => {
  console.log(addPost);
  e.preventDefault();
  const postDetails = await createPost({ 
      title: addPost.title.value, 
      url: addPost.url.value, 
      image: addPost.image.value,
      date: addPost.date.value,
      description: addPost.description.value
  });
  showPanel(true);
  if (postDetails.error) {
    fStatus.innerText = postDetails.error;
    return;
  }
  fStatus.innerHTML = `Creation success!`;
}


async function createPost(data) {
  const res = await fetch(`${api_url}/posts`, {
    method: 'POST',
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
  