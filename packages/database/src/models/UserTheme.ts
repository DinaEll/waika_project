import {
  AllowNull,
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
import { User } from './User';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  externalId!: number; // Идентификатор записи

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Index
  @Column(DataType.INTEGER)
  themeId!: number; // Внешний ключ на SiteTheme

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: string; // Идентификатор пользователя
}
