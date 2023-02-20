import { useState } from 'react';
import propTypes from 'prop-types';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import InputMask from 'react-input-mask';

export const ContactForm = ({ onAdd }) => {
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleSubmit = event => {
    event.preventDefault();
    onAdd({ id: nanoid(), name: contact.name, number: contact.number });
    setContact({ id: '', name: '', number: '' });
  };

  const handleChange = event => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form className={css.contactsForm} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className={css.input}
          id={contact.name}
          type="text"
          name="name"
          onChange={handleChange}
          value={contact.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Jan Kowalski"
        />
        <label htmlFor="name">Landline number</label>
        <InputMask
          className={css.input}
          id={contact.number}
          type="tel"
          name="number"
          onChange={handleChange}
          value={contact.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          mask="+48 (99) 999-99-99"
          placeholder="+48 (99) 999-99-99"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.contactsbutton} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  handleSubmit: propTypes.func,
  onAdd: propTypes.func.isRequired,
};
