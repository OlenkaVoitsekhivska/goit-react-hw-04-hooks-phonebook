import { useEffect, useState } from 'react';

import ContactsList from './ContactsList/ContactsList';

import Form from './Form/Form';
import Filter from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const processSubmit = data => {
    let [check] = contacts.filter(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (check) {
      alert(`${data.name} is already in your contacts`);
    } else {
      setContacts(contacts => [...contacts, data]);
    }
  };

  const setFilterFunc = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const getFilteredList = () => {
    return contacts.filter(el => el.name.toLowerCase().includes(filter));
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(el => el.id !== id));
  };

  const filteredList = getFilteredList();

  return (
    <>
      <Form onSubmit={processSubmit} />
      <Filter onChange={setFilterFunc} filter={filter} />
      <ContactsList list={filteredList} onDeleteContact={deleteContact} />
    </>
  );
}

export default App;
