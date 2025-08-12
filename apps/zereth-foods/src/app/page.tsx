export default function HomePage() {
  return (
    <main>
      <section className="bg-cream">
        <div className="container py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">
              Cakes that tell your story
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              Elegant, playful, and delicious. Custom-made for birthdays, weddings, and every celebration.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/order" className="px-6 py-3 rounded-xl bg-chocolate text-white hover:opacity-90">Build your cake</a>
              <a href="/gallery" className="px-6 py-3 rounded-xl border border-chocolate text-chocolate hover:bg-white">See gallery</a>
            </div>
          </div>
          <div className="aspect-[4/3] bg-white rounded-xl shadow-inner" />
        </div>
      </section>
    </main>
  );
}
