import { Todo } from "./ToDoList";

type DeleteProps = {
    todo: Todo;
    deleteToDo: (id: string) => void;
    isDisabled: boolean;
};

function Delete({ todo, deleteToDo, isDisabled }: DeleteProps) {
    const handleDeleteToDo = () => {
        deleteToDo(todo.id)
    }

    return(
        <div>
            <button onClick={handleDeleteToDo} disabled={isDisabled}>
                supprimer
            </button>
        </div>
    )
}

export default Delete;