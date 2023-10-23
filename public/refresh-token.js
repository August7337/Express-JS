let api_url = '/api';

async function fetchRefreshToken(){
    const res = await fetch(`${api_url}/auth/refresh_token`,{
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    });  
    const jsonResponse = await res.json();
    return jsonResponse;
}

function yourFunction(){
    fetchRefreshToken();
    setTimeout(yourFunction, 19000);
}

yourFunction();