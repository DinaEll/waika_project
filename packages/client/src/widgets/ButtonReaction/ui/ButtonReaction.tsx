import { Avatar, Badge, Button } from 'antd';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { FC, useEffect, useState } from 'react';
import { getAllReactions, setReaction } from '@/shared/api/reaction';
import { ReactionResponse } from '@/shared/interfaces/Reaction';
import { useAppSelector } from '@/shared/store/hooks';
import { userSelector } from '@/shared/store/user/user.selector';
import { AddReaction } from '@/shared/ui';
import { showErrorMessage } from '@/shared/utils';
import cls from './ButtonReaction.module.scss';

interface Props {
  comment_id?: number;
}

export const ButtonReaction: FC<Props> = ({ comment_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<EmojiClickData | null>(null);
  const user = useAppSelector(userSelector);
  const [allReactions, setAllReactions] = useState<ReactionResponse[] | null>(
    null,
  );

  useEffect(() => {
    if (user && chosenEmoji) {
      const reactionData = {
        comment_id,
        user_id: user.id,
        reaction: chosenEmoji.emoji,
      };

      void setReaction(reactionData);
    }

    const fetchReactions = async () => {
      if (user && comment_id) {
        try {
          const reactions = await getAllReactions({ comment_id });
          setAllReactions(reactions);
        } catch (error) {
          showErrorMessage(error);
        }
      }
    };

    void fetchReactions();
  }, [user, chosenEmoji, comment_id]);

  const toggleReactionPicker = () => {
    setIsOpen(!isOpen);
  };

  const handleReaction = (emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject);
    toggleReactionPicker();
  };

  return (
    <div className={cls.reactionWrapper}>
      <div className={cls.reactionBlank}>
        <Button
          type="default"
          icon={<AddReaction />}
          className={cls.reactionButton}
          onClick={toggleReactionPicker}
        />
        <EmojiPicker
          className={cls.reactionPickerModal}
          open={isOpen}
          onEmojiClick={handleReaction}
        />
      </div>
      <div className={cls.reactionCells}>
        {allReactions?.map((reaction) => (
          <Badge
            key={reaction.count}
            size="small"
            color="var(--gray-color)"
            offset={[2, -2]}
            count={reaction.count}
          >
            <Avatar shape="circle" icon={reaction.emoji} />
          </Badge>
        ))}
      </div>
    </div>
  );
};
