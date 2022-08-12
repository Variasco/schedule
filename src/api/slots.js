import { onValue, push, ref, remove, update } from "firebase/database";
import { db } from "./firebase";

export const getSlotsApi = async (callback) => {
    onValue(ref(db, "slots/"), (snap) => {
        const data = snap.val();
        const slots = Object.keys(data || {}).map((id) => ({
            id: id,
            user: data[id].user || null,
            date: data[id].date,
            status: data[id].status,
        }));
        callback(slots);
    });
};

export const getSlotByIdApi = async (id, callback) => {
    onValue(ref(db, `slots/${id}`), (snap) => {
        const data = snap.val();
        const slot = {
            id: id,
            user: data?.user || null,
            date: data?.date,
            status: data?.status,
        };
        callback(slot);
    });
};

export const createSlotApi = async (slot) => {
    await push(ref(db, "slots/"), slot);
};

export const updateSlotStatusApi = async (slotId, status) => {
    await update(ref(db, `slots/${slotId}`), { status });
};

export const deleteSlotApi = async (slot) => {
    await update(ref(db, `slots/`), { [slot.id]: null });
    // await remove(ref(db, `slots/${slot.id}`));
};
