//set loading action
const setLoading = (loading)=>({
    type: 'SET_LOADING',
    loading: loading
})

const setError = error => ({
    type: 'SET_ERROR',
    error
})

export default {
    setLoading,
    setError
}