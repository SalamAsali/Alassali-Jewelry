const LOCAL_ORIGIN = 'http://localhost:3000'

export function getServerSideURL(): string {
  const env = process.env
  const url =
    env.PAYLOAD_PUBLIC_SERVER_URL ||
    env.NEXT_PUBLIC_SERVER_URL ||
    env.NEXT_PUBLIC_CMS_URL ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : null) ||
    env.NEXT_PUBLIC_SITE_URL ||
    LOCAL_ORIGIN
  return url.startsWith('http') ? url : `https://${url}`
}
