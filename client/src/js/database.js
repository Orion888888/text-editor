import { openDB } from 'idb';

const initdb = async () =>
  openDB('text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text-editor')) {
        console.log('text-editor database already exists');
        return;
      }
      db.createObjectStore('text-editor', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//  a method that accepts some content and adds it to the database
export const putDb = async (data) => {
  const textEditorDb = await openDB('text-editor', 1);
  const tx = textEditorDb.transaction('text-editor', 'readwrite');
  const store = tx.objectStore('text-editor');
  const request = store.add({data: data});
  const result = await request;
  return result
};

// a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const textEditorDb = await openDB('text-editor', 1);
  const tx = textEditorDb.transaction('text-editor', 'readonly');
  const store = tx.objectStore('text-editor');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();