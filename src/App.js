import {useState} from "react";

/*const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: true},
    {id: 3, description: "Charger", quantity: 1, packed: false},
];*/

function App() {
    const [items, setItems] = useState([]);


    function handleAddItems(item) {
        setItems(items => [...items, item]);
        //in javascript we cant change the Original array, we have to create a new one
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : {item}))
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItems={handleAddItems}/>
            <PackingList item={items} onDeleteItem={handleDeleteItem} onToggleItems={handleToggleItem}/>
            <Stats items={items}/>
        </div>
    );
}

//===========================================================

function Logo() {
    return (
        <h1>🏝 Far Away 🏝</h1>
    );
}

function Form({onAddItems}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);


    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {description, quantity, packed: false, id: Date.now()}

        onAddItems(newItem);

        setQuantity(1);
        setDescription("");
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you nee for your trip?</h3>
            <select name="" id="" value={quantity} // 1-20 drop box field
                    onChange={event => setQuantity(Number(event.target.value))}>
                {Array.from({length: 20}, (value, index) => index + 1) //Creating an array to loop
                    .map(num => (
                        <option value={num} key={num}>
                            {num}
                        </option>
                    ))}
            </select>
            <input // Item Input field
                type="text"
                placeholder="Item..."
                value={description}
                onChange={event => setDescription(event.target.value)}
            />

            <button>Add</button>
        </form>
    );
}

function PackingList({items, onDeleteItem, onToggleItems}) {
    return (
        <div className="list">
            <ul>
                {items.map(item => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItems}/>
                ))}
            </ul>
        </div>
    );
}

function Item({item, onDeleteItem, onToggleItem}) {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}/>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({items}) {

    if (!items.length){
        return (
            <p className="stats">
                <em>
                    Start adding items to your packing list
                </em>
            </p>
        )
    }

    const numItems = items.length;
    const numPacked = items.filter(item => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
        <footer className="stats">
            <em>
                {percentage === 100 ? 'You got everything ! Ready to go' :
                    `💼 You have ${numItems} items on your list,
                and you already packed ${" "}${ numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}

export default App;
