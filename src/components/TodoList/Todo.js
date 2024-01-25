import React, {useState, useEffect} from 'react';
import "./style.css";


// ***************************get the local storage data to back********************************
const getLocalData = ()=> {
    const lists = localStorage.getItem("mytodolist");
    

    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
};


const Todo = () => {
const [inputdata, setInputData] = useState("");
const [items, setItems ] =useState(getLocalData());

const [isEditItem, setIsEditItem] = useState("");
const [toggleButton, setToggleButton] = useState(false);


//***************** */ ADD the items *********************************
const addItem = () => {
    if(!inputdata){
        alert("plz fill the data");
    }else if(inputdata && toggleButton){
        setItems(
            items.map( (curElem) => {
                if(curElem.id === isEditItem){
                    return { ...curElem, name: inputdata};
                }
                return curElem;
            })
        );



    setInputData("");
    setIsEditItem(null);
    setToggleButton(true)
    
    }



    else{
        const myNewInputData ={
            id : new Date().getTime().toString(),
            name: inputdata,
        };


        setItems([...items, myNewInputData]);
        setInputData("");
    }
};


// ############################################## EDIT SECTION WORK ------------- (edit the items )----
const editItem = (index) =>{
    const item_todo_edited = items.find( (curElem) =>{
        return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true)
    
};

// **********************how to delete items Section **************************
const deleteItem = (index) =>{
    const updatedItems = items.filter( (curElem)=> {
        return curElem.id !== index;
    });
    setItems(updatedItems);
}



// ************************************Remove items in the data*********************************
const removeAll = () => {
    setItems([]);
};


// **************************  Adding Local Storage *************************

useEffect(  ()=> {
    localStorage.setItem("mytodolist", JSON.stringify(items));
}, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todologo   " />
                <figcaption>Add your list Here 🤞</figcaption>
            </figure>
            <div className="addItems">
                <input 
                type="text" 
                placeholder='Add Item 👍'
                className='form-control'
                value ={inputdata}
                onChange ={(event)=> setInputData(event.target.value)}
               />

                {toggleButton ? (
                    <i className="far fa-edit add-btn" onClick= {addItem} ></i>
                ):(
                    <i className="fa fa-plus add-btn" onClick= {addItem} ></i>
                )}

                
            </div>

            <div>

                {/* ****************show our items *************************** */}
                <div className="showItems">

                {items.map( (curElem) => {
                    return(
                        <div className="eachItem"  key={curElem.id}>
                        <h3> {curElem.name} </h3>
                        <div className="todo-btn">
                        <i 
                        className="far fa-edit add-btn"  
                        onClick= { ()=> editItem(curElem.id)}
                        ></i>
                        <i
                        className="far fa-trash-alt add-btn"  
                        onClick = { ()=> deleteItem(curElem.id)} ></i>
                        </div>
                    </div>
                    );
                })}

    
                </div>

                {/* ******************* remove all button ******************** */}
                <div className="showItems">
                    <button 
                    className="btn effect04" data-sm-link-text = "Remove All"
                    onClick= {removeAll}  >
                    <span>Check List</span>
                    </button>
                </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Todo
