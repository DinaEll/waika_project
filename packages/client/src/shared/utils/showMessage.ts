import { Modal } from 'antd';

interface Props {
  title: string;
  content: string;
  type?: 'info' | 'error' | 'warning' | 'confirm';
}

export function showMessage({ title, content, type = 'info' }: Props) {
  const modal = Modal[type];
  modal({
    title,
    content,
    cancelButtonProps: { style: { display: 'none' } },
  });
}
