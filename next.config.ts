import { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // If necessary, you can create an alias for your src directory
    if (!isServer) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    }
    return config
  },
}

export default nextConfig
