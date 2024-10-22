import { FC, useEffect, useState } from 'react';
import { usePage } from '@/shared/hooks';
import { initPageBase } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import {
  ForumPageStages,
  forumsListMock,
  forumTopicsListMock,
} from '../model/forumData';
import { CreateNewThreadForm } from './CreateNewThreadForm/CreateNewThreadForm';
import { ForumsList } from './ForumsList/ForumsList';
import { ForumTopicsList } from './ForumTopicsList/ForumTopicsList';

export const ForumPage: FC = () => {
  const [pageTitle, setPageTitle] = useState('Forums');
  const [currentStage, setCurrentStage] = useState(ForumPageStages.forumsList);

  usePage({ initPage: initPageBase });

  useEffect(() => {
    switch (currentStage) {
      case ForumPageStages.forumsList:
        setPageTitle('Forums');
        break;
      case ForumPageStages.forumTopicsList:
        setPageTitle('Forum name');
        break;
      case ForumPageStages.createThread:
        setPageTitle('Create New Thread');
        break;
      default:
        break;
    }
  }, [currentStage]);

  const changeStage = (stage: ForumPageStages) => {
    setCurrentStage(stage);
  };

  const getCurrentStage = () => {
    switch (currentStage) {
      case ForumPageStages.forumsList:
        return (
          <ForumsList changeStage={changeStage} forumsList={forumsListMock} />
        );
      case ForumPageStages.forumTopicsList:
        return (
          <ForumTopicsList
            changeStage={changeStage}
            forumTopicsList={forumTopicsListMock}
          />
        );
      case ForumPageStages.createThread:
        return <CreateNewThreadForm changeStage={changeStage} />;
      default:
        throw new Error('Stage Not Supported');

        break;
    }
  };

  return <MainContainer title={pageTitle}>{getCurrentStage()}</MainContainer>;
};
