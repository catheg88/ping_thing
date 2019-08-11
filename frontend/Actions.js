import axios from 'axios'

const Actions = {

  fetchConversations: () => {
    return function(dispatch) {
      return axios.get('/api/conversations')
        .then( res => {
          dispatch(Actions.receiveConversations(res.data))
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

  receiveMessages: (messages, conversation_id) => ({
      type: 'RECEIVE_MESSAGES',
      conversation_id: conversation_id,
      messages: messages
  }),

  // sendInitialMessage: message => ({
  //   type: 'SEND_INITIAL_MESSAGE',
  //   message: message
  // })
  sendInitialMessage: message => {
    console.log('message')
    console.log(message)
    return function(dispatch) {
      return axios.post('/api/conversations', message)
    }
  }

}

export default Actions
