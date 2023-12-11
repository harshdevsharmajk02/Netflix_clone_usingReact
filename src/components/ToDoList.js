import React from "react";

const ToDoList = (props)=>{
    return ( <>
     <div className="todo_style">
     <i className="fa fa-times" aria-hidden = "true" />
    
     <ul>{props.text}</ul>
     </div>
    </>
       
    );
};  

export default ToDoList;