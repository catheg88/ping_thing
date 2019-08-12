const initialState = {
  current_user: '',
  conversations: []
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {

    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        current_user: action.id
      })

      case 'RECEIVE_CONVERSATION':
      var newConversations = JSON.parse(JSON.stringify(state.conversations))
      newConversations.unshift(action.conversation)
      return Object.assign({}, state, {
        conversations: newConversations
      })

    case 'RECEIVE_CONVERSATIONS':
      // TODO: handle no conversations
      return Object.assign({}, state, {
        conversations: action.conversations
      })

    case 'RECEIVE_MESSAGES':
      var newConversations = JSON.parse(JSON.stringify(state.conversations))
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
