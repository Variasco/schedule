import { updateSlotStatusApi } from "../../api/slots";
import { MyButton } from "../UI";
import s from "./SlotMore.module.css";

export const ReservedSlot = ({ user, date, setModal, slot }) => {
    const applySlot = () => {
        updateSlotStatusApi(slot.id, "approved");
        setModal(false);
    };
    const declineSlot = () => {
        updateSlotStatusApi(slot.id, "declined");
        setModal(false);
    };

    return (
        <div className={s.container}>
            <h3 className={s.header}>Занятие зарезервировано</h3>
            <p className={s.text}>
                Ученик: {user?.name} {user?.surname}
            </p>
            <p className={s.text}>Телефон: {user?.phoneNumber}</p>
            <p className={s.text}>Дата-время: {date}</p>
            <div>
                <MyButton onClick={applySlot} addClass={s.button}>
                    Принять
                </MyButton>
                <MyButton
                    onClick={declineSlot}
                    addClass={s.button}
                    style={{
                        marginLeft: "40px",
                        border: "1px solid red",
                        color: "red",
                    }}
                >
                    Отклонить
                </MyButton>
            </div>
        </div>
    );
};
