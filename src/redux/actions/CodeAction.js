const loadCodeListSuccess = listCode => {
    return {
        type:'LOAD_CODE_LIST_SUCCESS',
        payload:listCode
    }
}

const exportDefault = {
    loadCodeListSuccess
}
export default exportDefault