const setUser = (user)=>({
    type: 'SET_USER',
    user: user
})

const setPosition = (position) => ({
    type: 'SET_POSITION',
    position: position
})

const logout = () => ({
    type: 'LOGOUT'
})

export default {
    setUser,
    setPosition,
    logout
}