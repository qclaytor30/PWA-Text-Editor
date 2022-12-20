import {request} from 'express';
import {openDB} from 'idb';
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created')
    },
  });

export const postDb = async (value) => {
  console.log('posting to the jateDB');
  
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.add({ value: value })
  const result = await req;
  console.log('data saved to the jateDB', res);
};
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.put({ id: id, value: value })
  const result = await req;
  console.log('data saved to the jateDB', res);
};
