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
        change1: state.combine.slots[0].change,
        change2: state.combine.slots[1].change,
        change3: state.combine.slots[2].change,
        change4: state.combine.slots[3].change,
        change5: state.combine.slots[4].change,
        runTimer: state.combine.runTimer,
        time: state.combine.time
    }
}

const mapDispatchToProps = {
    roll,line,changeTimer,bool
}

const Container = connect(mapStateToProps,mapDispatchToProps)(Present);

export default Container;
