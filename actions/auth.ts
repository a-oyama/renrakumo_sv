//　サインアップ処理時のサーバーサイドアクション

"use server"

import { LoginSchema, SignupSchema } from "@/schemas"
import { createClient } from "@/utils/supabase/server"
import { z } from "zod"

// アカウント作成
export const signup = async (values: z.infer<typeof SignupSchema>) => {
  try {
    const supabase = createClient()

    // アカウント作成し，メール送信する
    const { data, error: signupError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/signup/verify`,
      },
    })

    if (data && data.user) {
      if (data.user.identities && data.user.identities.length > 0) {
        console.log("アカウントを作成しました")
      } else {
        return {
          error:
            "このメールアドレスは既に登録されています。他のメールアドレスを使用して、アカウントを作成してください",
        }
      }
    } else {
      return { error: signupError?.message }
    }

    // プロフィールの名前を更新
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ name: values.name })
      .eq("id", data.user.id)

    // エラーチェック
    if (updateError) {
      return { error: updateError.message }
    }
  } catch (err) {
    console.error(err)
    return { error: "エラーが発生しました" }
  }
}

// ログイン
export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const supabase = createClient()

    // メアド＆パスワードを使用しログイン
    const { error } = await supabase.auth.signInWithPassword({
      ...values,
    })

    if (error) {
      return { error: error.message }
    }
  } catch (err) {
    console.error(err)
    return { error: "エラーが発生しました" }
  }
}