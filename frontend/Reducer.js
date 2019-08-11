const initialState = {
  conversations: []
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {
    // case 'FETCH_CONVERSATIONS':
    //   return Object.assign({}, state, {
    //     conversations: 'convos got'
    //   })

    case 'RECEIVE_CONVERSATIONS':
      return Object.assign({}, state, {
        conversations: action.conversations
      })

    default:
      return state
  }
}

export default Reducer
