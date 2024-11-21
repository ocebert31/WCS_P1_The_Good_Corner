import { Todo } from "./ToDoList";

type EditProps = {
    todo: Todo;
    handleCancelEdit: () => void;
    handleEdit: (id: string) => void
    editId: string | null;
};

function Edit({ todo, handleCancelEdit, handleEdit, editId }: EditProps) {
    return(
        <div>
            {editId === todo.id ? (
                <button type="button" onClick={handleCancelEdit}>Annuler</button>
            ) : (
                <button type="button" onClick={() => handleEdit(todo.id)}>Modifier</button>
            )}
        </div>
    )
}

export default Edit;