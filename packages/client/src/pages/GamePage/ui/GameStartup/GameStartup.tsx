import { Button } from 'antd';
import axios from 'axios';
import { FC } from 'react';
import RulesImg from '@/shared/assets/images/rules.png';
import { MainContainer } from '@/widgets';
import cls from './GameStartup.module.scss';

interface Props {
  onStartClick: () => void;
}

export const GameStartup: FC<Props> = ({ onStartClick }) => {
  const handleClick = () => {
    axios
      .get('http://localhost:3001/forum/users', {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MainContainer title="Start game">
      <button onClick={handleClick}>asdasdas</button>
      <div className={cls.wrapper}>
        <div className={cls.rules}>
          <img src={RulesImg} alt="Rules" className={cls.rulesImg} />
        </div>

        <div className={cls.btnWrapper}>
          <Button type="primary" onClick={onStartClick}>
            Start
          </Button>
        </div>
      </div>
    </MainContainer>
  );
};
