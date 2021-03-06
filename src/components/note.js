import React from "react";
import "./styles/note.css";
import StoreContext from "../context/StoreContext";

class Note extends React.Component {
  static contextType = StoreContext;

  render() {
    const note = this.context.notes.find(
      note => `/note/${note.id}` === this.props.match.url
    );

    //   props.notes
    //     .filter(note => `/note/${note.id}` === props.match.url)
    //     .map(note => {
    if (!note) {
      return "page not found";
    }

    const date = new Date(note.modified);
    const convertedDate = date.toDateString();

    const folder = this.context.folders.find(folder => {
      if (folder.id === note.folderId) {
        return true;
      } else return false;
    });

    //         console.log(folder.name);

    //   return (
    //     <div key={note.id}>
    //       <button>Go Back</button>
    //       <h2>{folder.name}</h2>

    //       <div>
    //         <h2>{note.name}</h2>
    //         <p>Date Modified On: {convertedDate}</p>
    //         <button type="click">Delete Note</button>
    //       </div>

    //       <p>{note.content}</p>

    //     </div>
    //   );

    return (
      <div key={note.id}>
        <div className="button-folder-container">
          <button
            className="go-back"
            onClick={() => this.props.history.goBack()}
          >
            Go Back
          </button>
          <h2 className="folder-name">{folder.name}</h2>
        </div>

        <div className="expanded-note">
          <h2 className="note-name">{note.name}</h2>
          <p>Date Modified On: {convertedDate}</p>
          <button type="button" onClick={() => this.context.delete(note.id)}>
            Delete Note
          </button>
        </div>

        <p className="note-content">{note.content}</p>
      </div>
    );
  }
}

export default Note;
