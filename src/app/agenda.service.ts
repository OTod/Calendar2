import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor() { }

  addAgenda(obj) {
    let agenda = this.getAgenda();
    const key = obj.day.toLocaleString('en-en', { year: 'numeric', month: 'long', day: 'numeric' });
    obj.activities.actId = Math.random().toString(12).slice(2);
    if (!agenda) {
      agenda = {
        [key]: [obj.activities]
      };
    } else if (agenda.hasOwnProperty(key)) {
      agenda[key].push(obj.activities);
    } else {
      agenda[key] = [obj.activities];
    }
    localStorage.setItem('calendar', JSON.stringify(agenda));
  }

  getAgenda() {
    const storage = localStorage.getItem('calendar');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return {};
    }
  }

  removeAgendaItem(month, itemId) {
    const agenda = this.getAgenda();
    const arr = agenda[month];
    const newArr = arr.filter((item) => (item.actId !== itemId));
    agenda[month] = newArr;
    if (newArr.length === 0) {
      delete agenda[month];
    }
    localStorage.setItem('calendar', JSON.stringify(agenda));
  }
}
