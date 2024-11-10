import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Comment } from './Comment';
import { Reply } from './Reply';
import { User } from './User';

@Table({
  tableName: 'reactions',
  timestamps: false,
})
export class Reaction extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare reaction_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare reaction: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare comment_id: number;

  @BelongsTo(() => Comment)
  declare comment: Comment;

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare reply_id: number;

  @BelongsTo(() => Reply)
  declare reply: Reply;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;
}
