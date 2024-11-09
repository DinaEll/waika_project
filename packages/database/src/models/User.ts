import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';
import { Comment } from './Comment';
import { Reply } from './Reply';
import { Topic } from './Topic';
import { UserTheme } from './UserTheme';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare second_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare display_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
  })
  declare avatar: string;

  @HasMany(() => Topic)
  declare topics: Topic[];

  @HasMany(() => Comment)
  declare comments: Comment[];

  @HasMany(() => Reply)
  declare replies: Reply[];

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasOne(() => UserTheme, 'themeId')
  declare theme: UserTheme;
}
