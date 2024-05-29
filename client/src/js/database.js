import { openDB } from 'idb';

const initdb = async () =>
  openDB('text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text-editor')) {
        console.log('text-editor database already exists');
        return;
      }
      db.createObjectStore('text-editor', { keyPath: 'id', autoIncrement: true });
      console.log('text-editor database created');
    },
  });

// Export a function we will use to POST to the database.
export const postDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const textEditorDb = await openDB('text-editor', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textEditorDb.transaction('text-editor', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('text-editor');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ textEditor: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

// Export a function we will use to GET all from the database.
export const getAllDb = async () => {
  console.log('GET all from the database');

  // Create a connection to the database database and version we want to use.
  const textEditorDb = await openDB('text-editor', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textEditorDb.transaction('text-editor', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('text-editor');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Export a function we will use to GET from the database.
export const getOneDb = async (id) => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const textEditorDb = await openDB('text-editor', 1);

   // Create a new transaction and specify the database and data privileges.
  const tx = textEditorDb.transaction('text-editor', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('text-editor');

   // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.get(id);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();