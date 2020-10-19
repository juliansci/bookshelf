
const API_URL = process.env.REACT_APP_API_URL;


function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };
  return window.fetch(`${API_URL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client }