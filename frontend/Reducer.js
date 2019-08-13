const initialState = {
  current_user: {},
  conversations: []
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {

    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        current_user: {
          id: action.id,
          email: action.email
        }
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

    case 'RECEIVE_MESSAGE':
      var newConversations = JSON.parse(JSON.stringify(state.conversations))
      newConversations.forEach( conversation => {
        if (conversation.id === action.conversation_id) {
          conversation.updated_at = action.message.updated_at
          if (conversation.messages) {
            conversation.messages.unshift(action.message)
          }
        }
      })

      return Object.assign({}, state, {
        conversations: newConversations
      })

    default:
      return state
  }
}

export default Reducer
