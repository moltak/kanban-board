import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

class ContactsApp extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            text: ''
        };
    }

    handleEvent(text) {
        this.setState({text: text});
    }

    render() {
        return(
            <div>
                <SearchBar text={this.state.text} handleEvent={this.handleEvent.bind(this)}/>
                <ContactList contacts={this.props.contacts} text={this.state.text} />
            </div>
        );
    }
}

ContactsApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    text: PropTypes.string 
};

class SearchBar extends Component {
    handleEvent(event) {
        this.props.handleEvent(event.target.value);
    }

    render() {
        return(<input type='search' placeholder='search' value={this.props.text} onChange={this.handleEvent.bind(this)}/>);
    }
}

SearchBar.propTypes = {
    text: PropTypes.string.isRequired,
    handleEvent: PropTypes.func.isRequired
};

class ContactList extends Component {
    render() {
        let filtered = this.props.contacts.filter(
            (contact) => contact.name.indexOf(this.props.text) !== -1
        );

        return(
           <ul>
            {filtered.map((contact) => <ContactItem key={contact.email}
                                                    name={contact.name}
                                                    email={contact.email} />)}
           </ul>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    text: PropTypes.string
};

class ContactItem extends Component {
    render() {
        return(<li>{this.props.name} - {this.props.email}</li>);
    }
}

ContactItem.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

let contacts = [
    {name: 'Cassio Zen', email: 'cassiozen@gmail.com'},
    {name: 'Dan Abramov', email: 'gaearon@gmail.com'},
    {name: 'Pete Hunt', email: 'pete@gmail.com'},
    {name: 'Paul O\'Shannessy', email: 'zpao@gmail.com'},
    {name: 'Rayn Florence', email: 'florence@gmail.com'},
    {name: 'Sebastian Markbge', email: 'markbe@gmail.com'}
];

render(<ContactsApp contacts={contacts} />, document.getElementById('root'));



