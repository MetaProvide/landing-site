module.exports = {
    images: {
    domains: ['via.placeholder.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}