export const ADMIN_USERS = ['kenneth', 'admin', 'bolt'];

export const hasPermission = (username: string | undefined, permission: string): boolean => {
  if (!username) return false;

  switch (permission) {
    case 'bulk-messaging':
      return username.toLowerCase() === 'kenneth' || 
             username.toLowerCase() === 'bolt' || 
             ADMIN_USERS.includes(username.toLowerCase());
    default:
      return false;
  }
};