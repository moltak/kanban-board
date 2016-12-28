import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

class ContactsApp extends Component {
    render() {
        return(
            <div>
                <SearchBar />
                <ContactList contacts={this.props.contacts} />
            </div>
        );
    }
}

ContactsApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
};

class SearchBar extends Component {
    render() {
        return(<input type='search' placeholder='search' />);
    }
}

class ContactList extends Component {
    render() {
        return(
           <ul>
            {this.props.contacts.map(
                (contact) => <ContactItem key={contact.email}
                                          name={contact.name}
                                          email={contact.email} />)}
           </ul>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
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



