import { VisitorEntity } from './../visitors/visitors.entity'
import { IsBoolean, IsString } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity' // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { UserEntity } from '../users/users.entity'
import { TagEntity } from '../tags/tags.entity'
import { BlogImageEntity } from './blog-images.entity'

@Entity({
  name: 'BLOG',
})
export class BlogEntity extends CommonEntity {
  @IsString()
  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  thumbnail: string

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  description: string

  @IsString()
  @Column({ type: 'text' })
  contents: string

  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  isPrivate: boolean

  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  isTemporary: boolean

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    // foreignkey 정보들
    {
      name: 'author_id' /* db에 저장되는 필드 이름 */,
      referencedColumnName: 'id' /* USER의 id */,
    },
  ])
  author: UserEntity

  @OneToMany(
    () => BlogImageEntity,
    (blogImage: BlogImageEntity) => blogImage.blog,
  )
  images: BlogEntity[]

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blogs, {
    cascade: ['insert'], // 두개의 테이블 동시에 수정할때에는 cascade 옵션을 추가해주어야 한다.
  })
  @JoinTable({
    // table
    name: 'BLOG_TAG',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[]

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog)
  visitors: VisitorEntity[]
}
