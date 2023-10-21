
const accessToken = req.cookies.access_token;


async function fetchUsers(token) {
  
    const res = await fetch(`${api_url}/users`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    //await console.log(res.json());
    return await res.json();
}

fetchUsers(accessToken);