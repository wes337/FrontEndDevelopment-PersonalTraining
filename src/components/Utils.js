export function listCustomers() {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(responseData => {
        return responseData.content
    })
}