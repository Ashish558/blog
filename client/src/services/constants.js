export const domain = 'https://blog-app-45.herokuapp.com'

export const authHeader = {
    headers: {
        'auth-token': localStorage.getItem('auth-token')
    }
}
