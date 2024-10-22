import { Avatar, Badge, Button } from 'antd';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { FC, useEffect, useRef, useState } from 'react';
import { getAllReactions, addReaction } from '@/shared/api/reaction';
import { deleteReaction } from '@/shared/api/reaction/reaction';
import { UserResponse } from '@/shared/interfaces';
import { ReactionResponse, TopicField } from '@/shared/interfaces/Reaction';
import { AddReactionImage } from '@/shared/ui';
import { showErrorMessage } from '@/shared/utils';
import cls from './ButtonReaction.module.scss';

interface Props {
  id: number;
  topicField: TopicField;
  initialReactions: ReactionResponse[] | [];
  currentUserId?: UserResponse['id'];
}

const avatarFontSize = '18px';

export const ButtonReaction: FC<Props> = ({
  id,
  initialReactions,
  currentUserId,
  topicField,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentReactions, setCurrentReactions] = useState<
    ReactionResponse[] | []
  >(initialReactions);
  const emojiPickerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerRef]);

  function handleClickOutside(event: MouseEvent) {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as HTMLElement)
    ) {
      setIsOpen(false);
    }
  }

  const toggleReactionPicker = (): void => {
    setIsOpen(!isOpen);
  };

  const handleAddReaction = async (
    emoji: EmojiClickData['emoji'],
  ): Promise<void> => {
    if (!currentUserId) {
      return;
    }

    if (
      currentReactions.some(
        (reaction) =>
          reaction.emoji === emoji && reaction.userIds.includes(currentUserId),
      )
    ) {
      return;
    }

    setCurrentReactions((prev) => {
      const existingEmoji = prev.find((reaction) => reaction.emoji === emoji);
      if (existingEmoji) {
        return prev.map((reaction) =>
          reaction.emoji === emoji
            ? {
                ...reaction,
                count: reaction.count + 1,
                userIds: [...reaction.userIds, currentUserId],
              }
            : reaction,
        );
      } else {
        return [
          ...prev,
          {
            emoji,
            count: 1,
            userIds: [currentUserId],
          },
        ];
      }
    });

    const reactionData = {
      id,
      field: topicField,
      user_id: currentUserId,
      reaction: emoji,
    };

    try {
      await addReaction(reactionData);
      const response = await getAllReactions({ id, field: topicField });
      setCurrentReactions(response);
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const handleEmojiRemove = async (
    emoji: EmojiClickData['emoji'],
  ): Promise<void> => {
    if (!currentUserId) {
      return;
    }

    setCurrentReactions((prev) =>
      prev
        .map((reaction) => {
          if (reaction.emoji !== emoji) {
            return reaction;
          }

          const newUserIds = reaction.userIds.filter(
            (id) => id !== currentUserId,
          );

          if (newUserIds.length === 0) {
            return null;
          }

          return {
            ...reaction,
            count: reaction.count - 1,
            userIds: newUserIds,
          };
        })
        .filter((reaction): reaction is ReactionResponse => reaction !== null),
    );

    const reactionData = {
      id,
      field: topicField,
      user_id: currentUserId,
      reaction: emoji,
    };
    try {
      const response = await deleteReaction(reactionData);
      setCurrentReactions(response);
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <div className={cls.reactionWrapper}>
      <div className={cls.reactionBlank}>
        <Button
          type="default"
          icon={<AddReactionImage />}
          className={cls.reactionButton}
          onClick={toggleReactionPicker}
        />
        <span ref={emojiPickerRef}>
          <EmojiPicker
            className={cls.reactionPickerModal}
            open={isOpen}
            onEmojiClick={(reaction) => {
              toggleReactionPicker();
              void handleAddReaction(reaction.emoji);
            }}
          />
        </span>
      </div>
      <div className={cls.reactionCells}>
        {currentReactions?.map((reaction) => (
          <span
            key={reaction.emoji}
            onClick={() =>
              currentUserId && reaction.userIds.includes(currentUserId)
                ? void handleEmojiRemove(reaction.emoji)
                : void handleAddReaction(reaction.emoji)
            }
            role="button"
          >
            <Badge
              className={cls.reactionImage}
              size="small"
              offset={[2, -2]}
              count={reaction.count}
            >
              <Avatar shape="circle" style={{ fontSize: avatarFontSize }}>
                {reaction.emoji}
              </Avatar>
            </Badge>
          </span>
        ))}
      </div>
    </div>
  );
};
