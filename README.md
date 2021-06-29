# localstorage-everywhere
get to use localstorage in nodejs and the browser with 1 package.

include the main.js file.

### Example Usage

```js
// Set a key
store.SET('testing', 10);

// Get a key
const data = store.GET('testing')
console.log(data);

// Delete a key
store.DEL('testing')

// Each: perform action on every key;
store.EACH((value,key) => { if (key.includes('id')) console.log(key, value) })
store.Each((value,key) => { if (typeof value === 'number') return (value, key) })

// erase everything.
store.DUMP()




// NodeJS usage only: to read from disk into memory, or to store from memory to disk.
store.readAllFromLocalStorage()
store.saveAlltoLocalStorage()

```
