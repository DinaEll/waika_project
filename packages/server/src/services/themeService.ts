import { SiteTheme, UserTheme } from '@waika_project/database/src';

class ThemeService {
  getThemes = async () => {
    try {
      return SiteTheme.findAll();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Error getting themes: ' + errorMessage);
    }
  };

  getThemeByUserId = async (userId: number) => {
    try {
      const userTheme = await UserTheme.findOne({
        raw: true,
        where: { ownerId: userId },
      });
      if (userTheme) {
        return SiteTheme.findByPk(userTheme.themeId);
      }
      return null;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Error getting theme: ' + errorMessage);
    }
  };

  createTheme = async (userId: number, theme: string) => {
    try {
      // Ищем тему в списке
      const selectedTheme = await SiteTheme.findOne({
        raw: true,
        where: { theme },
      });

      if (!selectedTheme) {
        return null;
      }

      //Если тема существует, устанавливаем ее юзеру
      await UserTheme.create({
        themeId: selectedTheme.themeId,
        ownerId: userId,
      });
      return selectedTheme;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Error creating theme: ' + errorMessage);
    }
  };

  updatedTheme = async (userId: number, newTheme: string) => {
    try {
      // Поиск выбранной темы в списке
      const selectedTheme = await SiteTheme.findOne({
        raw: true,
        where: { theme: newTheme },
      });

      if (!selectedTheme) {
        return null;
      }

      // Поиск текущей темы юзера по userId
      const userTheme = await UserTheme.findOne({
        raw: true,
        where: { ownerId: userId },
      });

      if (!userTheme) {
        // Если записи у юзера нет, то создаем новую
        await UserTheme.create({
          themeId: selectedTheme.themeId,
          ownerId: userId,
        });

        return selectedTheme;
      }

      // Если запись по юзеру есть, обновляем UserTheme с новым themeId
      userTheme.themeId = selectedTheme.themeId;
      await userTheme.save();

      return selectedTheme;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Error updating theme: ' + errorMessage);
    }
  };
}

export const themeService = new ThemeService();
