import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

const initialState = () => {
  try {
    const localContacts = JSON.parse(localStorage.getItem('localContacts'));
    const contacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '+48 (42) 459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+48 (42) 443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '+48 (42) 645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '+48 (42) 227-91-26' },
    ];
    if (localContacts == null) {
      return contacts;
    } else {
      return localContacts;
    }
  } catch (error) {
    console.log(error);
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(initialState());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('localContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    if (
      contacts.find(
        contact => contact.name.toUpperCase() === newContact.name.toUpperCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return true;
    }
    setContacts([...contacts, newContact]);
  };

  const contactsList = contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase())
  );

  const handelFilterContacts = value => setFilter(value);

  const handelRemoveContact = id =>
    setContacts(contacts.filter(contact => contact.id !== id));

  return (
    <div style={{ margin: 50 }}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handelFilterContacts} />
      <ContactList
        contacts={contactsList}
        onRemoveContact={handelRemoveContact}
      ></ContactList>
    </div>
  );
};
