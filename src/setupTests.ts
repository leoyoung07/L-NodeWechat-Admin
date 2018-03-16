interface IGlobal {
  document: Document;
  window: Window;

  localStorage: {};
}

declare var global: IGlobal;

let _storage = {};

const localStorageMock = {
  getItem: function (key: string) {
    return _storage[key];
  },
  setItem: function (key: string, value: string) {
    _storage[key] = value;
  },
  removeItem: function (key: string) {
    delete _storage[key];
  },
  clear: function () {
    _storage = {};
  }
};
global.localStorage = localStorageMock;
