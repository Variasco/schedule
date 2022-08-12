import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { MyButton, MyModal } from "../UI";
import s from "./SlotMore.module.css";

export const EmptySlot = ({ create, modalDate, setModalOuter }) => {
    const createSlotClick = () => {
        const today = new Date();
        const [day, month, hour] = modalDate.split("-");
        console.log("month: " + month + ", day: " + day + ", hour: " + hour);
        today.setMonth(month, day);
        today.setHours(hour, 0, 0);
        const newSlot = {
            date: today.toString(),
            status: "created",
        };
        create(newSlot);
        setModalOuter(false);
    };

    return (
        <div className={s.container}>
            <h3 className={s.header}>Занятие отсутствует</h3>
            <MyButton onClick={createSlotClick} addClass={s.button}>
                Создать
            </MyButton>
        </div>
    );
};
