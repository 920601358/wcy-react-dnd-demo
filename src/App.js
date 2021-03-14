import React, { Component } from 'react';
import Source from './source';
import Event from 'candy-event-emitter';

import Tatget from './target';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './App.css';

const message = Object.assign({}, Event);
class App extends Component {

    render() {
        return (
            <div className='card'>
                <Source message={message}/>
                <Tatget message={message}/>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
