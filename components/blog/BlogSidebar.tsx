'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const bespokeCategories = [
  { name: 'Engagement Rings', path: '/custom-engagement-rings', icon: '/images/icons/engagement-rings.svg' },
  { name: 'Wedding Bands', path: '/custom-wedding-bands', icon: '/images/icons/bridal-bands.svg' },
  { name: 'Rings', path: '/custom-rings', icon: '/images/icons/rings.svg' },
  { name: 'Pendants', path: '/custom-pendants', icon: '/images/icons/pendants.svg' },
  { name: 'Chains', path: '/custom-chains', icon: '/images/icons/chains.svg' },
  { name: 'Earrings', path: '/custom-earrings', icon: '/images/icons/earrings.svg' },
  { name: 'Bracelets', path: '/custom-bracelets', icon: '/images/icons/bracelets.svg' },
  { name: 'Grillz', path: '/custom-grillz', icon: '/images/icons/grillz.svg' },
]

type Heading = { id: string; text: string }

export default function BlogSidebar() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('[data-blog-content]')
    if (!article) return

    const h2s = article.querySelectorAll('h2')
    const items: Heading[] = []
    h2s.forEach((h2, i) => {
      if (!h2.id) {
        h2.id = `section-${i}`
      }
      items.push({ id: h2.id, text: h2.textContent || '' })
    })
    setHeadings(items)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* Table of Contents */}
        {headings.length > 0 && (
          <nav>
            <h3 className="text-xs uppercase tracking-widest text-glacier-grey font-medium mb-4">Table of Contents</h3>
            <ul className="space-y-2 border-l border-glacier-grey/20">
              {headings.map(({ id, text }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`block pl-4 py-1 text-sm transition-colors border-l-2 -ml-px ${
                      activeId === id
                        ? 'border-glacier-grey text-white font-medium'
                        : 'border-transparent text-stone hover:text-glacier-grey'
                    }`}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Custom Orders */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-glacier-grey font-medium mb-4">Custom Orders</h3>
          <ul className="space-y-1.5">
            {bespokeCategories.map((cat) => (
              <li key={cat.path}>
                <Link
                  href={cat.path}
                  className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone hover:text-white hover:bg-charcoal/50 transition-all"
                >
                  <img
                    src={cat.icon}
                    alt=""
                    className="w-5 h-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
