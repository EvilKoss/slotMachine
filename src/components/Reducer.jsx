
const LINE = "LINE";

const BOOL = "BOOL";

const CHANGE_TIMER = "CHANGE TIMER";

const initialSlot = {
            change:0,
            start:0,
            end:0
          };

const initialState = {
  score:110,
  lines:1,
  time:0,
  slots: [{...initialSlot},{...initialSlot},{...initialSlot},{...initialSlot},{...initialSlot}],
  runTimer:false,
  iterator:334,
  table : [0,1,2,3,4,5,6,7,8,0,1,2],
  table1 : [1,3,5,7,0,2,4,6,8,1,3,5],
  table2 : [2,5,8,1,4,7,0,3,6,2,5,8],
  table3 : [3,7,2,6,1,5,0,4,8,3,7,2],
  table4 : [4,0,5,1,6,2,7,3,8,4,0,5],

  checkTable: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
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
const numbToName = (numb) => {
  let pictuter = ['bar','bell','chery','diamound','grapes','orange','seven','star','watermelon'];
  return pictuter[numb];
}
//------------------------------------------------------------------------------
const newPossition = (number,checkTable,i) => {
  let newTable = [
    [0,1,2,3,4,5,6,7,8,0,1,2],
    [1,3,5,7,0,2,4,6,8,1,3,5],
    [2,5,8,1,4,7,0,3,6,2,5,8],
    [3,7,2,6,1,5,0,4,8,3,7,2],
    [4,0,5,1,6,2,7,3,8,4,0,5]
  ]
  let rotation = 1926;
  let newCheckTable = checkTable;
  let newNumber = Math.floor(Math.random() * 9);
  number = ((number * -1) / 214) % 9;
  newCheckTable[i][0] = newTable[i][newNumber];
  newCheckTable[i][1] = newTable[i][newNumber + 1];
  newCheckTable[i][2] = newTable[i][newNumber + 2];

  rotation += (newNumber - number) * 214;
  return [rotation * -1,newCheckTable];
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
//------------------------------------------------------------------------------
    case CHANGE_TIMER:
      {
        let newSlots = state.slots;
        let lines = state.lines;
        let table = [...state.table];
        let table1 = [...state.table1];
        let table2 = [...state.table2];
        let table3 = [...state.table3];
        let table4 = [...state.table4];
        let checkTable = [...state.checkTable]
        let newScore = state.score;
        let newRunTimer = state.runTimer;


        let newTime = state.time;

        let i = 0
        while (i < 5) {
          if (newTime >= 0 + (i*25) && newTime <= 100 + (i*25)) {
            let floatTime = (newTime - i*25) / 100;
            newSlots[i].change = (newSlots[i].start * (1.0-floatTime)) + (newSlots[i].end * floatTime);
          }
          i++;
        }


        newTime += 1;
        if(newTime == 201){
          newRunTimer = false;
          newTime = 0;
          //alert('da');
          //newScore = checkAll(table,table1,table2,table3,table4,newScore,lines);
          newScore = checkAll(checkTable[0],checkTable[1],checkTable[2],checkTable[3],checkTable[4],newScore,lines);
        }
        return {...state, time:newTime,score:newScore,runTimer:newRunTimer};
      }
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
    case BOOL:
      {
        let newSlots = state.slots;
        let newScore = state.score;
        let newRunTimer = state.runTimer;
        let newCheckTable = state.checkTable;
        newRunTimer = !newRunTimer;

        let i = 0;
        while (i < 5) {
          newSlots[i].start = newSlots[i].change;
          let newI = newPossition(newSlots[i].change,newCheckTable,i);
          newSlots[i].end = newI[0] + newSlots[i].change;
          i++;
          // if (i == 5) {
          //     newScore = checkAll(newTable,newTable1,newTable2,newTable3,newTable4,newScore,lines);
          // }
        }

        return {...state,runTimer:newRunTimer, slots:newSlots,checkTable:newCheckTable};
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

export const bool = () => ({type:BOOL});

export const changeTimer = () => ({type:CHANGE_TIMER});

export const line = (x) => ({type:LINE,x:x});

export default Reducer;
