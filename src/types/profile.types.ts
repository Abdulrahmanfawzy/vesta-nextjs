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


export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: ProfileUser;
  } | null;
}

export interface UpdateProfileInput {
  name: string;
  phone: string;
  password?: string;
  avatar?: File;
}
