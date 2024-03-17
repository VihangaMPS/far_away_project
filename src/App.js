const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: true},
    {id: 3, description: "Charger", quantity: 1, packed: false},
];

function App() {
    return (
        <div className="app">
            <Logo/>
            <Form/>
            <PackingList/>
            <Stats/>
        </div>
    );
}

//===========================================================

function Logo() {
    return (
        <h1>🏝 Far Away 🏝</h1>
    );
}

function Form() {



    return (
        <form className="add-form">
            <h3>What do you nee for your trip?</h3>
            <select name="" id="">
                {Array.from({length: 20}, (value, index) => index + 1) //Creating an array to loop
                    .map(num => (
                        <option value={num} key={num}>
                            {num}
                        </option>
                    ))}
            </select>
            <input type="text" placeholder="Item..."/>

            <button>Add</button>
        </form>
    );
}

function PackingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map(item => (
                    <Item item={item} key={item.id}/>
                ))}
            </ul>
        </div>
    );
}

function Item({item}) {
    return (
        <li>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>💼 You have x items on your list, and you already packed X (X%)</em>
        </footer>
    );
}

export default App;
