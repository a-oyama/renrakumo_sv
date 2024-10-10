// 全ページ共通コンポーネント_ナビゲーション・フッター
// 通知機能：Toastarもimportし共通コンポーネントにする

import type { Metadata, Viewport } from "next"
import { createClient } from "@/utils/supabase/server"
import Navigation from "@/components/navigation/Navigation"
import ToastProvider from "@/components/providers/ToastProvider"
import { M_PLUS_1 } from "next/font/google"
import "./globals.css"

// フォント
const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "連絡網サイト",
    default: "連絡網サイト",
  },
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
}

// chilerenの中身:ReactNodeで様々な型
interface RootLayoutProps {
  children: React.ReactNode
}

// ルートレイアウト
const RootLayout = async ({ children }: RootLayoutProps) => {

  // supabase連携しユーザー取得
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user


  // トースター，ナビゲーションを共通コンポーネントにする
  return (
    <html lang="ja">

      <body className={mPlus1.className}>

      <ToastProvider />

        <div className="flex min-h-screen flex-col">
        {/* Navigationにuserを渡す */}

        <Navigation user={user} />

          <main className="flex-1">{children}</main>

          <footer className="border-t py-2">
            <div className="flex flex-col items-center justify-center text-sm space-y-5">
              <div>©Create by OYAMA.</div>
            </div>
          </footer>

        </div>
      </body>

    </html>
  )
}

export default RootLayout;