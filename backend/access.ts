import { ListAccessArgs } from './types';

// checks if user is signed in via boolean
export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}
