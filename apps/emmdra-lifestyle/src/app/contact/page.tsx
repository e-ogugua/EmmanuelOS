export const dynamic = 'force-static'

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Contact</h1>
      <p className="text-gray-600">Questions, partnerships, or custom orders—reach out.</p>
      <form className="mt-6 grid gap-4">
        <input className="border rounded px-3 py-2" placeholder="Name" />
        <input className="border rounded px-3 py-2" placeholder="Email" type="email" />
        <textarea className="border rounded px-3 py-2" placeholder="Message" rows={5} />
        <button type="button" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded">Send</button>
      </form>
      <p className="text-sm text-gray-500 mt-3">Form hooks will be wired to email/CRM later.</p>
    </main>
  )
}
