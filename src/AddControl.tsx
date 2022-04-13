import React, { useState, useEffect } from "react";
import './AddControl.css'

interface Props {
    onButtonClick: (text: string) => void;
}

const AddControl = (props: Props) => {

    // State for new item
    const [itemToAdd, setItemToAdd] = useState<string>('');
    const [numOfChar, setNumOfChar] = useState<number>(0);

    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        updateHeight();
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        setNumOfChar(itemToAdd.length);
        updateHeight();
    }, [itemToAdd])

    // Text box input change
    function onInputChange (text: string, e: React.ChangeEvent<HTMLTextAreaElement>) {
        setItemToAdd(text);
    };

    // Confirm on Enter key
    function onKeyDown (e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            onInputConfirm()
        }
    }

    // Confirm input
    function onInputConfirm () {
        if (itemToAdd.length > 0) {
            props.onButtonClick(itemToAdd);
            setItemToAdd('');
        }
    }

    // Updates height of input control
    function updateHeight () {
        var textarea = document.getElementById('textarea');
        var limit = 250;

        if (textarea) {
            textarea.style.height = '';
            textarea.style.height = Math.min(textarea.scrollHeight, limit) + 'px';
        }
    }

    return (
        <div className='addControl'>
            
            {/* Input */}
            <textarea className='addControl-input'
                id='textarea' 
                value={itemToAdd}
                placeholder='Write a new task and press enter'
                maxLength={256}
                rows={2}
                onChange={(e) => onInputChange(e.target.value, e)} 
                onKeyDown={(e) => onKeyDown(e)} />

            {/* Char count */}
            <label className='addControl-label'>
                {`${numOfChar}/256`}
            </label>
        </div>
    )
}

export default AddControl