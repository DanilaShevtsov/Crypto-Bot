import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Unique(['id', 'uuid', 'xPub', 'mnemonic', 'customerId'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  uuid: string

  @Column()
  xPub: string

  @Column()
  mnemonic: string

  @Column()
  customerId: string

  @Column()
  tgUserId: number
}