//supabaseからの画像取得許可

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "https://vyejpflxsreajoxeryck.supabase.co",
          },
        ],
      },
};

export default nextConfig;
