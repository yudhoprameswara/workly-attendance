import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => User, (user) => user.attendances)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'timestamp' })
  check_in_time!: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out_time!: Date;

  @Column()
  photo_url!: string;

  @Column()
  photo_url_out!: string;

  @Column({ nullable: true })
  location_in!: string;

  @Column({ nullable: true })
  location_out!: string;

  @Column({ nullable: true })
  ip_address!: string;

  @Column({ nullable: true })
  ip_address_out!: string;

  @Column({ nullable: true })
  device_info!: string;

  @Column({ nullable: true })
  device_info_out!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}