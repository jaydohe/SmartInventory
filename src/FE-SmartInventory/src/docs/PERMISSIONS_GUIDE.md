# Hướng dẫn Hệ thống Permissions

## Tổng quan

Hệ thống permissions được thiết kế để kiểm soát quyền truy cập dựa trên vai trò người dùng và phân biệt giữa manager/employee trong WAREHOUSE_STAFF.

## Các Role và phân biệt

### Roles chính:

- `ADMIN`: Có quyền cao nhất
- `WAREHOUSE_STAFF`: Nhân viên kho (có phân biệt manager/employee)
- `WAREHOUSE_PRODUCER`: Nhân viên sản xuất
- `SALESMAN`: Nhân viên bán hàng

### Phân biệt WAREHOUSE_STAFF:

- **Manager** (`isManager: true`): Có nhiều quyền hơn
- **Employee** (`isManager: false`): Có quyền hạn chế

## Cấu trúc files

```
src/
├── utils/permissions.ts          # Định nghĩa permissions cho từng trang
├── hooks/usePermissions.ts       # Hook để sử dụng permissions
├── components/PermissionWrapper.tsx # Component wrapper cho permissions
└── templates/PageTemplate.tsx    # Template để tạo trang mới
```

## Cách sử dụng

### 1. Trong Page Component

```typescript
import { usePermissions } from '@/hooks/usePermissions';

export default function YourPage() {
  const permissions = usePermissions('YourPageName');

  return (
    <div>
      {/* Button tạo mới */}
      {permissions.canCreate() && <Button onClick={handleCreate}>Thêm mới</Button>}

      {/* Table với permissions */}
      <YourTable data={data} permissions={permissions} />
    </div>
  );
}
```

### 2. Trong Table Component

```typescript
interface TableProps {
  permissions?: {
    canCreate: () => boolean;
    canRead: () => boolean;
    canUpdate: () => boolean;
    canDelete: () => boolean;
  };
}

const YourTable = ({ permissions, ...props }) => {
  const columns = [
    // ... other columns
    {
      title: 'Thao tác',
      render: (_, record) => (
        <div className="flex gap-2">
          {permissions?.canUpdate() && <Button onClick={() => handleEdit(record)}>Sửa</Button>}
          {permissions?.canDelete() && <Button onClick={() => handleDelete(record)}>Xóa</Button>}
        </div>
      ),
    },
  ];
};
```

## Trạng thái cập nhật các trang

### ✅ Đã cập nhật hoàn chỉnh:

- **ProductPage** - Quản lý sản phẩm & nguyên vật liệu
- **OrderPage** - Quản lý đơn hàng
- **InventoryPage** - Quản lý tồn kho
- **Employee** - Quản lý nhân viên
- **GoodsReceiptPage** - Quản lý phiếu nhập hàng
- **CategoryProductPage** - Quản lý danh mục sản phẩm (đã có từ trước)
- **AgencyPage** - Quản lý đại lý (đã có từ trước)
- **User** - Quản lý người dùng (đã có từ trước)

### 🔄 Cần cập nhật:

- **GoodsIssuePage** - Quản lý phiếu xuất hàng
- **ProductionCommandPage** - Quản lý lệnh sản xuất
- **Warehouse** - Quản lý kho
- **PositionPage** - Quản lý chức vụ
- **MaterialSupplierPage** - Quản lý nhà cung cấp
- **DepartmentPage** - Quản lý phòng ban
- **CategoryWarehousePage** - Quản lý danh mục kho

### ℹ️ Không cần permissions:

- **Dashboard** - Trang tổng quan (tất cả role đều có thể xem)
- **Self** - Trang cá nhân (tất cả role đều có thể xem)
- **Activity** - Lịch sử hoạt động (tùy thuộc vào yêu cầu)
- **LoginPage** - Trang đăng nhập

## Hướng dẫn cập nhật cho các trang còn lại

### Bước 1: Thêm permissions vào page

```typescript
// Trong file index.tsx của page
import { usePermissions } from '@/hooks/usePermissions';

export default function YourPage() {
  const permissions = usePermissions('YourPageName'); // Thay YourPageName

  // Áp dụng cho button tạo mới
  {
    permissions.canCreate() && <Button onClick={handleCreate}>Thêm mới</Button>;
  }
}
```

### Bước 2: Cập nhật Table component

```typescript
// Thêm permissions prop vào interface
interface YourTableProps {
  // ... existing props
  permissions?: {
    canCreate: () => boolean;
    canRead: () => boolean;
    canUpdate: () => boolean;
    canDelete: () => boolean;
  };
}

// Áp dụng trong action column
{
  permissions?.canUpdate() && <Button>Sửa</Button>;
}
{
  permissions?.canDelete() && <Button>Xóa</Button>;
}
```

### Bước 3: Truyền permissions vào Table

```typescript
<YourTable
  data={data}
  permissions={permissions}
  // ... other props
/>
```

## Mapping quyền theo trang

Dựa trên bảng quyền đã định nghĩa:

### Quyền CRUD đầy đủ:

- **ADMIN**: Tất cả các trang
- **WAREHOUSE_STAFF (Manager)**: ProductPage, InventoryPage, GoodsReceiptPage, GoodsIssuePage, Warehouse
- **SALESMAN**: OrderPage, AgencyPage

### Quyền Read-only:

- **WAREHOUSE_STAFF (Employee)**: ProductPage, InventoryPage, GoodsReceiptPage, GoodsIssuePage
- **WAREHOUSE_PRODUCER**: InventoryPage, GoodsReceiptPage, GoodsIssuePage, ProductionCommandPage

### Quyền hạn chế:

- **Employee**: Chỉ ADMIN có quyền CRUD
- **User**: Chỉ ADMIN có quyền CRUD
- **DepartmentPage, PositionPage**: Chỉ ADMIN có quyền CRUD

## Template sử dụng

Xem file `src/templates/PageTemplate.tsx` để có template hoàn chỉnh về cách implement permissions trong một trang mới.

## Lưu ý quan trọng

1. **Phân biệt Manager/Employee**: Sử dụng field `isManager` trong user data
2. **Tên trang**: Phải khớp với key trong `permissions.ts`
3. **Conditional rendering**: Luôn wrap buttons/actions trong permission checks
4. **Table components**: Nhớ thêm permissions prop và áp dụng trong action columns
5. **Consistency**: Giữ nhất quán cách đặt tên và cấu trúc permissions across tất cả pages

## Debugging

Để debug permissions, bạn có thể:

```typescript
const permissions = usePermissions('YourPageName');

console.log({
  userRole: permissions.userRole,
  isManager: permissions.isManager,
  canCreate: permissions.canCreate(),
  canRead: permissions.canRead(),
  canUpdate: permissions.canUpdate(),
  canDelete: permissions.canDelete(),
});
```
