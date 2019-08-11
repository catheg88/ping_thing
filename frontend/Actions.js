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
  })

}

export default Actions
