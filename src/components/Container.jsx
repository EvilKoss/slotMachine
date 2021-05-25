import Present from './Present';
import Reducer from './Reducer';
import {connect} from 'react-redux';
import {roll,line,changeTimer,bool,runTimer} from './Reducer';

const mapStateToProps = (state) => {
    return{
        newTable: state.combine.newTable,
        newTable1: state.combine.newTable1,
        newTable2: state.combine.newTable2,
        newTable3: state.combine.newTable3,
        newTable4: state.combine.newTable4,
        score: state.combine.score,
        change1: state.combine.change1,
        change2: state.combine.change2,
        change3: state.combine.change3,
        change4: state.combine.change4,
        change5: state.combine.change5,
        runTimer: state.combine.runTimer,
        time: state.combine.time
    }
}

const mapDispatchToProps = {
    roll,line,changeTimer,bool
}

const Container = connect(mapStateToProps,mapDispatchToProps)(Present);

export default Container;
