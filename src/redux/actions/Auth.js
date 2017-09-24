//set authenticated user object
const setUser = (user)=>({
    type: 'SET_USER',
    user: user
})

//set authenticated user's position
const setPosition = (position) => ({
    type: 'SET_POSITION',
    position: position
})

//logout authenticated
const logout = () => ({
    type: 'LOGOUT'
})

export default {
    setUser,
    setPosition,
    logout
}