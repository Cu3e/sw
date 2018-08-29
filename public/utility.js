const dbPromise = idb.open('idb-store', 1, db => {
  if (!db.objectStoreNames.contains('idb-feed')){
    db.createObjectStore('idb-feed', {keyPath: 'id'});  
  }
});

const writeData = (st, data) => {
  return dbPromise.then(db => {
    const tx = db.transaction(st, 'readwrite')
    const store = tx.objectStore(st)
    store.put(data);
    return tx.complete;
  })
}




const idbKeyval = {
  get(key) {
    return dbPromise.then(db => {
      return db.transaction('keyval2')
        .objectStore('keyval2').get(key);
    });
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').put(val, key);
      return tx.complete;
    });
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').delete(key);
      return tx.complete;
    });
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').clear();
      return tx.complete;
    });
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval');
      const keys = [];
      const store = tx.objectStore('keyval');
 
      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });
 
      return tx.complete.then(() => keys);
    });
  }
};