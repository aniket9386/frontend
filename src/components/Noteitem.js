import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3 my-2'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}<br /> Tag: {note.tag}</p>
                    <div className='d-flex align-items-center gap-3'>
                        <i className="fa-solid fa-trash text-danger" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Sucessfully", "danger"); }}></i>
                        <i className="fa-solid fa-pen-to-square text-primary" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text mt-2">{note.date}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem