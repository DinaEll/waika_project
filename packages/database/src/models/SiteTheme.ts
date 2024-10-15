import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserTheme } from './UserTheme';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model<SiteTheme> {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  themeId!: number; // Идентификатор темы

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string; // Название темы

  @HasMany(() => UserTheme)
  userThemes!: UserTheme[] // Связь с UserTheme
}
