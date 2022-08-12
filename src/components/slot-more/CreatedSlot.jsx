import { deleteSlotApi } from "../../api/slots";
import { MyButton } from "../UI";
import s from "./SlotMore.module.css";

export const CreatedSlot = ({ slot, setModal, setStatus }) => {
    const deleteSlotClick = async () => {
        await deleteSlotApi(slot);
        setModal(false);
        setStatus(slot.id, "");
    };

    return (
        <div className={s.container}>
            <h3 className={s.header}>Занятие не занято</h3>
            <p className={s.text}>
                Занятие создано, но пока никто из учеников его не занял
            </p>
            <MyButton
                onClick={deleteSlotClick}
                addClass={s.button}
                style={{ border: "1px solid red", color: "red" }}
            >
                Удалить
            </MyButton>
        </div>
    );
};
