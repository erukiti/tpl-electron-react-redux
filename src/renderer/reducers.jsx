import actions from './actions'

const conf = require('../../package.json')

const initialState = {
    title: conf.name,
    counter: {
        count: 1
    }
}

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_COUNT:
            {
                return {
                    title: state.title,
                    counter: {
                        count: state.counter.count + 1
                    }
                }
            }
        case actions.SET_TITLE:
            {
                return {
                    title: action.title,
                    counter: state.counter
                }
            }
        default:
            {
                return state
            }
    }
}
