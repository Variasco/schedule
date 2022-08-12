import React from "react";

export const MySelect = ({ options, defaultValue, value, onChange }) => {
    const selectOnChange = (e) => onChange(e.target.value);
    console.log("render");

    return (
        <select value={value} onChange={selectOnChange}>
            <option disabled value={defaultValue}>
                {defaultValue}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};
