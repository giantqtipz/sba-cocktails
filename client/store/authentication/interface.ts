export interface AuthenticationState {
  signedIn: boolean;
  key: string;
}

export interface LoginAttributes {
  email: string;
  password: string;
}
