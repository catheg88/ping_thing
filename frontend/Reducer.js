const initialState = {
  conversations: []
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {
    case 'GET_CONVERSATIONS':
      return Object.assign({}, state, {
        conversations: 'convos got'
      })

    default:
      return state
  }
}

export default Reducer
