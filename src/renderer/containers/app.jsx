import { connect } from 'react-redux'
import act from '../actions/app'
import App from '../components/app'

function mapStateToProps(state) {
    document.title = state.title
    return {
        count: state.counter.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAdd: () => {
            dispatch(act.addCount())
        },
        setTitle: title => {
            dispatch(act.setTitle(title))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
