import { Suspense, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLang, useT, langPath } from '../i18n/index.ts'
import type { Lang } from '../i18n/index.ts'

export function Layout() {
  const location = useLocation()
  const lang = useLang()
  const t = useT()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      })
    }
  }, [location.pathname])

  const navItems = [
    { to: langPath(lang, '/'), label: t.common.nav.home },
    { to: langPath(lang, '/about'), label: t.common.nav.about },
  ]

  const otherLang: Lang = lang === 'ja' ? 'en' : 'ja'
  const switchPath = location.pathname.replace(`/${lang}`, `/${otherLang}`) + location.search

  return (
    <>
      <header className="site-header">
        <Link to={langPath(lang, '/')} className="site-logo">
          {t.common.siteTitle}
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === langPath(lang, '/')}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to={switchPath} className="lang-switch">
          {t.common.langSwitch}
        </Link>
      </header>

      <main className="main">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="site-footer">
        <p>{t.common.footer.copyright}</p>
      </footer>
    </>
  )
}
