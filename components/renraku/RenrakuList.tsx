"use client"

import { RenrakuType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

interface RenrakuListProps {

  renraku: RenrakuType & {
           profiles: {name: string
           avatar_url: string
          }
  }
}

// 画面
/* const RenrakuList = ({ blog }: RenrakuListProps) => { */
const RenrakuList = ({ renraku }: RenrakuListProps) => {

  return (
    <div className="break-words border rounded py-2">

      {/* <Link href={`blog/${blog.id}`}> */}
      <Link href={`renraku/${renraku.id}`}>
      <div className="p-3 space-y-2">
        <div className="text-gray-500 text-xs">
          {/* {format(new Date(blog.updated_at), "yyyy/MM/dd HH:mm")} */}
          {format(new Date(renraku.updated_at), "yyyy/MM/dd HH:mm")}
        </div>
        {/* <div className="font-bold">{blog.title}</div> */}
        <div className="font-bold">{renraku.title}</div>
        <div className="flex items-center space-x-3">
          投稿主
          <Image
            /* src={blog.profiles.avatar_url || "/default.png"} */
            src={renraku.profiles.avatar_url || "/default.png"}
            className="rounded-full"
            alt="avatar"
            width={30}
            height={30}
          />
          {/* <div className="text-sm">{blog.profiles.name}</div> */}
          <div className="text-sm">{renraku.profiles.name}</div>
        </div>
      </div>
      </Link>

    </div>
  )
}

export default RenrakuList;
