import classNames from 'classnames'
import cls from './GameResultsPage.module.scss'
import { Button, Form } from 'antd'
import { NavLink } from 'react-router-dom'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { getPageUrl } from '@/shared/config/router/routerConfig'

interface GameResultsPageProps {
  test?: string
}

export const GameResultsPage = (props: GameResultsPageProps) => {
  const result = '300 баллов' // Заглушка для результата, потом будем передавать результат игры
  const bestResult = '1300 баллов' // Заглушка для лучшего результата, потом будем передавать лучший результат игры

  return (
    <div className={classNames(cls.GameResultsPage)}>
      <LogoWithModal
        open={true}
        centered={true}
        closable={false}
        footer={null}
        width={344}
        mask={false}
        transitionName={''}
        title="Вы победили!">
        <Form className={cls.gameOverPageWrapper} layout="vertical">
          <Form.Item className={cls.gameOverPageItem} label="Ваш результат:">
            <div className={cls.result}>{result}</div>
          </Form.Item>

          <Form.Item
            className={cls.gameOverPageItem}
            label="Ваш лучший результат:">
            <div className={cls.bestResult}>{bestResult}</div>
          </Form.Item>

          <Form.Item className={cls.gameOverPageButton}>
            <NavLink to={getPageUrl('game')}>
              <Button type="primary">Сыграть еще раз</Button>
            </NavLink>
          </Form.Item>

          <Form.Item className={cls.gameOverPageButton}>
            <NavLink to={getPageUrl('main')}>
              <Button type="link">Главное меню</Button>
            </NavLink>
          </Form.Item>
        </Form>
      </LogoWithModal>
    </div>
  )
}
