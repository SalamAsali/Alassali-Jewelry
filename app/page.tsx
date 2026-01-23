export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Alassali Jewelry</h1>
        <p className="text-lg mb-8">
          Payload CMS is set up. Visit <a href="/cms" className="text-blue-600 underline">/cms</a> to access the admin panel.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Setup Complete!</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Payload CMS configured</li>
            <li>PostgreSQL adapter ready</li>
            <li>5 collections created</li>
            <li>Resend email integration ready</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
