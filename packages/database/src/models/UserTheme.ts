import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SiteTheme } from './SiteTheme';

@Table({
  timestamps: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  externalId!: number; // Идентификатор записи

  @ForeignKey(() => SiteTheme)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  themeId!: number; // Внешний ключ на SiteTheme

  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
    allowNull: false,
  })
  ownerId!: number; // Идентификатор пользователя
}
