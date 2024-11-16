import { SiteTheme, UserTheme } from '@waika_project/database';

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
        where: { user_id: userId },
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

  addThemeToUser = async (userId: number, theme: string) => {
    try {
      // Поиск выбранной темы в списке
      const selectedTheme = await SiteTheme.findOne({
        raw: true,
        where: { theme },
      });

      if (!selectedTheme) {
        return null;
      }

      // Поиск текущей темы юзера по userId
      const currentUserThemeInst = await UserTheme.findOne({
        where: { user_id: userId },
      });

      if (!currentUserThemeInst) {
        // Если записи у юзера нет, то создаем новую
        await UserTheme.create({
          themeId: selectedTheme.themeId,
          user_id: userId,
        });

        return selectedTheme;
      }

      // Если запись у юзера есть, обновляем UserTheme с новым themeId
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      currentUserThemeInst.dataValues.themeId = selectedTheme.themeId;
      await currentUserThemeInst.save();

      return selectedTheme;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Adding theme error: ' + errorMessage);
    }
  };
}

export const themeService = new ThemeService();
