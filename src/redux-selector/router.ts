export const getIdFromRouter = (_, props) => parseInt(props.params.id, 10)
export const getUidFromRouter = (_, props) => parseInt(props.params.uid, 10)
export const getTitlefromRouter = (_, props) => props.params.postTitle
