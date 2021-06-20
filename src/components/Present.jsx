import React from 'react';
import style from './Present.module.css';
import {useEffect} from 'react';


import bar from './pictures/bar.bmp';
import bell from './pictures/bell.bmp';
import chery from './pictures/chery.bmp';
import diamound from './pictures/diamound.bmp';
import grapes from './pictures/grapes.bmp';
import orange from './pictures/orange.bmp';
import seven from './pictures/seven.bmp';
import star from './pictures/star.bmp';
import watermelon from './pictures/watermelon.bmp';





const Present = (props) => {
  let pictuter = [bar,bell,chery,diamound,grapes,orange,seven,star,watermelon];
  let newTable = props.table;
  let newTable1 = props.table1;
  let newTable2 = props.table2;
  let newTable3 = props.table3;
  let newTable4 = props.table4;
  let time = props.time;
  let score = props.score;
  let roll = props.bool;
  let line = props.line;
  let table1 = [];
  let table2 = [];
  let table3 = [];
  let table4 = [];
  let table5 = [];
  useEffect(() => {
    let timer = setInterval(() => {
      if(props.runTimer){
        props.changeTimer();
      }
    }, 10);
    return () => {
      clearInterval(timer);
    };
  });

  const fillIn = (table) =>{
    let change1 = props.change1 % 1926;
    let change2 = props.change2 % 1926;
    let change3 = props.change3 % 1926;
    let change4 = props.change4 % 1926;
    let change5 = props.change5 % 1926;
    let i = 0;
    let temporaryTable = [];
    while (i < 12) {
      if(table == newTable){
        temporaryTable.push(<img className={style.img} src={pictuter[table[i]]} style={{transform: `translateY(${change1}px)`}}/>);
      }
      else if(table == newTable1){
        temporaryTable.push(<img className={style.img} src={pictuter[table[i]]} style={{transform: `translateY(${change2}px)`}}/>);
      }
      else if(table == newTable2){
        temporaryTable.push(<img className={style.img} src={pictuter[table[i]]} style={{transform: `translateY(${change3}px)`}}/>);
      }
      else if(table == newTable3){
        temporaryTable.push(<img className={style.img} src={pictuter[table[i]]} style={{transform: `translateY(${change4}px)`}}/>);
      }
      else if(table == newTable4){
        temporaryTable.push(<img className={style.img} src={pictuter[table[i]]} style={{transform: `translateY(${change5}px)`}}/>);
      }
      i++;
    }
    return temporaryTable;
  }

  table1 = fillIn(newTable);
  table2 = fillIn(newTable1);
  table3 = fillIn(newTable2);
  table4 = fillIn(newTable3);
  table5 = fillIn(newTable4);

	return(
  <div>
    <div className={style.score}>
      SCORE:  {score}
    </div>
    <div className={style.one}>
      <div className={style.div}>
       {table1}
      </div>
      <div className={style.div}>
  	   {table2}
      </div>
      <div className={style.div}>
       {table3}
      </div>
      <div className={style.div}>
       {table4}
      </div>
      <div className={style.div}>
       {table5}
      </div>
  	</div>
    <div className={style.bot}>
      <button onClick = {()=>line(1)}>PLAY 1 LINE</button>
      <a> </a>
      <button onClick = {()=>line(3)}>PLAY 3 LINE</button>
      <a> </a>
      <button onClick = {()=>line(5)}>PLAY 5 LINE</button>
      <a> </a>
      <button onClick = {()=>line(7)}>PLAY 7 LINE</button>
      <a> </a>
      <button onClick = {()=>line(9)}>PLAY 9 LINE</button>
      <a> </a>
      <button onClick = {roll}>ROLL</button>
    </div>
  </div>
  )
}

export default Present;
