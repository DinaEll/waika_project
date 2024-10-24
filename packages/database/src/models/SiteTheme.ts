import {
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
  timestamps: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare themeId: number; // Идентификатор темы

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare theme: string; // Название темы

  @HasMany(() => UserTheme)
  userThemes!: UserTheme[]; // Связь с UserTheme
}
