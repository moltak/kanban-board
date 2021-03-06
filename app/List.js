import React, {Component, PropTypes} from 'react';
import Card from './Card';

class List extends Component {
    render() {
        var cards = this.props.cards.map((card) => {
            return (<Card taskCallbacks={this.props.taskCallbacks} key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        color={card.color}
                        tasks={card.tasks} />);
        });

        return (
            <div className='list'>
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

List.propTypes = {
    title: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
};

export default List;
