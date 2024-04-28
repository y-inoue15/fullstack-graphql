import { Field, ObjectType } from '@nestjs/graphql'
import { Comment } from './comments/comment'

@ObjectType()
export class Post {
  @Field((type) => String)
  id: string

  @Field((type) => String)
  title: string

  @Field((type) => [Comment], { nullable: true })
  comments?: Comment[]
}
