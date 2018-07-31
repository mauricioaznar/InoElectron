export function getHeaders () {
  const accessToken = JSON.parse(window.localStorage.getItem('AccessToken'))
  const headers = {
    'Accept': 'Application/json',
    'Authorization': 'Bearer ' + accessToken
  }
  return headers
}
