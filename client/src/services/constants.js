export const domain = 'http://localhost:4000'

export const authHeader = {
    headers: {
        'auth-token': localStorage.getItem('auth-token')
    }
}