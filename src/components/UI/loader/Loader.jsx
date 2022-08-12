import React from "react";
import s from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={s.loaderOuter}>
            <div className={s.loaderBorder}></div>
            <div className={s.loaderInner}></div>
        </div>
    );
};
