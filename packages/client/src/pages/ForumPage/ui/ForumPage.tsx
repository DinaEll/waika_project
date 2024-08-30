import { LogoWithModal } from '@/widgets/LogoWithModal'
import cls from './ForumPage.module.scss'
import { Typography } from 'antd'
import {
  ForumPageStages,
  forumsListMock,
  forumTopicsListMock,
} from '../model/forumData'
import { useEffect, useState } from 'react'
import { CreateNewThreadForm } from './CreateNewThreadForm/CreateNewThreadForm'
import { ForumTopicsList } from './ForumTopicsList/ForumTopicsList'
import { ForumsList } from './ForumsList/ForumsList'

export const ForumPage = () => {
  const [pageTitle, setPageTitle] = useState('Forums')
  const [currentStage, setCurrentStage] = useState(ForumPageStages.forumsList)

  useEffect(() => {
    if (currentStage === ForumPageStages.forumsList) {
      setPageTitle('Forums')
    }
    if (currentStage === ForumPageStages.forumTopicsList) {
      setPageTitle('Forum name')
    }
    if (currentStage === ForumPageStages.createThread) {
      setPageTitle('Create New Thread')
    }
  }, [currentStage])

  const changeStage = (stage: ForumPageStages) => {
    setCurrentStage(stage)
  }

  return (
    <LogoWithModal
      open={true}
      centered={true}
      closable={false}
      footer={null}
      width={500}
      mask={false}
      transitionName={''}
      title={
        <Typography.Title level={3} className={cls.noMargin}>
          {pageTitle}
        </Typography.Title>
      }>
      {currentStage === ForumPageStages.forumsList && (
        <ForumsList changeStage={changeStage} forumsList={forumsListMock} />
      )}
      {currentStage === ForumPageStages.forumTopicsList && (
        <ForumTopicsList
          changeStage={changeStage}
          forumTopicsList={forumTopicsListMock}
        />
      )}

      {currentStage === ForumPageStages.createThread && (
        <CreateNewThreadForm changeStage={changeStage} />
      )}
    </LogoWithModal>
  )
}
