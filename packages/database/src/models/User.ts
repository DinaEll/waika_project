import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Comment } from './Comment';
import { Topic } from './Topic';
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
    allowNull: false,
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
    allowNull: false,
  })
  declare avatar: string;

  @HasMany(() => Topic)
  declare topics: Topic[];

  @HasMany(() => Comment)
  declare comments: Comment[];
}
