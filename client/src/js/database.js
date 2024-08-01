// Open (or create) the database
var request = indexedDB.open('jate', 1);

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  if (!db.objectStoreNames.contains('jate')) {
    db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
  }
};

request.onerror = function(event) {
  console.log('Database error: ' + event.target.errorCode);
};

request.onsuccess = function(event) {
  console.log('Database initialized successfully');
};

function putDb(content) {
  var request = indexedDB.open('jate', 1);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction('jate', 'readwrite');
    var store = transaction.objectStore('jate');
    var putRequest = store.put({ id: 1, value: content });

    putRequest.onsuccess = function(event) {
      console.log('Data saved to the database', event.target.result);
    };

    putRequest.onerror = function(event) {
      console.log('Error saving data to the database', event.target.errorCode);
    };
  };

  request.onerror = function(event) {
    console.log('Database error: ' + event.target.errorCode);
  };
}

function getDb() {
  var request = indexedDB.open('jate', 1);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction('jate', 'readonly');
    var store = transaction.objectStore('jate');
    var getRequest = store.getAll();

    getRequest.onsuccess = function(event) {
      console.log('Data retrieved from the database', event.target.result);
    };

    getRequest.onerror = function(event) {
      console.log('Error retrieving data from the database', event.target.errorCode);
    };
  };

  request.onerror = function(event) {
    console.log('Database error: ' + event.target.errorCode);
  };
}