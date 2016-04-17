import actions from '../actions'

export default {
    addCount: () => {
        return {
            type: actions.ADD_COUNT
        }
    },
    setTitle: title => {
        return {
            type: actions.SET_TITLE,
            title
        }
    }
}
