import { ReactNode } from 'react';
import { usePermissions } from '@/hook/usePermissions';
import { PermissionAction } from '@/utils/permissions';

interface PermissionWrapperProps {
  children: ReactNode;
  pageName: string;
  action: PermissionAction;
  fallback?: ReactNode;
}

export const PermissionWrapper = ({
  children,
  pageName,
  action,
  fallback = null,
}: PermissionWrapperProps) => {
  const permissions = usePermissions(pageName);

  const hasPermission = () => {
    switch (action) {
      case 'create':
        return permissions.canCreate();
      case 'read':
        return permissions.canRead();
      case 'update':
        return permissions.canUpdate();
      case 'delete':
        return permissions.canDelete();
      default:
        return false;
    }
  };

  return hasPermission() ? <>{children}</> : <>{fallback}</>;
};

export default PermissionWrapper;
