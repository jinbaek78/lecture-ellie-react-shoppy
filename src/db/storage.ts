export interface IStorage {
  saveToken: (token: string) => void;
  removeToken: () => void;
  getToken: () => string;
}

export default class Storage {
  getToken() {
    return localStorage.getItem('token') ?? '';
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
