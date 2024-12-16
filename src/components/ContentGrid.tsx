import type { OstDocument } from 'outstatic'
import Link from 'next/link'
import Image from 'next/image'

type Item = {
  tags?: { value: string; label: string }[]
} & OstDocument

type Props = {
  collection: 'posts' | 'projects'
  title?: string
  items: Item[]
  priority?: boolean
}

const ContentGrid = ({
  title = 'More',
  items,
  collection,
  priority = false
}: Props) => {
  return (
    <section id={collection}>
      <h2 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-6xl">
        {title}
      </h2>
      <div className="mb-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {items.map((item, id) => (
          <Link key={item.slug} href={`/${collection}/${item.slug}`}>
            <div className="scale-100 cursor-pointer overflow-hidden rounded-md border transition duration-100 hover:scale-[1.02] hover:shadow active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 md:w-full">
              <div className="sm:mx-0">
                <Image
                  src={item.coverImage ?? ''}
                  alt={`Cover Image for ${item.title}`}
                  className="h-auto w-full object-cover object-center"
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 347px, 192px"
                  priority={priority && id <= 2}
                />
                {collection === 'projects' && (
                  <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white p-2 text-center text-3xl font-bold opacity-80 shadow-lg">
                    {item.title}
                  </h2>
                )}
              </div>
              {collection === 'posts' && (
                <div className="p-4">
                  {Array.isArray(item?.tags)
                    ? item.tags.map(({ label }) => (
                        <span
                          key={label}
                          className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                        >
                          {label}
                        </span>
                      ))
                    : null}
                  <h3 className="mb-2 text-xl font-bold leading-snug hover:underline">
                    {item.title}
                  </h3>
                  <div className="mb-4 text-base text-slate-700"></div>
                  <p className="mb-4 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ContentGrid
