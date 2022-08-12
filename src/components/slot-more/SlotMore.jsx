import React, { useState } from "react";
import { ApprovedSlot } from "./ApprovedSlot";
import { CreatedSlot } from "./CreatedSlot";
import { EmptySlot } from "./EmptySlot";
import { ReservedSlot } from "./ReservedSlot";

export const SlotMore = ({
    create,
    slot,
    setModalOuter,
    modalDate,
    setStatus,
}) => {
    if (slot?.status === "created") {
        return (
            <CreatedSlot
                slot={slot}
                setModal={setModalOuter}
                setStatus={setStatus}
            />
        );
    } else if (slot?.status === "reserved") {
        return <ReservedSlot slot={slot} setModal={setModalOuter} />;
    } else if (slot?.status === "approved") {
        return <ApprovedSlot slot={slot} setModal={setModalOuter} />;
    } else {
        return (
            <EmptySlot
                create={create}
                modalDate={modalDate}
                setModalOuter={setModalOuter}
            />
        );
    }
};

// created
// reserved
// approved
// declined
