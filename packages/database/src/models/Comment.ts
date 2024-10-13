import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Topic } from './Topic';
import { User } from './User';

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare comment_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare content: string;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare topic_id: number;

  @BelongsTo(() => Topic)
  declare topic: Topic;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;
}
