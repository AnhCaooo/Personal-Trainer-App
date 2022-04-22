import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import addMinutes from "date-fns/addMinutes";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarScreen() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch(process.env.REACT_APP_TRAININGS_URL)
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .catch((err) => console.error(err));
  };

  const views = Object.keys(Views).map((k) => Views[k]);

  const events = trainings.map((training) => {
    return {
      id: training.id,
      title:
        training.activity +
        " / " +
        training.customer.firstname +
        " " +
        training.customer.lastname,
      start: new Date(training.date),
      end: addMinutes(new Date(training.date), training.duration),
    };
  });

  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          step={60}
          views={views}
          style={{
            height: 620,
            marginTop: 50,
            marginLeft: 30,
            marginRight: 30,
          }}
        />
      </div>
    </>
  );
}

export default CalendarScreen;
