import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'

@Module({
  imports: [PostsModule], // モジュールを要素として入れる配列
  controllers: [AppController], // ルーティングを記述したControllers
  providers: [AppService], // 処理を記述したProviders
})
export class AppModule {}
