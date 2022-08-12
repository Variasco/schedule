import s from "./MyButton.module.css";

export const MyButton = ({ children, addClass, ...props }) => {
    const classes = `${addClass} ${s.myBtn}`;
    return (
        <button {...props} className={classes}>
            {children}
        </button>
    );
};
