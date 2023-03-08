import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

/**
 * rules versus permissions:
 * permissions: you must be checked under your role
 * rules: either the checkbox or yourself
 */

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
    if (!isSignedIn({ session })) {
      return false;
    }

    // check for permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // else, check for ownership
    return { user: { id: session.itemId } };
  },

  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // check for permission
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // else, check for ownership
    return { user: { id: session.itemId } };
  },

  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // check for permission
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // else, check for ownership
    return { order: { user: { id: session.itemId } } };
  },

  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // check for permission
    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // else, can only update themselves
    return { id: session.itemId };
  },
};
