export interface UserDetailsType {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    mobile_number: string | null;
    email: string;
    dob: string | null;
    password: string | null;
    profile_img: string;
    gender: string | null;
    active: 'Y' | 'N';
  }
  