import { FC, useEffect, useState } from 'react';
import { usePage } from '@/shared/hooks';
import { initPageBase } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import { ForumPageStages } from '../model/forumData';
import { CreateNewThreadForm } from './CreateNewThreadForm/CreateNewThreadForm';
import { ForumTopicsList } from './ForumTopicsList/ForumTopicsList';

export const ForumPage: FC = () => {
  const [pageTitle, setPageTitle] = useState('Forums');
  const [currentStage, setCurrentStage] = useState(
    ForumPageStages.forumTopicsList,
  );

  usePage({ initPage: initPageBase });

  useEffect(() => {
    switch (currentStage) {
      case ForumPageStages.forumTopicsList:
        setPageTitle('Forums');
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
      case ForumPageStages.forumTopicsList:
        return <ForumTopicsList changeStage={changeStage} />;
      case ForumPageStages.createThread:
        return <CreateNewThreadForm changeStage={changeStage} />;
      default:
        throw new Error('Stage Not Supported');
    }
  };

  return <MainContainer title={pageTitle}>{getCurrentStage()}</MainContainer>;
};
