import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor() { }

  addAgenda(obj){
    let agenda = this.getAgenda();
    let key = obj.day.toLocaleString('en-en',{year:'numeric',month:'long',day:'numeric'});
    obj.activities.actId = Math.random().toString(12).slice(2);
    if(!agenda){
      agenda = {
        [key] : [obj.activities]
      }
    } else if(agenda.hasOwnProperty(key)){
      agenda[key].push(obj.activities);
    } else {
      agenda[key] = [obj.activities];
    }
    localStorage.setItem('calendar',JSON.stringify(agenda))
  }

  getAgenda(){
    return JSON.parse(localStorage.getItem('calendar'));
  }

  removeAgendaItem(month,itemId){
    let agenda = this.getAgenda();
    let arr = agenda[month];
    let newArr = arr.filter((item) =>{return( item.actId !== itemId)});
    agenda[month]= newArr;
    if(newArr.length === 0){
      delete agenda[month];
    }
    localStorage.setItem('calendar',JSON.stringify(agenda))
  }
}
