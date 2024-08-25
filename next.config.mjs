/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    fileParser: {
      sizeLimit: '10mb', // API リクエストボディの最大サイズを10MBに設定
    },
  },
};

export default nextConfig;
