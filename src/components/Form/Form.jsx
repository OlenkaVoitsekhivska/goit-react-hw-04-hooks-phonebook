import { useState } from 'react';
import { nanoid } from 'nanoid';
import style from './Form.module.css';
import PropTypes from 'prop-types';

function Form({ onSubmit }) {
  const [input, setInput] = useState({ name: '', number: '' });

  const handleInputChange = e => {
    let key = e.target.name;
    setInput(prevState => ({ ...prevState, [key]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...input, id: nanoid() });
    setInput({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Phonebook</h2>
      <label htmlFor="">
        Name
        <input
          className={style.nameInput}
          onChange={handleInputChange}
          value={input.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="">
        Number
        <input
          className={style.numberInput}
          onChange={handleInputChange}
          value={input.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={style.submitBtn}>
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
