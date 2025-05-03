import { ROLE, ROLE_HIERARCHY, RoleEnum, RoleObject } from '@/Constant';

export const getPermissionCanHandleRole = (role: string): RoleObject[] => {
  // Normalize the role input
  const normalizedRole = role.toLowerCase();

  // If no role is provided, return an empty array
  if (!normalizedRole) return [];

  // Find the allowed roles based on hierarchy
  const allowedRoleNames =
    ROLE_HIERARCHY[
      Object.keys(ROLE_HIERARCHY).find((r) => r.toLowerCase() === normalizedRole) || ''
    ] || [];

  // Filter and return roles
  return ROLE.filter((r) =>
    allowedRoleNames.some((name) => name.toLowerCase() === r.name.toLowerCase())
  );
};
