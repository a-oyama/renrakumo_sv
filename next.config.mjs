//supabase連携
//httpsとURLは分割しないとダメ！！！

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
//            hostname: 'https://vyejpflxsreajoxeryck.supabase.co',
            hostname: 'vyejpflxsreajoxeryck.supabase.co',
          },
        ],
      },
};

export default nextConfig;
