# Afrasiab University — Qabul portali

Afrasiab University uchun frontend developer test topshirig'i doirasida yaratilgan loyiha: qabul jarayoniga bag'ishlangan landing sahifa va ko'p fanli kirish testi.

## Xususiyatlar

- **Landing sahifa** — universitet haqida, statistikalar (scroll-triggered count-up animatsiya), fakultetlar, qabul jarayoni bosqichlari
- **Ko'p fanli test** — foydalanuvchi Matematika, Fizika yoki Ingliz tilidan birini tanlaydi
- **30 ta savol**, umumiy 30 daqiqalik vaqt, erkin navigatsiya (oldingi/keyingi)
- **Natija sahifasi** — foiz, to'g'ri/noto'g'ri javoblar breakdown'i, PDF formatida yuklab olish
- **Dark/Light rejim** — localStorage'da saqlanadi
- **Progress saqlash** — sahifa qayta yuklansa ham test davom etadi (localStorage)
- **To'liq responsive** — telefon, planshet, noutbuk, katta ekranlar
- **Animatsiyalar** — scroll-reveal, hover-effektlar, network-uslub fon, intro-splash

## Texnologiyalar

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- jsPDF (natijani PDF qilib yuklash)
- Lucide React (ikonkalar)

## Ishga tushirish

\`\`\`bash
npm install
npm run dev
\`\`\`

Loyiha `http://localhost:5173` manzilida ochiladi.

## Build qilish

\`\`\`bash
npm run build
\`\`\`

## Loyiha strukturasi

\`\`\`
src/
  components/       — Navbar, Hero, Footer, ThemeToggle, PageBackground va h.k.
  pages/            — LandingPage, SubjectSelect, TestPage, ResultPage
  context/          — TestContext (test holati), ThemeContext (dark/light)
  data/questions/   — Matematika, Fizika, Ingliz tili savollar bazasi
\`\`\`

## Muallif

Fazliddin — Frontend Developer nomzodi