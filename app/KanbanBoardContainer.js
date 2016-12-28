import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'so-nice-pro-react.sofun'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards/', {headers: API_HEADERS})
        .then(r => r.json())
        .then(r => {
            this.setState({cards: r});
        })
        .catch(err => {
            console.error('Error fetching and parsing data', err);
        });
    }

    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
        let newTask = {id:Date.now(), name:taskName, done:false};
        let nextState = update(this.state.cards, {
                [cardIndex]: {
                    tasks: {$push: [newTask]}
                }
        });
        this.setState({cards:nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error('Server response wasn\'t OK')
            }
        })
        .then(r => {
            newTask.id = r.id;
            this.setState({cards:nextState});
        })
        .catch(e => {
            console.error(e);
            this.setState(prevState);
        });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
        let nextState = update(this.state.cards, {
                [cardIndex]: {
                    tasks: {$splice: [[taskIndex, 1]]}
                }
        });

        this.setState({cards:nextState});
        
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then(r => {
            if(!r.ok) {
                throw new Error('Server response wasn\'t OK')
            }
        })
        .catch(e => {
            console.error(e);
            this.setState(prevState);
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
                [cardIndex]: {
                    tasks: {
                        [taskIndex]: {
                            done: {$apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }}
                        }
                    }
                }
        });

        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
        .then(r => {
            if(!r.ok) {
                throw new Error('Server response wasn\'t OK')
            }
        })
        .catch(e => {
            console.error(e);
            this.setState(prevState);
        });
    }

    render() {
        return(
            <KanbanBoard cards={this.state.cards} 
                taskCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this) }} />);
    }
}

export default KanbanBoardContainer;
