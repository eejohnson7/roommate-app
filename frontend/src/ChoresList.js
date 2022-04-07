import React, { useState } from "react";
import './Chores/newChoreStyle.css';
import Form from "./Chores/Form";
import ChoreList from "./Chores/Chore";

function ChoresList () {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    
    return (
      <div className="App" style={{body}}>
          <link
          href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
          integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
          crossorigin="anonymous"
        />
        <header>
          <h1 style={{fontSize: 100, justifyContent: "center"}}>chore list </h1>
        </header>
        <Form inputText={inputText}
        todos={todos} 
        setTodos={setTodos}
         setInputText = {setInputText}
        />
        <ChoreList setTodos={setTodos} todos={todos} />
      </div>
    );
}

export default ChoresList