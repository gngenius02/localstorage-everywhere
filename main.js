;(function (w, isBrowser) {
	let GET, SET, EACH, DEL, DUMP, readAllFromLocalStorage, saveAlltoLocalStorage
	w.store = {}
	if (!isBrowser) {
		var memoryStorage = {}
		GET = function (key) {
			return memoryStorage[key]
		}
		SET = function (key, data) {
			memoryStorage[key] = data
			return memoryStorage[key]
		}
		EACH = function (callback) {
			for (var key in memoryStorage) {
				if (memoryStorage.hasOwnProperty(key)) {
					callback(memoryStorage[key], key)
				}
			}
		}
		DEL = function (key) {
			delete memoryStorage[key]
		}
		DUMP = function (key) {
			memoryStorage = {}
		}
		let filename = require('path').format({ dir: require('os').homedir(), base: '.localStorage' })
		readAllFromLocalStorage = function (path = filename) {
			const data = JSON.parse(require('fs').readFileSync(path))
			memoryStorage = { ...memoryStorage, ...data }
		}
		saveAlltoLocalStorage = function (path = filename) {
			require('fs').writeFileSync(path, JSON.stringify(memoryStorage, '', 4), {
				flag: 'w'
			})
			console.log('wrote2file')
		}
		try {
			readAllFromLocalStorage(filename)
		} catch (e) {}
		w.store = { ...w.store, readAllFromLocalStorage, saveAlltoLocalStorage }
	} else {
		GET = function (key) {
			return localStorage.getItem(key)
		}
		SET = function (key, data) {
			return localStorage.setItem(key, data)
		}
		EACH = function (callback) {
			for (var key in localStorage) {
				if (localStorage.hasOwnProperty(key)) {
					callback(localStorage[key], key)
				}
			}
		}
		DEL = function (key) {
			return localStorage.removeItem(key)
		}
		DUMP = function (key) {
			return localStorage.clear()
		}
	}
	w.store = { ...w.store, GET, SET, EACH, DEL, DUMP }
})(typeof window !== 'undefined' ? window : global, typeof window !== 'undefined')
