const Actions = {

  fetchConversations: () => {
    return function(dispatch) {
      return fetch('/api/conversations')
        .then( res => res.json() )
        .then( res => {
          dispatch(Actions.receiveConversations(res))
        } )
    }
  },

  receiveConversations: conversations => ({
    type: 'RECEIVE_CONVERSATIONS',
    conversations: conversations
  }),

  fetchMessages: conversation_id => {
    return function(dispatch) {
      return fetch(`/api/conversations/${conversation_id}/messages`)
        .then( res => res.json() )
        .then( res => {
          dispatch(Actions.receiveMessages(res, conversation_id))
        } )
    }
  },

  receiveMessages: (messages, conversation_id) => {
    return {
      type: 'RECEIVE_MESSAGES',
      conversation_id: conversation_id,
      messages: messages
    }

  }

}

export default Actions
