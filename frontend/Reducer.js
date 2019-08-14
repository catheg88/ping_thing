const initialState = {
  currentUser: {},
  conversations: [],
  loggedIn: false
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {

    case 'RECEIVE_USER':
    console.log('receiving_user')
      var loggedIn = true
      if (action.id === "unauthorized") {
        loggedIn = false
      }
      return Object.assign({}, state, {
        currentUser: {
          id: action.id,
          username: action.username,
          email: action.email
        },
        loggedIn: loggedIn
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
      var conversationIndex = null
      newConversations.forEach( (conversation, idx) => {
        if (conversation.id === action.conversation_id) {
          conversation.updated_at = action.message.updated_at
          conversationIndex = idx
          if (conversation.messages) {
            conversation.messages.unshift(action.message)
          }
        }
      })

      // rebuilds conversation array so the updated conversation is first
      var updatedConversation = newConversations.slice(conversationIndex, conversationIndex + 1)
      var arrStart = newConversations.slice(0, conversationIndex)
      var arrEnd = newConversations.slice(conversationIndex + 1, newConversations.length)
      var reorderedConversations = updatedConversation.concat(arrStart).concat(arrEnd)

      return Object.assign({}, state, {
        conversations: reorderedConversations
      })

    default:
      return state
  }
}

export default Reducer
