let api_url = '/api';
const formUser = document.getElementById("form-user");
const fStatus = document.getElementById("status");
const sPanel = document.getElementById("status-panel");
const pBtn = document.getElementById("panel-btn");
const deleteForm = document.getElementById("delete-user");
var allInputs = document.querySelectorAll('input');

let showPanel = (bShow) => {
  bShow ? sPanel.style.display = "grid" : sPanel.style.display = "none";
}

pBtn.onclick = () => {
  showPanel(false);
}

async function fetchUsers() {
  const res = await fetch(`${api_url}/users`);
  return await res.json();
}

async function user() {
  const elUserList = document.getElementById("users-table");
  elUserList.innerHTML = ""
  const users = await fetchUsers();
  console.log(users);
  if (users.error) {
    elUserList.innerHTML = error;
    return;
  }
  users.forEach(({ user_name, user_email }) => {
    elUserList.innerHTML += `
      <tr class="hover">
          <td>${user_name}</td>
          <td>${user_email}</td>
      </tr>
    `;
  });
}

user();

formUser.onsubmit = async e => {
  console.log(formUser);
  e.preventDefault();
  const loginDetails = await createUser({ 
    email: formUser.email.value, 
    password: formUser.password.value, 
    name: formUser.name.value
  });
  showPanel(true);
  if (loginDetails.error) {
    fStatus.innerText = loginDetails.error;
    return;
  }
  user();
  fStatus.innerHTML = `Creation success!`;
  allInputs.forEach(singleInput => singleInput.value = '');
}

async function createUser(data) {
  if (data.name) {
    if (data.email) {
      if (data.password) {
        const res = await fetch(`${api_url}/users`, {
          method: 'POST',
          credentials:'include',
          cache:'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return await res.json();
      } else {
        fStatus.innerHTML = 'Please enter a password.';
      }
    } else {
      fStatus.innerHTML = 'Please enter a email';
    }
  } else {
    fStatus.innerHTML = 'Please enter a name';
  }
}

deleteForm.onsubmit = async e => {
  console.log(deleteForm.email.value);
  e.preventDefault();
  const del = await deleteUserForm({email : deleteForm.email.value});
  showPanel(true);
  if (del.error) {
    fStatus.innerText = del.error;
    return;
  }
  user();
  fStatus.innerHTML = `Deletion successful!`;
  allInputs.forEach(singleInput => {if (singleInput.type === 'text') {singleInput.value = '';}});
}

async function deleteUserForm(data) {
  const res = await fetch(`${api_url}/users`, {
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

