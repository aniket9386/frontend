import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Sucessfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h3 className='my-3'>Add a Note</h3>
            <form>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Enter Title" id="title" name="title" value={note.title} required onChange={onChange} />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Enter Description" id="description" name="description" value={note.description} required onChange={onChange} />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Enter Tag" id="tag" name="tag" value={note.tag} onChange={onChange} required />
                    <label htmlFor="tag">Tag</label>
                </div>

                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary px-5" onClick={handleClick}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote