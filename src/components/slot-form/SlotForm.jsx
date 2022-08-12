import React, { useState } from "react";
import { MyButton, MyInput } from "../UI";
import s from "./SlotForm.module.css";

export const SlotForm = ({ create }) => {
    const [slot, setSlot] = useState({ date: "" });

    const createSlot = (e) => {
        e.preventDefault();
        const newSlot = {
            ...slot,
            status: "created",
        };
        create(newSlot);
        setSlot({ date: "" });
    };

    return (
        <form>
            <label htmlFor="slot">Дата и время начала занятия</label>
            <MyInput
                // id="slot"
                onChange={(e) => setSlot({ ...slot, date: e.target.value })}
                value={slot.date}
                type="datetime-local"
                placeholder="Время начала"
            />
            <MyButton onClick={createSlot}>Создать</MyButton>
        </form>
    );
};
