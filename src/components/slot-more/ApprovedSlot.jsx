import { updateSlotStatusApi } from "../../api/slots";
import { MyButton } from "../UI";
import s from "./SlotMore.module.css";

export const ApprovedSlot = ({ user, date, setModal, slot }) => {
    const declineSlot = () => {
        updateSlotStatusApi(slot.id, "declined");
        setModal(false);
    };

    return (
        <div className={s.container}>
            <h3 className={s.header}>Занятие подтверждено</h3>
            <p className={s.text}>
                Ученик: {user?.name} {user?.surname}
            </p>
            <p className={s.text}>Телефон: {user?.phoneNumber}</p>
            <p className={s.text}>Дата-время: {date}</p>
            <div>
                <MyButton
                    onClick={declineSlot}
                    addClass={s.button}
                    style={{
                        border: "1px solid red",
                        color: "red",
                    }}
                >
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};
