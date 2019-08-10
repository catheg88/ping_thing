const initialState = {

}

const Reducer = function ( state = initialState, action ) {
  switch (action.type) {
    case 'action':
      return Object.assign({}, state, {

      })

    default:
      return state
  }
}

export default Reducer
