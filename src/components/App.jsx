import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { PhonebookTitle, ContactsTitle, Wrapper } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+38-096-256-26-26' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38-044-333-26-26' },
      { id: 'id-3', name: 'Eden Clements', number: '+38-095-313-36-36' },
      { id: 'id-4', name: 'Annie Copeland', number: '+38-056-513-37-37' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const duplicate = this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase().trim()
    );
    const contactObj = {
      ...newContact,
      id: nanoid(),
    };
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, contactObj],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  handleFind = e => {
    this.setState({ filter: e.target.value });
  };

  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContacts;
  };

  render() {
    return (
      <Wrapper>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm addContact={this.addContact} />
        <Filter filter={this.state.filter} handleFind={this.handleFind} />
        <ContactsTitle>Contacts</ContactsTitle>
        <ContactList
          contacts={this.filterContactsByName()}
          onDeleteContact={this.onDeleteContact}
        />
      </Wrapper>
    );
  }
}
