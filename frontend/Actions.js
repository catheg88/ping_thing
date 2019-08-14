import axios from 'axios'

const Actions = {
  awaitUser: () => ({
    type: 'AWAIT_USER'
  }),

  logIn: loginData => {
    return function(dispatch) {
      dispatch(Actions.awaitUser())
      return axios.post('/users/sign_in', {
        user: {
          login: loginData.username,
          password: loginData.password
        }
      })
        .then( res => {
          dispatch(Actions.fetchUser())
        })
    }
  },

  logOut: () => {
    return function(dispatch) {
      return axios.delete('/users/sign_out')
        .then()
        .catch(
          dispatch({
            type: 'LOGOUT'
          })
        )
    }
  },

  fetchUser: () => {
    return function(dispatch) {
      dispatch(Actions.awaitUser())
      return axios.get('/api/current_user')
        .then( res => {
          dispatch(Actions.receiveUser(res.data))
        }).catch( error => {
          dispatch(Actions.receiveUser({
            id: "unauthorized",
            username: "unauthorized",
            email: "unauthorized"
          }))
        })
    }
  },

  receiveUser: user => ({
    type: 'RECEIVE_USER',
    id: user.id,
    username: user.username,
    email: user.email
  }),

  fetchConversation: conversation_id => {
    return function(dispatch) {
      return axios.get(`/api/conversations/${conversation_id}`)
      .then( res => {
        dispatch(Actions.receiveConversation(res.data))
      })
    }
  },
  receiveConversation: conversation => ({
    type: 'RECEIVE_CONVERSATION',
    conversation: conversation
  }),

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

  fetchMessage: (message_id, conversation_id) => {
    return function(dispatch) {
      return axios.get(`/api/conversations/${conversation_id}/messages/${message_id}`)
        .then( res => {
          dispatch(Actions.receiveMessage(res.data, conversation_id))
        })
    }
  },
  receiveMessage: (message, conversation_id) => ({
      type: 'RECEIVE_MESSAGE',
      conversation_id: conversation_id,
      message: message
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
  },

  setFocus: conversation_id => ({
    type: 'SET_FOCUS',
    conversation_id: conversation_id
  })

}

export default Actions
