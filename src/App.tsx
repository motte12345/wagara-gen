import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { lazy } from 'react'
import { I18nProvider } from './i18n/index.ts'
import { Layout } from './components/Layout.tsx'

const HomePage = lazy(() =>
  import('./pages/HomePage.tsx').then((m) => ({ default: m.HomePage })),
)
const EditorPage = lazy(() =>
  import('./pages/EditorPage.tsx').then((m) => ({ default: m.EditorPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage.tsx').then((m) => ({ default: m.AboutPage })),
)
const CulturePage = lazy(() =>
  import('./pages/CulturePage.tsx').then((m) => ({ default: m.CulturePage })),
)

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/en/" replace />} />

          <Route
            path=":lang"
            element={
              <I18nProvider>
                <Layout />
              </I18nProvider>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path=":pattern/culture" element={<CulturePage />} />
            <Route path=":pattern" element={<EditorPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/en/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
