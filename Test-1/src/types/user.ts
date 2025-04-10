export interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    image: string;
    address: {
      city: string;
      state: string;
    };
    company: {
      title: string;
      name: string;
    };
  }
  