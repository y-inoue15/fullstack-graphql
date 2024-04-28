import { Injectable } from '@nestjs/common'
import { map, switchMap } from 'rxjs'
import { HttpService } from '@nestjs/axios'

interface Post {
  id: string
  title: string
  views: number
}

interface Comment {
  id: string
  text: string
  postId: string
}

@Injectable()
export class PostsService {
  constructor(private readonly http: HttpService) {}

  findAll() {
    // 投稿データを取得するリクエスト
    const posts$ = this.http.get<Post[]>('http://127.0.0.1:1334/posts')

    // コメントデータを取得するリクエスト
    const comments$ = this.http.get<Comment[]>('http://127.0.0.1:1334/comments')

    // 投稿データとコメントデータを結合して返す
    return posts$.pipe(
      switchMap((posts) => {
        // 投稿ごとのコメントを取得して結合
        return comments$.pipe(
          map((comments) => {
            return posts.data.map((post) => ({
              ...post,
              comments: comments.data.filter((comment) => comment.postId === post.id),
            }))
          }),
        )
      }),
    )
  }

  findOne(id: number) {
    // 投稿データを取得するリクエスト
    const posts$ = this.http.get<Post>(`http://127.0.0.1:1334/posts/${id}`)

    // コメントデータを取得するリクエスト
    const comments$ = this.http.get<Comment[]>(`http://127.0.0.1:1334/comments?postId=${id}`)

    // 投稿データとコメントデータを結合して返す
    return posts$.pipe(
      switchMap((post) => {
        return comments$.pipe(
          switchMap((comments) => {
            return [{ ...post.data, comments: comments.data }]
          }),
        )
      }),
    )
  }
}
