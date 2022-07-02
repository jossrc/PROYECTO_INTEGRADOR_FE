export interface AuthResponse {
  mensaje: string;
  user:    User;
  token:   string;
}

export interface User {
  username:              string;
  authorities:           Authority[];
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
  enabled:               boolean;
}

export interface Authority {
  role: string;
}
