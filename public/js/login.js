import {jwtDecode} from "../js/jwt-decode.js";

let accessToken = '';
//let api_url = 'https://jwt-pg-morganpage-tech.herokuapp.com/api';
let api_url = '/api';//Will need to make this explicit if front-end on different server
const divLogin = document.getElementById("div-login");
const formLogin = document.getElementById("form-login");
const pStatus = document.getElementById("login-status");

let showLoginPanel = (bShow) => {
  bShow ? divLogin.style.display = "flex" : divLogin.style.display = "none";
}

formLogin.onsubmit = async e => {
  console.log(formLogin);
  e.preventDefault();
  const loginDetails = await login({ email: formLogin.email.value, password: formLogin.password.value });
  console.log(loginDetails);
  if (loginDetails.error) {
    pStatus.innerText = loginDetails.error;
    return;
  }
  window. location = "/admin"
  accessToken = loginDetails.accessToken;
  const jwtDecoded = jwtDecode(accessToken);
  pStatus.innerHTML = `Login Successful! </br> Hello ${jwtDecoded.user_name}</br> Your id is ${jwtDecoded.user_id}</br> Your email is ${jwtDecoded.user_email}`;
  showLoginPanel(false);
}

async function login(data) {
  //console.log(JSON.stringify(data));
  const res = await fetch(`${api_url}/auth/login`, {
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

