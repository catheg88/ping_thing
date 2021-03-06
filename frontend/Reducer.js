const initialState = {
  currentUser: {},
  conversations: [],
  loggedIn: false,
  awaitUser: false,
  focus: "newConversation",
  usernames: []
}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {

    case 'AWAIT_USER':
      return Object.assign({}, state, {
        awaitUser: true
      })

    case 'LOGOUT':
      return Object.assign({}, state, {
        currentUser: {},
        loggedIn: false
      })

    case 'RECEIVE_USER':
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
        loggedIn: loggedIn,
        awaitUser: false
      })

    case 'RECEIVE_USERNAMES':
      const usernames = action.users.map( user => user.username )


      return Object.assign({}, state, {
        usernames: usernames
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

    case 'SET_FOCUS':
      return Object.assign({}, state, {
        focus: action.conversation_id
      })

    default:
      return state
  }
}

export default Reducer
