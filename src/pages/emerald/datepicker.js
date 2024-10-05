import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import Button from "../../components/basics/button";
const Heading = ({ date, changeMonth, resetDate }) => {
  return (
    <nav className="calendar--nav">
      <a onClick={() => changeMonth(date.month() - 1)}>&#8249;</a>
      <h1 onClick={() => resetDate()}>
        {date.format("MMMM")} {date.format("YYYY")}
      </h1>
      <a onClick={() => changeMonth(date.month() + 1)}>&#8250;</a>
    </nav>
  );
};

const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
  let className = [];

  if (moment().isSame(date, "day")) {
    className.push("active");
  }

  if (date.isSame(startDate, "day")) {
    className.push("start");
  }

  if (date.isBetween(startDate, endDate, "day")) {
    className.push("between");
  }

  if (date.isSame(endDate, "day")) {
    className.push("end");
  }

  if (!date.isSame(currentDate, "month")) {
    className.push("muted");
  }

  return (
    <span
      onClick={() => onClick(date)}
      //   currentDate={date}
      className={className.join(" ")}
    >
      {date.date()}
    </span>
  );
};

const Days = ({ date, startDate, endDate, onClick }) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf("month");
  const previousMonth = moment(date).subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, "month");
  let days = [];
  let labels = [];

  for (let i = 1; i <= 7; i++) {
    labels.push(
      <span key={`label-${i}`} className="label">
        {moment().day(i).format("dd")}
      </span>
    );
  }

  for (let i = firstDayDate.day(); i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2);

    days.push(
      <Day
        key={`prev-${moment(previousMonth).format("DD MM YYYY")}`}
        onClick={(date) => onClick(date)}
        currentDate={date}
        date={moment(previousMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i);

    days.push(
      <Day
        key={`cur-${moment(thisDate).format("DD MM YYYY")}`}
        onClick={(date) => onClick(date)}
        currentDate={date}
        date={moment(thisDate)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  const daysCount = days.length;
  for (let i = 1; i <= 42 - daysCount; i++) {
    nextsMonth.date(i);
    days.push(
      <Day
        key={`next-${moment(nextsMonth).format("DD MM YYYY")}`}
        onClick={(date) => onClick(date)}
        currentDate={date}
        date={moment(nextsMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  return (
    <nav className="calendar--days">
      {labels.concat()}
      {days.concat()}
    </nav>
  );
};

const DatePicker = (props) => {
  const dialogRef = useRef(null);
  const { onClose, onApply } = props;
  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [date, setDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const resetDate = () => {
    setDate(moment());
  };
  const changeMonth = (month) => {
    const tempDate = date;
    console.log(">>cc1", tempDate);
    tempDate.month(month);
    console.log(">>cc2", month, tempDate, tempDate);
    setDate(tempDate.clone());
  };

  const changeDate = (date) => {
    let TstartDate = startDate;
    let TendDate = endDate;
    if (
      TstartDate === null ||
      date.isBefore(TstartDate, "day") ||
      !TstartDate.isSame(TendDate, "day")
    ) {
      TstartDate = moment(date);
      TendDate = moment(date);
    } else if (date.isSame(TstartDate, "day") && date.isSame(TendDate, "day")) {
      TstartDate = null;
      TendDate = null;
    } else if (date.isAfter(TstartDate, "day")) {
      TendDate = moment(date);
    }
    if (TstartDate) setStartDate(TstartDate.clone());
    if (TendDate) setEndDate(TendDate.clone());
  };
  const handleDateChange = (e) => {
    setStartDate(moment(e.target.value, "YYYY-MM-DD")); // Parse the date string to a moment object
  };
  const handleEndDateChange = (e) => {
    setEndDate(moment(e.target.value, "YYYY-MM-DD")); // Parse the date string to a moment object
  };

  return (
    <DateWrapper ref={dialogRef}>
      <div className="calendar">
        <Heading
          date={date}
          changeMonth={(month) => {
            console.log("--change--", month);
            changeMonth(month);
          }}
          resetDate={() => resetDate()}
        />
        <div className="form-control-date">
          <input
            type="date"
            value={startDate.format("YYYY-MM-DD")}
            onChange={handleDateChange}
          />
          <span>-</span>
          <input
            type="date"
            value={endDate.format("YYYY-MM-DD")}
            onChange={handleEndDateChange}
          />
        </div>
        <Days
          onClick={(date) => changeDate(date)}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
        <hr />
        <Footer>
          <Button
            title="Cancel"
            outline
            onClickBtn={() => {
              onClose();
            }}
            full="full"
          />
          <Button
            title="Apply"
            onClickBtn={() => {
              onApply({
                startDate,
                endDate,
              });
              onClose();
            }}
            full="full"
          />
        </Footer>
      </div>
    </DateWrapper>
  );
};

export default DatePicker;
const Footer = styled.div`
  display: flex;
`;
const DateWrapper = styled.div`
  position: absolute;
  z-index: 10000;
  width: max-content;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .form-control-date {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    margin-bottom: 12px;
    justify-content: center;
    span {
      color: #667085;
      font-size: 30px;
    }
    input {
      display: block;
      border-radius: 8px;
      padding: 10px 14px;
      border: 1px solid var(--gray-300, #d0d5dd);
      background: var(--base-white, #fff);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      width: calc(50% - 20px);
    }
  }
  .calendar {
    /* position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -225px;
    margin-left: -195px; */
    width: 360px;
    padding: 15px;
    box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    overflow: hidden;

    .calendar--nav {
      padding: 0 15px;
      // background-color: #b670f4;
      height: 48px;
      position: relative;

      a {
        position: absolute;
        cursor: pointer;
        left: 10px;
        font-size: 32px;
        line-height: 1;
        top: 6px;
        width: 30px;
        text-align: center;
        display: inline-block;
        color: transparentize(#fff, 0.6);
        user-select: none;
        &:last-child {
          left: auto;
          right: 10px;
        }
      }

      h1 {
        margin: 0;
        position: absolute;
        left: 40px;
        right: 40px;
        text-align: center;
        cursor: pointer;
        // font-weight: 400;
        // font-size: 30px;
        // line-height: 66px;
        color: #344054;
        font-family: Figtree;
        font-size: 16px;
        line-height: 49px;
        font-weight: 700;
        user-select: none;
      }
    }

    .calendar--days {
      font-size: 0;

      span {
        width: 14.28571%;
        display: inline-block;
        text-align: center;
        user-select: none;
        cursor: pointer;
        margin: 1px 0;
        padding: 6px 0;
        line-height: 34px;
        position: relative;
        font-size: 16px;

        &.label {
          font-weight: 700;
          color: #344054;
          font-size: 14px;
          line-height: 20px;
          font-family: Figtree;
          cursor: initial;
        }

        &.active {
          background-color: #e7f7ff;
          border-radius: 50%;
          position: relative;
          &::after {
            position: absolute;
            content: "•"; /* Unicode for bullet point */
            color: #1693c7; /* Set the color of the point */
            font-size: 16px; /* Set the size of the point */
            bottom: -9px;
            left: calc(50% - 3px);
          }
        }

        &.muted {
          color: rgba(0, 0, 0, 0.3);
        }

        &.between {
          border-radius: 0;
        }

        &.start,
        &.between,
        &.end {
          background-color: #1693c7;
          color: #fff;
        }
        &.between {
          background-color: #e7f7ff;
          color: #344054;
        }
        &.start {
          // border-radius: 12px 0 0 12px;
          position: relative;
          border-radius: 50%;
          &::after {
            content: ".";
            position: absolute;
            background-color: #e7f7ff;
            color: transparent;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 50%;
            z-index: -1;
          }
        }

        &.end {
          // border-radius: 0 12px 12px 0;
          border-radius: 50%;
          position: relative;
          &::after {
            content: ".";
            position: absolute;
            background-color: #e7f7ff;
            color: transparent;
            width: 100%;
            height: 100%;
            top: 0px;
            left: -50%;
            z-index: -1;
          }
        }

        &.start.end {
          // border-radius: 12px;
          border-radius: 50%;
        }

        &.between:nth-child(7n):after,
        &.start:nth-child(7n):after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 100%;
          background-color: #e7f7ff;
          width: 20px;
        }
        &.between:nth-child(7n):after {
          background-color: #e7f7ff;
        }
        &.between:nth-child(7n + 1):after,
        &.end:nth-child(7n + 1):after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          right: 100%;
          background-color: #e7f7ff;
          width: 20px;
        }
        &.between:nth-child(7n + 1):after {
          background-color: #e7f7ff;
        }
        &.start.end:after {
          display: none;
        }
      }
    }
  }
`;
