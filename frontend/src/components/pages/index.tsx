type Props = {
  data: { posts: Posts } | undefined
}

type Posts = {
  id: string
  title: string
  comments?: {
    id: string
    text: string
  }[]
}[]

export const TopPage = ({ data }: Props) => {
  return (
    <main className="p-8">
      {data ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Comments</th>
            </tr>
          </thead>
          <tbody>
            {data.posts.map((post) => (
              <tr key={post.id}>
                <td className="border px-4 py-2">{post.id}</td>
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">
                  {post.comments && post.comments.length ? (
                    <table>
                      <tbody>
                        {post.comments.map((comment) => (
                          <tr key={comment.id}>
                            <td className="px-4 py-2">{comment.id}</td>
                            <td className="px-4 py-2">{comment.text}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>コメントはありません</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>データがありません</p>
      )}
    </main>
  )
}
