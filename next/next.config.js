/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Ensure backwards compatibility for SSR styled-components
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    // avif generally take longer to encode, but compress 20% smaller compared to webp
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Allow project to build even if project has ESLint errors
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
}

export default nextConfig
