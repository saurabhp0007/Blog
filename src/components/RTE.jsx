import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

export default function RTE({ name, label, value, onChange }) {
    const handleChange = (content) => {
        onChange({
            target: {
                name,
                value: content,
            },
        });
    };

    return (
        <div className="mb-4">
            {label && <label className="block mb-2 text-sm font-bold">{label}</label>}
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={handleChange}
                className="bg-white"
            />
        </div>
    );
}
