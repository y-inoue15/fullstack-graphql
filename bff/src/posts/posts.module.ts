import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema/posts.gql',
    }),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
