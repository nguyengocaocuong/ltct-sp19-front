const CodeReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_CODE_LIST_SUCCESS':
            return [...action.payload]
        default:
            return state
    }
}
export default CodeReducer