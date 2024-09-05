import classNames from 'classnames'
import cls from './GameResultsPage.module.scss'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { getPageUrl } from '@/shared/config/router/routerConfig'

export const GameResultsPage = () => {
  const result = '13:33' // Заглушка для результата, потом будем передавать результат игры
  const bestResult = '12:01' // Заглушка для лучшего результата, потом будем передавать лучший результат игры

  return (
    <div className={classNames(cls.GameResultsPage)}>
      {/*todo LogoWithModal решили убрать в следующем спринте, пока они необходимы в связи с общей разработкой*/}
      <LogoWithModal
        open={true}
        centered={true}
        closable={false}
        footer={null}
        width={500}
        mask={false}
        transitionName={''}
        title="Congratulation">
        <div className={cls.gameOverPageWrapper}>
          <div className={cls.gameOverPageItem}>
            <label className={cls.label}>Your Result</label>
            <div className={cls.result}>{result}</div>
          </div>
          <div className={cls.gameOverPageItem}>
            <label className={cls.label}>Your Best Result</label>
            <div className={cls.bestResult}>{bestResult}</div>
          </div>
          <div className={cls.titleWrapper}>
            <div className={cls.trophy}>🏆</div>
          </div>
          <div className={cls.gameOverPageButton}>
            <NavLink to={getPageUrl('game')}>
              <Button type="primary">Play again</Button>
            </NavLink>
          </div>
        </div>
      </LogoWithModal>
    </div>
  )
}
