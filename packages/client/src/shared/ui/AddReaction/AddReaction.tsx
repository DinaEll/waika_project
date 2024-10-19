import EmojiAdd from '@/shared/assets/svg/emoji-add.svg';
import cls from './AddReaction.module.scss';

export const AddReaction = () => {
  return (
    <img src={EmojiAdd} alt={'Add reaction'} className={cls.addReaction} />
  );
};
