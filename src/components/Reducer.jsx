const ROLL = "ROLL";

const LINE = "LINE";

const BOOL = "BOOL";

const CHANGE_TIMER = "CHANGE TIMER";

const initialState = {
  score:110,
  lines:1,
  time:0,
  change1:0,
  change2:0,
  change3:0,
  change4:0,
  change5:0,
  runTimer:false,
  iterator:334,
  table : [0,1,2,3,4,5,6,7,8,0,1,2],
  table1 : [1,3,5,7,0,2,4,6,8,1,3,5],
  table2 : [2,5,8,1,4,7,0,3,6,2,5,8],
  table3 : [3,7,2,6,1,5,0,4,8,3,7,2],
  table4 : [4,0,5,1,6,2,7,3,8,4,0,5],

  newTable : [0,1,2,3,4,5,6,7,8,0,1,2],
  newTable1 : [1,3,5,7,0,2,4,6,8,1,3,5],
  newTable2 : [2,5,8,1,4,7,0,3,6,2,5,8],
  newTable3 : [3,7,2,6,1,5,0,4,8,3,7,2],
  newTable4 : [4,0,5,1,6,2,7,3,8,4,0,5]
}
//------------------------------------------------------------------------------
const rnd = (table) => {
  let j = Math.floor(Math.random() * 9);
  let newTable = [];
  for (let i = 0; i < 4; i++) {
    newTable.push(table[(j+i) % table.length]);
  }

  return newTable;
}


//------------------------------------------------------------------------------


const comparison = (a,b,c,d,e) => {
  let score = 0;
  if((a == b && a == c)||
     (b == c && b == d)||
     (c == d && c == e)){
          alert('10');
          score += 10;
  }
  if((a == b && a == c && a == d)||
          (b == c && b == d && b == e)){
          alert('20');
          score += 20;
  }
  if(a == b && a == c && a == d && a == e){
          alert('50');
          score += 50;
  }
  return score;
}

//------------------------------------------------------------------------------


const linePos = [
					[1,1,1,1,1],
					[0,0,0,0,0],
					[2,2,2,2,2],
					[0,1,2,1,0],
					[2,1,0,1,2],
					[0,0,1,2,2],
					[2,2,1,0,0],
					[1,2,1,0,1],
					[1,0,1,2,1],
				];

const checkAll = (t,t1,t2,t3,t4,s,l) => {
	for(let i = 0; i < l; i++) {
		s -= 1;
		s += comparison(t[linePos[i][0]], t1[linePos[i][1]], t2[linePos[i][2]], t3[linePos[i][3]], t4[linePos[i][4]]);
	}
	return s;
}
//------------------------------------------------------------------------------
const Reducer = (state = initialState,action) => {
  switch (action.type) {
    case ROLL:
      {
        let lines = state.lines;
        let table = [...state.table];
        let table1 = [...state.table1];
        let table2 = [...state.table2];
        let table3 = [...state.table3];
        let table4 = [...state.table4];
        let newScore = state.score;

        let newTable = rnd(table);
        let newTable1 = rnd(table1);
        let newTable2 = rnd(table2);
        let newTable3 = rnd(table3);
        let newTable4 = rnd(table4);


        newScore = checkAll(newTable,newTable1,newTable2,newTable3,newTable4,newScore,lines);

        return {...state,score:newScore,newTable:newTable,newTable1:newTable1,newTable2:newTable2,newTable3:newTable3,newTable4:newTable4};
      }
//------------------------------------------------------------------------------
    case CHANGE_TIMER:
      {
        let lines = state.lines;
        let table = [...state.table];
        let table1 = [...state.table1];
        let table2 = [...state.table2];
        let table3 = [...state.table3];
        let table4 = [...state.table4];
        let newScore = state.score;

        let newChange1 = state.change1;
        let newChange2 = state.change2;
        let newChange3 = state.change3;
        let newChange4 = state.change4;
        let newChange5 = state.change5;
        let newChange11 = Math.floor(Math.random() * 12);
        let newChange22 = Math.floor(Math.random() * 12);
        let newChange33 = Math.floor(Math.random() * 12);
        let newChange44 = Math.floor(Math.random() * 12);
        let newChange55 = Math.floor(Math.random() * 12);
        let newIterator = state.iterator;
        let newRunTimer = state.runTimer;
        let newTime = state.time;

        
        if (newTime >= 0 && newTime <= 213) {
          newChange1 -= 10
        }
        if (newTime >= 30 && newTime <= 243) {
          newChange2 -= 10
        }
        if (newTime >= 60 && newTime <= 273) {
          newChange3 -= 10
        }
        if (newTime >= 90 && newTime <= 303) {
          newChange4 -= 10
        }
        if (newTime >= 120 && newTime <= 333) {
          newChange5 -= 10
        }
        newIterator -= 1;
        newTime += 1;
        if(newIterator <= 0){
          newRunTimer = false;
          newIterator = 334;
          newTime = 0;


          newScore = checkAll(table,table1,table2,table3,table4,newScore,lines);
        }
        return {...state,change1:newChange1,change2:newChange2,change3:newChange3,change4:newChange4,change5:newChange5,
          runTimer:newRunTimer,iterator:newIterator, time:newTime,score:newScore,};
      }
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
    case BOOL:
      {
        let newRunTimer = state.runTimer;
        newRunTimer = !newRunTimer;
        return {...state,runTimer:newRunTimer};
      }
//------------------------------------------------------------------------------
    case LINE:
      {
        return {...state, lines: action.x};

          }
          default:
            return state;
          }
      }
//------------------------------------------------------------------------------
export const roll = () => ({type:ROLL});

export const bool = () => ({type:BOOL});

export const changeTimer = () => ({type:CHANGE_TIMER});

export const line = (x) => ({type:LINE,x:x});

export default Reducer;
