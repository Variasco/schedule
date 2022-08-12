import React, { useEffect, useState } from "react";
import { getSlotByIdApi } from "../../api/slots";
import { SlotMore } from "../../components";
import { MyModal } from "../UI";
import { cells, colls, time } from "./data";
import s from "./Grid.module.css";

export const Grid = ({ slots, create }) => {
    const [modal, setModal] = useState(false);
    const [modalDate, setModalDate] = useState(null);
    const [currentSlot, setCurrentSlot] = useState(null);

    // Функция возвращающая удобный объект даты
    const getDateObj = (date) => {
        return {
            dayOfMonth: date.getDate(),
            dayOfWeek: date.getDay() || 7,
            monthNumber: date.getMonth(),
            year: date.getFullYear(),
        };
    };
    const today = getDateObj(new Date());

    // Оставляем только слоты текущей недели
    const filteredSlots = slots.filter((slot) => {
        const date = new Date(slot.date);
        return (
            date.getFullYear() === today.year &&
            date.getMonth() === today.monthNumber &&
            date.getDate() > today.dayOfMonth - today.dayOfWeek &&
            date.getDate() <= today.dayOfMonth - (today.dayOfWeek - 7)
        );
    });

    // Добавляем в каждый слот дополнительные свойства для удобства выборки
    slots = filteredSlots.map((slot) => ({
        ...slot,
        daym: new Date(slot?.date).getDate(),
        dayw: new Date(slot?.date).getDay() || 7,
        hour: new Date(slot?.date).getHours(),
    }));

    // Добавляем слоты в таблицу
    slots.forEach((slot) => {
        const cell = document.getElementById(`${slot.dayw}-${slot.hour}`);
        cell.innerText = slot.status;
        cell.setAttribute("data-id", slot.id);
    });

    const getSlotById = async (slotId) => {
        await getSlotByIdApi(slotId, (s) => {
            setCurrentSlot(s);
        });
    };

    const cellClickHandler = (e) => {
        const id = e.target?.dataset.id || null;
        const date = e.target?.dataset.date || null;
        if (id) {
            getSlotById(id);
        } else {
            setCurrentSlot(null);
        }
        setModalDate(date);
        setModal(true);
    };

    // Костыль, чтобы убрать баг, с отающимся статусом слота, после его удаления
    const setStatus = (id, val) => {
        document.querySelector(`[data-id=${id}]`).innerText = val;
    };

    // Вешаем слушатель на клик по ячейкам таблицы
    useEffect(() => {
        const cont = document.querySelector(`.${s.cells}`);
        cont.addEventListener("click", cellClickHandler);

        return () => cont.removeEventListener("click", cellClickHandler);
    });

    return (
        <div className={s.container}>
            <h2 className={[s.h2, s.month].join(" ")}>
                {new Date().toLocaleString("ru", { month: "long" })}
            </h2>
            <div className={s.header}>
                <div className={s.empty}></div>
                <div className={s.dates}>
                    {
                        // Рисуем шапку таблицы
                        colls.map((col, index) => {
                            if (today.dayOfWeek === index + 1) {
                                // Сегодняшний день
                                return (
                                    <div
                                        key={col.weekday}
                                        className={[s.col, s.active].join(" ")}
                                    >
                                        <span className={s.colDate}>
                                            {today.dayOfMonth}
                                        </span>
                                        <span className={s.colWeekday}>
                                            {col.weekday}
                                        </span>
                                    </div>
                                );
                            }
                            return (
                                <div key={col.weekday} className={s.col}>
                                    <span className={s.colDate}>
                                        {new Date(
                                            today.year,
                                            today.monthNumber,
                                            today.dayOfMonth -
                                                (today.dayOfWeek - (index + 1)),
                                        ).getDate()}
                                    </span>
                                    <span className={s.colWeekday}>
                                        {col.weekday}
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className={s.body}>
                <div className={s.time}>
                    {time.map((tm) => (
                        <div key={tm.time} className={s.timeCell}>
                            <span className={s.timeText}>{tm.time}</span>
                        </div>
                    ))}
                </div>
                {/*TODO Когда-нибудь оптимизировать этот ужас */}
                <div className={s.cells}>
                    {colls.map((wd) => (
                        <div key={wd.daynumber} className={s.col}>
                            {cells.map((cell) => {
                                const date = new Date(
                                    today.year,
                                    today.monthNumber,
                                    today.dayOfMonth -
                                        (today.dayOfWeek - wd.daynumber),
                                );
                                const day = date.getDate();
                                const month = date.getMonth();
                                return (
                                    <div
                                        data-date={`${day}-${month}-${cell.timeGrid}`}
                                        id={`${wd.daynumber}-${cell.timeGrid}`}
                                        key={cell.timeGrid}
                                        className={s.cell}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <MyModal visible={modal} setVisible={setModal}>
                <SlotMore
                    setStatus={setStatus}
                    create={create}
                    slot={currentSlot}
                    modalDate={modalDate}
                    setModalOuter={setModal}
                />
            </MyModal>
        </div>
    );
};
