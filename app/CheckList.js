import React, {Component} from 'react';

class CheckList extends Component {
    render() {
        console.log('tasks --> ');
        console.log(this.props.tasks);
        let tasks = this.props.tasks.map((task) => {
            <li calssName="checklist__task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        });
        console.log('mapped --> ');
        console.log(tasks);
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
}

export default CheckList;
