

import { createClient } from "@/utils/supabase/client"
import { Suspense } from "react"
import BlogItem from "@/components/blog/BlogItem"
import Loading from "@/app/loading"

// メインページ
const Renraku = async () => {
  const supabase = createClient()

  // ブログ一覧取得
  const { data: blogsData, error } = await supabase
    .from("blogs")
    .select(
      `*,
      profiles (
        name,
        avatar_url
      )
    `
    )
    .order("updated_at", { ascending: false })

  if (!blogsData || error) {
    return <div className="text-center">記事が投稿されていません</div>
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="">
        {blogsData.map((blog) => {
          return <BlogItem key={blog.id} blog={blog} />
        })}
      </div>
    </Suspense>
  )
}

export default Renraku;
