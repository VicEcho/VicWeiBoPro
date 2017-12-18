function request(url, methodparams) {
   return fetch('/artical/edit', {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(params)
  }).then((response) => {
    const { statusText, status } = response;
    return response.json().then(res => {
      return {
        data: res,
        statusCode: status,
        message: statusText,
        success: true
      }
    })
  }).then((res) => {
    location.href = '/artical/list';
    return res
  }).catch(err => {
    console.log('123123')
  }); 
}
module.exports = request;