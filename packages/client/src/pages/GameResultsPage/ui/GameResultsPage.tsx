import classNames from 'classnames'
import cls from './GameResultsPage.module.scss'
import { Button, Form } from 'antd'
import { NavLink } from 'react-router-dom'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { getPageUrl } from '@/shared/config/router/routerConfig'

export const GameResultsPage = () => {
  const result = '13:33' // Заглушка для результата, потом будем передавать результат игры
  const bestResult = '12:01' // Заглушка для лучшего результата, потом будем передавать лучший результат игры

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
        title="Congratulation!">
        <Form className={cls.gameOverPageWrapper} layout="vertical">
          <Form.Item className={cls.gameOverPageItem} label="Your Result">
            <div className={cls.result}>{result}</div>
          </Form.Item>

          <Form.Item className={cls.gameOverPageItem} label="Your Best Result">
            <div className={cls.bestResult}>{bestResult}</div>
          </Form.Item>

          <Form.Item className={cls.gameOverPageButton}>
            <NavLink to={getPageUrl('game')}>
              <Button type="primary">Play again</Button>
            </NavLink>
          </Form.Item>
        </Form>
      </LogoWithModal>
    </div>
  )
}
