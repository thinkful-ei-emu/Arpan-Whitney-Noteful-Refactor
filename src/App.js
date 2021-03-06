import React from "react";
import "./App.css";
// import store from './dummy-store';
import { Route } from "react-router-dom";
import Main from "./components/main";
import MainSideBar from "./components/mainsidebar";
import Header from "./components/header";
import Note from "./components/note";
import StoreContext from "./context/StoreContext";
import {withRouter} from 'react-router-dom';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  };

  componentDidMount() {
    //fetch request
    fetch("http://localhost:9090/folders")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJson => {
        this.setState({
          folders: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });
    fetch("http://localhost:9090/notes")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJson => {
        this.setState({
          notes: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete = (noteId) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    
    console.log(this)
    
    let filterDeleted = this.state.notes.filter(note =>
      note.id !== noteId)
      this.setState({
        notes: filterDeleted
      },() =>this.props.history.push('/'))
      
  }

  render() {
    return (
      <StoreContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          delete: this.handleDelete
        }}
      >
        <div className="App">
          <Header />
          <Route exact path="/" component={MainSideBar} />
          <Route
            exact
            path="/"
            component={Main}
          />
          <Route
            exact
            path="/folder/:folderId"
            render={props => (
              <>
                <MainSideBar match={props.match} />
                <Main match={props.match} />
              </>
            )}
          />

          <Route
            exact
            path="/note/:noteId"
            component={Note}
          />
        </div>
      </StoreContext.Provider>
    );
  }
}

export default withRouter(App);
