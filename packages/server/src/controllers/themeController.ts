import { NextFunction, Request, Response } from 'express';
import { themeService } from '../services';

interface ThemeRequestBody {
  theme: string;
}

class ThemeController {
  getThemes = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const themes = await themeService.getThemes();
      if (themes) {
        res.status(200).json(themes);
      } else {
        res.status(404).json({ message: 'Themes not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  // Получение темы юзера
  getUserTheme = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).json({ message: 'Query params should have userId' });
    }
    try {
      const theme = await themeService.getThemeByUserId(Number(userId));

      if (theme) {
        res.status(200).json(theme);
      } else {
        res.status(404).json({ message: 'Theme not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  // Установить юзеру тему
  addTheme = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { theme } = req.body as ThemeRequestBody;

    if (!userId || !theme) {
      res
        .status(404)
        .json({ message: 'Query params should have userId and theme' });
    }

    try {
      const newTheme = await themeService.addThemeToUser(Number(userId), theme);

      if (newTheme) {
        res.status(200).json(newTheme);
      } else {
        res.status(404).json({ message: 'Selected theme not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  // Обновить тему
  updateTheme = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { theme } = req.body as ThemeRequestBody;

    if (!userId || !theme) {
      res
        .status(404)
        .json({ message: 'Query params should have userId and theme' });
    }

    try {
      const updatedTheme = await themeService.addThemeToUser(
        Number(userId),
        theme,
      );

      if (updatedTheme) {
        res.status(200).json(updatedTheme);
      } else {
        res.status(404).json({ message: 'Selected theme not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export const themeController = new ThemeController();
