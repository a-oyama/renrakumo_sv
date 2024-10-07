

import { createClient } from "@/utils/supabase/client"
import RenrakuList from "@/components/renraku/RenrakuList"
import { Suspense } from "react"
import Loading from "@/app/loading"

// メインページ
const RenrakuPage = async () => {

  const supabase = createClient()

  // supabaseからblogテーブル取得
  const { data: blogsData, error } = await supabase
    .from("blogs")

    // profileテーブルのname, avatar をselect(昇順)
    .select(`*, profiles (name,avatar_url)`)
    .order("updated_at", { ascending: false })

  if (!blogsData || error) {
    return <div className="text-center">
      連絡が投稿されていません
      </div>
  }

  // 選択した連絡網を表示
  return (
    <Suspense fallback={<Loading />}>
      <div className="">
        {blogsData.map((blog) => {
          return <RenrakuList 
          key={blog.id} blog={blog} />
        })}
      </div>
    </Suspense>
  )
}

export default RenrakuPage;
