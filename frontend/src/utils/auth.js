export function auth() {
    return {
        headers: {
            Authorization: localStorage.token ? `Token ${localStorage.token}` : undefined,
        },
    }
}

export function signin({ user, token }, history) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    history.push('/')
}

export function signOut() {
    localStorage.clear()
    window.location.reload()
}

export function isAuthenticated() {
    return localStorage.getItem('user')
        && localStorage.getItem('token')
}
