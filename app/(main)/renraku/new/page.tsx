import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import RenrakuNew from "@/components/renraku/NewRenraku"
import Loading from "@/app/loading"

const RenrakuNewPage = async () => {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user

  if (!user) {
    redirect("/")
  }

  return (
    <Suspense fallback={<Loading />}>
      <RenrakuNew userId={user.id} />
    </Suspense>
  )
}

export default RenrakuNewPage
