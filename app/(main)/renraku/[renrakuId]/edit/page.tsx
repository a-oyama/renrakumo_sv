import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import RenrakuEdit from "@/components/renraku/Renrakuedit"
import Loading from "@/app/loading"

interface RenrakuEditPageProps {
  params: {
    renrakuId: string
  }
}

const RenrakuEditPage = async ({ params }: RenrakuEditPageProps) => {
  const { renrakuId } = params
  const supabase = createClient()

  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user

  if (!user) {
    redirect("/")
  }

  // ブログ詳細取得
  const { data: renrakuData } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", renrakuId)
    .single()

  if (!renrakuData) {
    return <div className="text-center">記事が存在しません</div>
  }

  // ブログ作成者とログインユーザーが一致しない場合
  if (renrakuData.user_id !== user.id) {
    redirect(`/renraku/${renrakuData.id}`)
  }

  return (
    <Suspense fallback={<Loading />}>
      <RenrakuEdit renraku={renrakuData} />
    </Suspense>
  )
}

export default RenrakuEditPage;
