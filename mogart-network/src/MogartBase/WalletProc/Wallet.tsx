import { PostRequest } from '../Api/Api';

declare global {
  interface Window { mina: any; }
}

export type SendPaymentParams = {
  content: string;
  email: string;
  deliverydate: string;
};

export async function checkMinaProvider(): Promise<boolean> {
  if (!window.mina) {
    alert('No provider was found. Please install Auro Wallet.');
    return false;
  }
  return true;
}

export async function getAccounts(): Promise<string[]> {
  let accounts = await window.mina.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found.');
  }
  return accounts;
}

export async function requestAccounts(): Promise<string[]> {
  if (!(await checkMinaProvider())) {
    throw new Error('No provider was found. Please install Auro Wallet.');
  }

  try {
    const accounts = await window.mina.requestAccounts();
    return accounts;
  } catch (error) {
    throw error;
  }
}
