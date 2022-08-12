import { useCallback, useEffect, useState } from "react";
import { createSlotApi, getSlotsApi } from "../api/slots";
import { Grid } from "../components";
import { ModalContext } from "../context/ModalContext";

export const Schedule = () => {
    const [slots, setSlots] = useState([]);
    const [modal, setModal] = useState(false);

    const createSlot = useCallback(async (slot) => {
        await createSlotApi(slot);
    }, []);

    const getSlots = async () => {
        await getSlotsApi((slots) => {
            setSlots(slots);
        });
    };

    useEffect(() => {
        getSlots();
    }, []);

    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            <div className="schd-wrapper">
                <Grid create={createSlot} slots={slots} />
            </div>
        </ModalContext.Provider>
    );
};
