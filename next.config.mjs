/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Tourist_Board_of_Nara',
        permanent: true,  // 永続的なリダイレクト（301リダイレクト）
      },
    ];
  },
};

export default nextConfig;
