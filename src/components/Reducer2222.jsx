const ROLL = "ROLL";

const LINE = "LINE";

const initialState = {
  score:110,
  // line1:true,
  // line3:false,
  // line5:false,
  // line7:false,
  // line9:false,
  lines: 1,
  table : [0,1,2,3,4,5,6,7,8],
  table1 : [1,3,5,7,0,2,4,6,8],
  table2 : [2,5,8,1,4,7,0,3,6],
  table3 : [3,7,2,6,1,5,0,4,8],
  table4 : [4,0,5,1,6,2,7,3,8],
  newTable : [0,1,2],
  newTable1 : [1,3,5],
  newTable2 : [2,5,8],
  newTable3 : [3,7,2],
  newTable4 : [4,0,5]
}
//------------------------------------------------------------------------------
// const rnd = (table) => {
//   let j = Math.floor(Math.random() * 9);
//   let newTable = [];
//   if (j < 7) {
//     newTable.push(table[j]);
//     newTable.push(table[j+1]);
//     newTable.push(table[j+2]);
//   }
//   else if (j < 8) {
//     newTable.push(table[j]);
//     newTable.push(table[j+1]);
//     newTable.push(table[0]);
//   }
//   else {
//     newTable.push(table[j]);
//     newTable.push(table[0]);
//     newTable.push(table[1]);
//   }
//   return newTable;
// }

const rnd = (table) => {
	let j = Math.floor(Math.random() * 9);
	let newTable = [];
	for(let i = 0; i < 3; i++) {
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

// const comparison = (list) => {
// 	let score = 0;
// 	let combo = 1;
// 	for(int i = 1; i < list.length; i++) {
// 		if(list[i] == list[i-1]) {
// 			combo++;
// 		} else if(combo < 3) {
// 			combo = 1;
// 		}
// 	}
// 	return score;
// }

//------------------------------------------------------------------------------


// const check1 = (t,t1,t2,t3,t4,s) => {
//   s += comparison(t[1],t1[1],t2[1],t3[1],t4[1]);
//   return s;
// }
// 
// const check3 = (t,t1,t2,t3,t4,s) => {
//   s += comparison(t[0],t1[0],t2[0],t3[0],t4[0]);
//   s += comparison(t[2],t1[2],t2[2],t3[2],t4[2]);
//   return s;
// }
// 
// const check5 = (t,t1,t2,t3,t4,s) => {
//   s += comparison(t[0],t1[1],t2[2],t3[1],t4[0]);
//   s += comparison(t[2],t1[1],t2[0],t3[1],t4[2]);
//   return s;
// }
// 
// const check7 = (t,t1,t2,t3,t4,s) => {
//   s += comparison(t[0],t1[0],t2[1],t3[2],t4[2]);
//   s += comparison(t[2],t1[2],t2[1],t3[0],t4[0]);
//   return s;
// }
// 
// const check9 = (t,t1,t2,t3,t4,s) => {
//   s += comparison(t[1],t1[2],t2[1],t3[0],t4[1]);
//   s += comparison(t[1],t1[0],t2[1],t3[2],t4[1]);
//   return s;
// }

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

const checkAll = (t,t1,t2,t3,t4,s) => {
	for(let i = 0; i < state.lines; i++) {
		s -= 1;
		s += comparison(t[ linePos [i] [0] ], t1[linePos[i][1]], t2[linePos[i][2]], t3[linePos[i][3]], t4[linePos[i][4]]);
	}
	return s;
}
//------------------------------------------------------------------------------
const Reducer = (state = initialState,action) => {
  switch (action.type) {
    case ROLL:
      {

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


        // newScore = check1(newTable,newTable1,newTable2,newTable3,newTable4,newScore);
        // newScore -= 1;
        // if (state.line3) {
        //   newScore = check3(newTable,newTable1,newTable2,newTable3,newTable4,newScore);
        //   newScore -= 2;
        // }
        // if (state.line5) {
        //   newScore = check5(newTable,newTable1,newTable2,newTable3,newTable4,newScore);
        //   newScore -= 2;
        // }
        // if (state.line7) {
        //   newScore = check7(newTable,newTable1,newTable2,newTable3,newTable4,newScore);
        //   newScore -= 2;
        // }
        // if (state.line9) {
        //   newScore = check9(newTable,newTable1,newTable2,newTable3,newTable4,newScore);
        //   newScore -= 2;
        // }
		newScore = checkAll(newTable,newTable1,newTable2,newTable3,newTable4,newScore);

        return {...state,score:newScore,newTable:newTable,newTable1:newTable1,newTable2:newTable2,newTable3:newTable3,newTable4:newTable4};
      }
//------------------------------------------------------------------------------
    case LINE:
      {
		  return {...state, lines: action.x};
        // if(action.x == 1){
        //   return {...state,line3:false,line5:false,line7:false,line9:false};
        // }
        // else if(action.x == 3){
        //   return {...state,line3:true,line5:false,line7:false,line9:false};
        // }
        // else if(action.x == 5){
        //   return {...state,line3:true,line5:true,line7:false,line9:false};
        // }
        // else if(action.x == 7){
        //   return {...state,line3:true,line5:true,line7:true,line9:false};
        // }
        // else if(action.x == 9){
        //   return {...state,line3:true,line5:true,line7:true,line9:true};
        // }
        // else {
        //   return state;
        // }
      }

      default:
        return state;
  }
}
//------------------------------------------------------------------------------
export const roll = () => ({type:ROLL});

export const line = (x) => ({type:LINE,x:x});

export default Reducer;
