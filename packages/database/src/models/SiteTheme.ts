import {
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

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
  themeId!: number; // Идентификатор темы

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  theme!: string; // Название темы
}
