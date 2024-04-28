import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Comment {
  @Field((type) => String)
  id: string

  @Field((type) => String)
  text: string

  @Field((type) => String)
  postId: string
}
