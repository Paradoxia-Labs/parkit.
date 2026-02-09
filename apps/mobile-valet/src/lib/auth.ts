import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'VALET' | 'ADMIN';
  companyId: string;
}

export const saveUser = async (user: User) => {
  await SecureStore.setItemAsync('user', JSON.stringify(user));
};

export const getStoredUser = async (): Promise<User | null> => {
  const user = await SecureStore.getItemAsync('user');
  return user ? JSON.parse(user) : null;
};

export const clearUser = async () => {
  await SecureStore.deleteItemAsync('user');
};
