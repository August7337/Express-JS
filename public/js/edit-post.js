document.addEventListener("DOMContentLoaded", () => {
    let api_url = '/api';
    const editPost = document.getElementById("edit-post");
    const fStatus = document.getElementById("status");
    const sPanel = document.getElementById("status-panel");
    const pBtn = document.getElementById("panel-btn");
    
    let showPanel = (bShow) => {
      bShow ? sPanel.style.display = "grid" : sPanel.style.display = "none";
    }

    pBtn.onclick = () => {
        showPanel(false);
    }
    
    editPost.onsubmit = async e => {
      e.preventDefault();
      const postDetails = await editPostAPI({ 
          id: editPost.id.value,
          title: editPost.title.value, 
          url: editPost.url.value, 
          image: editPost.image.value,
          date: editPost.date.value,
          description: editPost.description.value,
          add_HTML: editPost.add_HTML.value
      });
      showPanel(true);
      if (postDetails.error) {
        fStatus.innerText = postDetails.error;
        return;
      }
      fStatus.innerHTML = `Edit success!`;
    }
    
    
    async function editPostAPI(data) {
      const res = await fetch(`${api_url}/posts`, {
        method: 'PATCH',
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
      