import {request} from 'express';
import {openDB} from 'idb';
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      
    },
  });

export const postDb = async (value) => {
  console.log('posting to the jateDB');
  
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.add({ value: value })
  const result = await req;
};
export const getDb = async (id, value) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.put({ id: id, value: value })
  const result = await req;
};
export const putDb = async (id, value) => {
  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.put({ id: id, value: value })
  const res = await req;
  console.log('data saved to the jateDB', res);
};
initdb();