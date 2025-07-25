import React from 'react';

const Input = ({
                   id,
                   type = "text",
                   value,
                   onChange,
                   placeholder = "",
                   required = false
               }) => {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};

export default Input;
