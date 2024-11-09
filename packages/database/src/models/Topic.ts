import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Comment } from './Comment';
import { User } from './User';

@Table({
  tableName: 'topics',
  timestamps: true,
})
export class Topic extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare topic_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare views: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare content: string;

  @HasMany(() => Comment, { as: 'comments' })
  declare comments: Comment[];

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
