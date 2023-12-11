import { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
function App() {

  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState([]);

  const itemEvent = (event) => {
    setInputList(event.target.value);
  }

  const listOfItems = () => {
     setItems((oldItems) => {
      return [...oldItems, inputList];
     } );

     setInputList('');
  };

  return (<>
    <div className="main_div">
      <div className="center_div" >
        <br />
        <h1>ToDo List</h1>
        <br />
        <input type='text' placeholder='Add  a Items' onChange={itemEvent} value={inputList} />
        <button className='newBtn' onClick={listOfItems} > + </button>
        <ol>
    {  Items.map((ItemVal)=> {
        return <ToDoList  
          text = {ItemVal}
         />
      })
    }

        </ol>
      </div>

    </div>
  </>
  )
}

export default App;
