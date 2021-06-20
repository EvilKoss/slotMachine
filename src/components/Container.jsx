import Present from './Present';
import Reducer from './Reducer';
import {connect} from 'react-redux';
import {line,changeTimer,bool,runTimer} from './Reducer';

const mapStateToProps = (state) => {
    return{
        table: state.combine.table,
        table1: state.combine.table1,
        table2: state.combine.table2,
        table3: state.combine.table3,
        table4: state.combine.table4,
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
    line,changeTimer,bool
}

const Container = connect(mapStateToProps,mapDispatchToProps)(Present);

export default Container;
