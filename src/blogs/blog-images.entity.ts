import { IsNotEmpty, IsString } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BlogEntity } from './blogs.entity'

@Entity({
  name: 'BLOG_IMAGE',
})
export class BlogImageEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  image: string

  @ManyToOne(() => BlogEntity, (blog: BlogEntity) => blog.images)
  @JoinColumn([{ name: 'blog_id', referencedColumnName: 'id' }])
  blog: BlogEntity
}
