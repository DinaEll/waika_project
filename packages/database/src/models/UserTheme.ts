import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SiteTheme } from './SiteTheme';
import { User } from './User';

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
  declare externalId: number; // Идентификатор записи

  @ForeignKey(() => SiteTheme)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare themeId: number; // Внешний ключ на SiteTheme

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
  })
  declare user_id: number; // Идентификатор пользователя

  @BelongsTo(() => User)
  declare user: User;
}
