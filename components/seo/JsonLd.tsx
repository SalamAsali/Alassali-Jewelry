type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
  id?: string
}

export default function JsonLd({ data, id }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
