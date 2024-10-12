import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
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
  topic_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  views!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @HasMany(() => Comment)
  comments?: Comment[];

  @CreatedAt
  created_at!: Date;
}
