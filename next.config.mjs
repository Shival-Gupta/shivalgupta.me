/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.10.101:3000',
  ],

  async redirects() {
    return [
      {
        source: '/resume',
        destination: 'https://resume.shivalgupta.me',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
