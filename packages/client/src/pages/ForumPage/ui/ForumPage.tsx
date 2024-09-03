import { useEffect, useState } from 'react';
import { LogoWithModal } from '@/widgets/LogoWithModal';
import {
  ForumPageStages,
  forumsListMock,
  forumTopicsListMock,
} from '../model/forumData';
import { CreateNewThreadForm } from './CreateNewThreadForm/CreateNewThreadForm';
import { ForumsList } from './ForumsList/ForumsList';
import { ForumTopicsList } from './ForumTopicsList/ForumTopicsList';

export const ForumPage = () => {
  const [pageTitle, setPageTitle] = useState('Forums');
  const [currentStage, setCurrentStage] = useState(ForumPageStages.forumsList);

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

  return (
    <LogoWithModal
      open={true}
      centered={true}
      closable={false}
      footer={null}
      width={500}
      mask={false}
      transitionName={''}
      title={pageTitle}
    >
      {getCurrentStage()}
    </LogoWithModal>
  );
};
