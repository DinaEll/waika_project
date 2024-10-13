import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from './Comment';
import { User } from './User';

@Table({
  tableName: 'replies',
  timestamps: true,
})
export class Reply extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare reply_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare content: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare comment_id: number;

  @BelongsTo(() => Comment)
  declare comment: Comment;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @CreatedAt
  declare created_at: Date;
}
