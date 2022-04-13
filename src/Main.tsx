import AddControl from './AddControl'
import ITodoItem from './ITodoItem'
import {useState, useEffect} from 'react'
import ListItem from './ListItem'
import './Main.css'
import {MdChecklist} from 'react-icons/md'

const Main = () => {

    // Items
    const [items, setItems] = useState<ITodoItem[]>(() => {
        // Try to retrieve initial state from local storage
        let savedValues: ITodoItem[] = [];

        try {
            const savedItems = localStorage.getItem('items');
            savedValues= JSON.parse(savedItems || '');
        }
        catch (err) {
            console.log(err);
        }
        
        return savedValues;
    })

    useEffect(() => {
        // Save items into local storage on each update
        localStorage.setItem("items", JSON.stringify(items));
    }, [items])

    /* Functions */

    function AddItem(text: string) {
        const newItem : ITodoItem = {
            id: GetFreeId(),
            text: text,
            done: false
        }

        setItems([...items, newItem]);
    }

    function RemoveItem(id: number) {
        const newItems = items.filter(i => i.id !== id);

        setItems(newItems);
    }

    // Reorder items on update
    function UpdateItem(newItem: ITodoItem) {
        const oldItemsDone = items.filter(i => i.done === true && i.id !== newItem.id);
        const oldItemsNotDone = items.filter(i => i.done === false && i.id !== newItem.id);
        
        // Move to the bottom when done
        if (newItem.done) {
            setItems([...oldItemsNotDone, ...oldItemsDone, newItem]);
        }
        
        // Move to to top when un-done
        if (!newItem.done) {
            setItems([newItem, ...oldItemsNotDone, ...oldItemsDone]);
        }
    }

    // Gets next id for new item
    function GetFreeId(): number {
        // Gets all used IDs
        let usedIds: number[] = [];

        for (let i = 0; i < items.length; i++) {
            usedIds = [...usedIds, items[i].id];
        }

        usedIds.sort((a,b) => a-b);

        // Find lowest free ID
        let freeId: number = -1;
        for (let i = 0; i < usedIds.length; i++) {
            if (usedIds[i] !== i) {
                freeId = i;
                break;
            }
        }

        if (freeId === -1) {
            freeId = usedIds.length;
        }

        return freeId;
    }

    /* Elements */

    const itemsElement = items.map((i) => 
        <ListItem key={i.id}
            item={i}
            onButtonClick={RemoveItem}
            onItemChange={UpdateItem} />
    );

    return (
        <div className='main'>

            <MdChecklist className='logo' />

            <h1 className='h1'>
                To Do List
            </h1>

            <AddControl
                onButtonClick={AddItem}
            />

            {itemsElement.length > 0
                ?
                itemsElement
                :
                <h1 className='h1'>
                    Nothing To Do
                </h1>
            }
        </div>
    )
}

export default Main