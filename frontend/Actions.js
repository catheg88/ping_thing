import axios from 'axios'

const Actions = {

  fetchConversations: () => {
    return function(dispatch) {
      return axios.get('/api/conversations')
        .then( res => {
          dispatch(Actions.receiveConversations(res.data))
        })
    }
  },

  receiveConversations: conversations => ({
    type: 'RECEIVE_CONVERSATIONS',
    conversations: conversations
  }),

  fetchMessages: conversation_id => {
    return function(dispatch) {
      return axios.get(`/api/conversations/${conversation_id}/messages`)
        .then( res => {
          dispatch(Actions.receiveMessages(res.data, conversation_id))
        })
    }
  },

  receiveMessages: (messages, conversation_id) => ({
      type: 'RECEIVE_MESSAGES',
      conversation_id: conversation_id,
      messages: messages
  }),

  sendInitialMessage: message => {
    return function(dispatch) {
      return axios.post('/api/conversations', message)
    }
  },

  sendReplyMessage: message => {
    return function(dispatch){
      return axios.post(`/api/conversations/${message.conversation_id}/messages`, message)    
    }
  }

}

export default Actions
