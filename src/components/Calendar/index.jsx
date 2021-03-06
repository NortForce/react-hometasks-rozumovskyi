import React, { Component } from 'react';
import SelectedDay from './SelectedDay';
import CalendarBody from './CalendarBody';
import styles from './Calendar.module.scss';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import ukLocale from 'date-fns/locale/uk';
import { format, addMonths } from 'date-fns';
import CalendarControls from './CalendarControls';

const localeMap = {
  en: enLocale,
  ru: ruLocale,
  uk: ukLocale,
};

class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDay: new Date(),
      options: {
        locale: enLocale,
        weekStartsOn: 0,
      },
      weeksInMonths: 6,
      isOtherMonthsRendered: true,
    };
  }

  changeDay = newDay => {
    this.setState((state, props) => ({ currentDay: newDay }));
  };

  changeMonth = day => {
    this.setState((state, props) => ({
      currentDay: addMonths(state.currentDay, day),
    }));
  };

  checkMonth = day => {
    const { currentDay, options } = this.state;

    return format(currentDay, 'LLLL', options) === format(day, 'LLLL', options);
  };

  changeLocale = ({ target: { value } }) => {
    this.setState((state, props) => {
      return {
        options: {
          ...state.options,
          locale: localeMap[value],
        },
      };
    });
  };

  changeStartOfWeek = number => {
    this.setState((state, props) => {
      return {
        options: {
          ...state.options,
          weekStartsOn: number,
        },
      };
    });
  };

  changeMonthRender = () => {
    this.setState((state, props) => {
      return { isOtherMonthsRendered: !state.isOtherMonthsRendered };
    });
  };

  render () {
    const {
      currentDay,
      weeksInMonths,
      isOtherMonthsRendered,
      options,
    } = this.state;

    return (
      <section className={styles.calendarAppContainer}>
        <section className={styles.calendarContainer}>
          <SelectedDay currentDay={currentDay} options={options} />
          <CalendarBody
            currentDay={currentDay}
            weeksInMonths={weeksInMonths}
            isOtherMonthsRendered={isOtherMonthsRendered}
            changeDay={this.changeDay}
            changeMonth={this.changeMonth}
            checkMonth={this.checkMonth}
            options={options}
          />
        </section>
        <CalendarControls
          isChecked={isOtherMonthsRendered}
          weekStartsOn={options.weekStartsOn}
          changeDay={this.changeDay}
          changeLocale={this.changeLocale}
          changeMonthRender={this.changeMonthRender}
          changeStartOfWeek={this.changeStartOfWeek}
          options={options}
        />
      </section>
    );
  }
}

export default Calendar;
