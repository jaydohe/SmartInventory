// contentType:
export  const enum ActivityContentTypes {
  CREATED = 0,
  UPDATED = 1,
  DELETED = -1,
}

// entityType:
export const enum ActivityEntityTypes {
  USER = 'USER', // user
}

export const genActivityContentType = {
  [ActivityContentTypes.CREATED]: { name: 'Thêm mới', color: 'cyan' },
  [ActivityContentTypes.UPDATED]: { name: 'Cập nhật', color: 'processing' },
  [ActivityContentTypes.DELETED]: { name: 'Xoá', color: 'error' },
};
export const genActivityEntityTypes = {
  [ActivityEntityTypes.USER]: 'người dùng'
};

export const arActivityContentType = [
  { name: 'Thêm mới', color: 'cyan', id: ActivityContentTypes.CREATED },
  { name: 'Cập nhật', color: 'processing', id: ActivityContentTypes.UPDATED },
  { name: 'Xoá', color: 'error', id: ActivityContentTypes.DELETED },
];
