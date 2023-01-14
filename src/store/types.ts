export type StoreState = {
  user: {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  };
  showLoadingSpinner: boolean;
};
