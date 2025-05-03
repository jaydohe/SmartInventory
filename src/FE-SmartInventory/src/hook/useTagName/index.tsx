import React from 'react';
import { Tag } from 'antd';
const regex = /@(.*?)@/;
export function getTagName(content: string): React.ReactNode {
  const match = content.match(regex);
  if (match) {
    // Lấy tên user được tag
    const extractedString = '@' + match[1];
    // lẫy chuỗi còn lại
    const remainingContent = content.replace(match[0], '').trim();

    return (
      <span>
        <Tag color="blue" className="mx-0">
          {extractedString}
        </Tag>{' '}
        {remainingContent}
      </span>
    );
  } else {
    return content;
  }
}
