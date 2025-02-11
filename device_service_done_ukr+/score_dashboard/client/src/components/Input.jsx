import React from "react";

const Input = (props) => {
    let { placeholder, type, handleInput, name } = props;

    return (
        <>
            <div>
                <input name={name} onChange={handleInput} type={type} placeholder={placeholder} />
            </div>
        </>
    )
}

export default Input;