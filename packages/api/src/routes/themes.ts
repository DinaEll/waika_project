import { Router } from '@waika_project/server';
import { themeController } from '../controllers/themeController';

export const themes = Router();

// Получение всех тем
themes.get('/', themeController.getThemes);

// Получение темы по userId
themes.get('/:userId', themeController.getUserTheme);

// Присвоение темы юзеру
themes.post('/:userId', themeController.addTheme);

// Изменение текущей темы у юзера
themes.put('/:userId', themeController.updateTheme);
