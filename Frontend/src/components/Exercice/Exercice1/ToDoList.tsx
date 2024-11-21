import { useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";

export type Todo = {
    id: string;
    name: string;
    isEditing: boolean;
    
}

function Exercice1() {
    const [listTodos, setListTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const changeToDo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const sendToDo = () => {
        const newTodo: Todo = {id: Date.now().toString() ,name: inputValue.trim(), isEditing: false}
        setListTodos([...listTodos, newTodo]) 
        setInputValue("");
    }

    const deleteToDo = (todoId: string) => {
        const updatedToDo = listTodos.filter(todo => todo.id !== todoId);
        setListTodos(updatedToDo);
    };

    const handleEdit = (id: string) => {
        const itemEdit = listTodos.find((item) => item.id === id)
        if (itemEdit) {
            setInputValue(itemEdit.name)
            setEditId(id);
        }
        setIsDisabled(true);
    }

    const handleSaveEdit = () => {
        if (editId) {
            setListTodos(
                listTodos.map((item) => item.id === editId ? {...item, name: inputValue} : item)
            )
            setInputValue("");
            setEditId(null);
        }
    }

    const handleCancelEdit = () => {
        setInputValue("");
        setEditId(null);
        setIsDisabled(false);
    }

    return(
        <div>
            <h1>Exercice1</h1>
            {listTodos.length === 0 ? (
                <p>la liste est vide</p>
            ) : (
            <ul>
                {listTodos.map((todo) => (
                    <div style={{display: "flex"}}>
                        <li key={todo.id}>{todo.name}</li> 
                        <Delete todo={todo} deleteToDo={deleteToDo} isDisabled={isDisabled}></Delete>
                        <Edit todo={todo} handleCancelEdit={handleCancelEdit} handleEdit={handleEdit} editId={editId}/>
                    </div>
                ))}
                </ul>
            )}
            <input type="text" onChange={changeToDo} value={inputValue} placeholder="Ajouter une tâche"></input>
            {editId ? (
                <button children={"Editer"} onClick={handleSaveEdit}/>
            ) : (
                <button children={"Ajouter"} onClick={sendToDo}/>
            )} 
            
        </div>
    )
}

export default Exercice1;



