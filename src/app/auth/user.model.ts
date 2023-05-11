export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate
  ) {}

  // we can use the 'get' method to access private data fields for this class
  // user will be unable to change the value of this private field data
  // our token will be used to get user data for each page/request
  get token() {
    // if token expiration doesn't exist or we are passed the exp date...
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
