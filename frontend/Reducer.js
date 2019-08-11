const initialState = {
  conversations: []
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {

    case 'RECEIVE_CONVERSATIONS':
      return Object.assign({}, state, {
        conversations: action.conversations
      })

    case 'RECEIVE_MESSAGES':
      const newConversations = JSON.parse(JSON.stringify(state.conversations));
      newConversations.forEach( conversation => {
        if (conversation.id === action.conversation_id) {
          conversation.messages = action.messages
        }
      })

      return Object.assign({}, state, {
        conversations: newConversations
      })

    default:
      console.log('default')
      return state
  }
}

export default Reducer
