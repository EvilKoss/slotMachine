const ROLL = "ROLL";

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
const newPossition = (number) => {
  let rotation = 1926;
  let newNumber = Math.floor(Math.random() * 9);
  number = ((number * -1) / 214) % 9;
  alert([newNumber,number]);
  rotation += (newNumber - number) * 214;
  return rotation * -1;
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
        let newSlots = state.slots;
        let lines = state.lines;
        let table = [...state.table];
        let table1 = [...state.table1];
        let table2 = [...state.table2];
        let table3 = [...state.table3];
        let table4 = [...state.table4];
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

          newScore = checkAll(table,table1,table2,table3,table4,newScore,lines);
        }
        return {...state, time:newTime,score:newScore,runTimer:newRunTimer};
      }
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
    case BOOL:
      {
        let newSlots = state.slots;
        let newRunTimer = state.runTimer;
        newRunTimer = !newRunTimer;

        let i = 0;
        while (i < 5) {
          newSlots[i].start = newSlots[i].change;
          newSlots[i].end = newPossition(newSlots[i].change) + newSlots[i].change;
          i++;
        }

        return {...state,runTimer:newRunTimer, slots:newSlots};
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
