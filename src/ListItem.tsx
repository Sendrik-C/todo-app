import { useState, useEffect } from "react"
import ITodoItem from "./ITodoItem";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdDelete } from 'react-icons/md';
import './ListItem.css'

interface Props {
    item: ITodoItem;
    onButtonClick: (id: number) => void;
    onItemChange: (item: ITodoItem) => void;
}

const ListItem = (props:Props) => {

    const [done, setDone] = useState<boolean>(props.item.done);

    // Update item on text or checkbox change
    useEffect(() => {
        const updatedItem : ITodoItem = {
            id: props.item.id,
            text: props.item.text,
            done: done
        };

        props.onItemChange(updatedItem);
    }, [done]);

    // Add resize handler on init
    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        updateHeight();
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // Updates height of input control
    function updateHeight () {
        var textarea = document.getElementById(`textarea${props.item.id}`);
        var limit = 250;

        if (textarea) {
            textarea.style.height = '';
            textarea.style.height = Math.min(textarea.scrollHeight, limit) + 'px';
        }
    }

    return (
        <div className='listItem'>
            {/* Checkbox */}
            {done 
                ?
                <MdOutlineCheckBox className='listItem-checkBox'
                    onClick={() => {setDone(false)}}/>
                :
                <MdOutlineCheckBoxOutlineBlank className='listItem-checkBox'
                    onClick={() => {setDone(true)}}/>
            }

            {/* Text field */}
            <textarea className={!done ? 'listItem-input' : 'listItem-input listItem-input-done'}
                id={`textarea${props.item.id}`}
                value={props.item.text}
                rows={1}
                readOnly={true}
                onMouseDown={(e) => {e.preventDefault()}}/>

            {/* Remove button */}
            <MdDelete className='listItem-delete'
                onClick={() => props.onButtonClick(props.item.id)} />
            
        </div>
    )
}

export default ListItem