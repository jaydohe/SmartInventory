import { authStoreSelectors } from '../Stores/userStore';
import { canCreate, canRead, canUpdate, canDelete, getAccessiblePages } from '../utils/permissions';

export const usePermissions = (pageName: string) => {
  const userRole = authStoreSelectors.use.role();
  const isManager = authStoreSelectors.use.isManager();

  return {
    canCreate: () => canCreate(pageName, userRole, isManager),
    canRead: () => canRead(pageName, userRole, isManager),
    canUpdate: () => canUpdate(pageName, userRole, isManager),
    canDelete: () => canDelete(pageName, userRole, isManager),
    userRole,
    isManager,
  };
};

export const useUserPermissions = () => {
  const userRole = authStoreSelectors.use.role();
  const isManager = authStoreSelectors.use.isManager();

  return {
    userRole,
    isManager,
    getAccessiblePages: () => getAccessiblePages(userRole, isManager),
    canAccess: (pageName: string) => canRead(pageName, userRole, isManager),
    canCreate: (pageName: string) => canCreate(pageName, userRole, isManager),
    canUpdate: (pageName: string) => canUpdate(pageName, userRole, isManager),
    canDelete: (pageName: string) => canDelete(pageName, userRole, isManager),
  };
};
