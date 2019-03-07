import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import { AgendaService } from '../agenda.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  languages: Object[];
  languageForm: FormGroup;

  activityForm: FormGroup;

  dateOfToday: Date;
  dateOfTodayDayString: string;
  monthOfToday: number;
  yearOfToday: number;

  monthDisplayed: Date;
  monthDisplayedString: String;
  monthDisplayedNumber: number;

  calendar: Object[];

  startDay: number = 1; //sunday
  dayFormat: Object = { day: 'numeric' };

  selectedDay: {
    date: string,
    year: number,
    month: number,
    fullDate: Date
  } = {date:'',year:0,month:0,fullDate:new Date};

  agendaCurrent; //// TODO: add type annotation

  constructor(private agenda: AgendaService) { }

  ngOnInit() {
    this.languages = [
      { name: 'Russian', abbrev: 'ru-ru' },
      { name: 'English', abbrev: 'en-en' },
      { name: 'German', abbrev: 'de-de' },
      { name: 'Spanish', abbrev: 'es-es' },
    ];

    this.languageForm = new FormGroup({
      lang: new FormControl('en-en')
    })

    this.activityForm = new FormGroup({
      time: new FormControl(),
      activity: new FormControl()
    })

    this.dateOfToday = new Date();
    this.monthDisplayed = new Date();

    this.monthOfToday = this.dateOfToday.getMonth();
    this.yearOfToday = this.dateOfToday.getFullYear();
    this.updateUi();
  }

  updateUi() {
    this.monthDisplayedString = this.monthDisplayed.toLocaleDateString(this.languageForm.value.lang, { month: 'long', year: 'numeric' });
    this.dateOfTodayDayString = this.dateOfToday.toLocaleDateString(this.languageForm.value.lang, this.dayFormat);
    this.monthDisplayedNumber = this.monthDisplayed.getMonth();
    this.initCalendar();
    this.getAgenda();
  }

  nextMonth() {
    this.monthDisplayed.setMonth(this.monthDisplayed.getMonth() + 1);
    this.updateUi();
  }

  prevMonth() {
    this.monthDisplayed.setMonth(this.monthDisplayed.getMonth() - 1);
    this.updateUi();
  }

  initCalendar() {
    this.calendar = [];

    let nextMonth = new Date(this.monthDisplayed);
    nextMonth.setMonth(this.monthDisplayed.getMonth() + 1);

    let iteratorDay = new Date(this.monthDisplayed);
    iteratorDay.setDate(1);
    iteratorDay.setDate(-iteratorDay.getDay() + this.startDay + 1);

    let holdingTemporaryArray: Object[];
    holdingTemporaryArray = [];
    while (iteratorDay.getDay() !== this.startDay || iteratorDay.getMonth() !== (nextMonth.getMonth())) {
      let dateHolder = new Date(iteratorDay);
      let obj = {
        date: iteratorDay.toLocaleDateString(this.languageForm.value.lang, this.dayFormat),
        year: iteratorDay.getFullYear(),
        month: iteratorDay.getMonth(),
        weekday: iteratorDay.getDay(),
        dateInternational: dateHolder.toLocaleDateString('en-en', {day:'numeric', year: 'numeric', month:'long'}),
        fullDate: dateHolder
      }
      holdingTemporaryArray.push(obj);
      iteratorDay.setDate(iteratorDay.getDate() + 1);
    }
    this.calendar = holdingTemporaryArray;
  }

  popupOpen(day) {
    this.selectedDay = day;
    document.getElementsByClassName('day-popup-wrapper')[0].classList.add('shown');
    document.getElementsByClassName('day-popup-wrapper')[0].classList.remove('hidden');
  }

  popupClose() {
    document.getElementsByClassName('day-popup-wrapper')[0].classList.add('hidden');
    document.getElementsByClassName('day-popup-wrapper')[0].classList.remove('shown');
    this.activityForm.reset();
  }

  addActivities(f) {
    if (!f.valid) {
      alert('Please, fill in the values before adding');
      return;
    }
    let obj = {
      day: this.selectedDay.fullDate,
      activities: {
        time: this.activityForm.value.time,
        activity: this.activityForm.value.activity
      }
    }
    this.agenda.addAgenda(obj);
    this.activityForm.reset();
    this.updateUi();
  };

  getAgenda(){
    this.agendaCurrent = this.agenda.getAgenda();
  }

  removeActivity(date, activityID) {
    this.agenda.removeAgendaItem(date, activityID);
    this.updateUi();
  }

}
