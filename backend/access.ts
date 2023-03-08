import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

// checks if user is signed in via boolean
export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs): boolean {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('Matt');
  },
};

/**
 * rules can return a boolean
 * or a filter to limit crud access
 */
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // check for permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // else, check for ownership
    return { user: { id: session.itemId } };
  },

  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // else, can only see available products
    return { status: 'AVAILABLE' };
  },
};
