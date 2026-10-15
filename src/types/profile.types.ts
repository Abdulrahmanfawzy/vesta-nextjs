export interface ProfileUser {
  id: number;
  name: string;
  email: string;
  seller: string;
  phone: string;
  avatar_url: string | null;
  role: string;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: ProfileUser;
  };
}