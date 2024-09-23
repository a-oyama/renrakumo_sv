

import { z } from "zod"

// サインアップ時の入力バリデーション
export const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
})

// ログイン時の入力バリデーション
export const LoginSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
})

// メールアドレス設定用
export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
})

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "英数字8文字以上で入力してください" }),
    confirmation: z
      .string()
      .min(8, { message: "英数字8文字以上で入力してください" }),
  })
  // パスワードと確認用パスワードがい位置しない場合
  .refine((data) => data.password === data.confirmation, {
    message: "新しいパスワードと確認用パスワードが一致しません。",
    path: ["confirmation"], // エラーメッセージが適用されるフィールド
  })