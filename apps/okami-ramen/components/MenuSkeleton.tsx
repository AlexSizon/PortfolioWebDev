export function MenuSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <div className="mx-auto h-4 w-28 rounded-full bg-[#2d1810]" />
        <div className="mx-auto h-10 w-64 rounded-full bg-[#2d1810]" />
        <div className="mx-auto h-4 w-96 max-w-full rounded-full bg-[#2d1810]" />
      </div>
      <div className="space-y-12">
        {Array.from({ length: 4 }).map((_, sectionIndex) => (
          <section key={sectionIndex} className="space-y-5">
            <div className="h-8 w-40 rounded-full bg-[#2d1810]" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((__, cardIndex) => (
                <div
                  key={cardIndex}
                  className="rounded-2xl border border-[#3d2218] bg-[#1a0a00] p-5"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="h-5 w-40 rounded-full bg-[#2d1810]" />
                      <div className="h-4 w-24 rounded-full bg-[#2d1810]" />
                    </div>
                    <div className="h-6 w-16 rounded-full bg-[#2d1810]" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded-full bg-[#2d1810]" />
                    <div className="h-4 w-11/12 rounded-full bg-[#2d1810]" />
                    <div className="h-4 w-3/4 rounded-full bg-[#2d1810]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
