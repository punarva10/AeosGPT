export interface UserWithDetails {
  id: number;
  name: string;
  email: string;
  password: string;
  verified: boolean | null;
  token: string;
}
