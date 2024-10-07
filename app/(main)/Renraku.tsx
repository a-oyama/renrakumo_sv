

import { createClient } from "@/utils/supabase/client"
import { Suspense } from "react"
import RenrakuList from "@/components/renraku/RenrakuList"
import Loading from "@/app/loading"

// メインページ
const RenrakuPage = async () => {
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

export default RenrakuPage;
