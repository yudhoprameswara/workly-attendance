import { Attendance } from 'src/attendance/attendance.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string

  @Column({unique: true})
  username:string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; 

  @Column()
  title: string

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
}