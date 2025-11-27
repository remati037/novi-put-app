# Novi Put - Aplikacija za Oporavak

Modern React aplikacija za praćenje oporavka i izgradnju boljih navika. Aplikacija pomaže korisnicima da razumeju svoje navike, prate napredak i izgrade bolju verziju sebe.

## 🚀 Tehnologije

- **React 18** - UI biblioteka
- **TypeScript** - Tipizirani JavaScript
- **Vite** - Brzi build tool i dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Moderna ikona biblioteka

## 📁 Struktura Projekta

```
novi-put-app/
├── src/
│   ├── components/          # React komponente
│   │   ├── IntroScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── AnalysisScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── UrgesScreen.tsx
│   │   ├── PlanScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   └── BottomNav.tsx
│   ├── data/                # Podaci aplikacije
│   │   └── quizQuestions.ts
│   ├── utils/               # Pomoćne funkcije
│   │   └── helpers.ts
│   ├── types/               # TypeScript tipovi
│   │   └── index.ts
│   ├── App.tsx              # Glavna komponenta
│   ├── main.tsx             # Entry point
│   └── index.css            # Globalni stilovi
├── public/                  # Statički fajlovi
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite konfiguracija
├── tsconfig.json            # TypeScript konfiguracija
├── tailwind.config.js       # Tailwind konfiguracija
└── postcss.config.js        # PostCSS konfiguracija
```

## 📋 Preduslovi

Pre nego što počnete, uverite se da imate instalirano:

- **Node.js** (verzija 16 ili novija)
- **npm** ili **yarn** package manager

Možete proveriti verzije pokretanjem:
```bash
node --version
npm --version
```

## 🛠️ Instalacija i Pokretanje

### Korak 1: Instalacija Dependencies

Ako već niste instalirali dependencies, pokrenite:

```bash
npm install
```

Ova komanda će instalirati sve potrebne pakete definisane u `package.json` fajlu.

### Korak 2: Pokretanje Development Servera

Za pokretanje aplikacije u development modu, pokrenite:

```bash
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:5173` (ili drugom portu ako je 5173 zauzet).

Otvorite browser i idite na adresu koja će biti prikazana u terminalu.

### Korak 3: Build za Production

Kada ste spremni da napravite production build, pokrenite:

```bash
npm run build
```

Ova komanda će kreirati optimizovani build u `dist/` folderu.

### Korak 4: Preview Production Builda

Da biste videli kako će production build izgledati, pokrenite:

```bash
npm run preview
```

## 📱 Funkcionalnosti

### 1. **Uvodni Ekran (Intro)**
- Dobrodošlica poruka
- Opis aplikacije
- Dugme za početak procene

### 2. **Kviz (Quiz)**
- 10 pitanja za procenu situacije
- Progress bar za praćenje napretka
- Dinamički odgovori sa različitim opcijama

### 3. **Analiza (Analysis)**
- Prikaz nivoa rizika (Nizak/Srednji/Visok)
- Vizuelni prikaz rezultata
- Preporuke na osnovu odgovora

### 4. **Dashboard**
- Prikaz trenutnog niza (streak) dana
- Brzi pristup svim funkcionalnostima
- Dnevni saveti
- Reset opcija za niz

### 5. **SOS Zona (Urges)**
- Hitna pomoć za trenutke iskušenja
- Logovanje intenziteta iskušenja
- Istorija borbe sa iskušenjima

### 6. **Dnevni Plan (Plan)**
- Personalizovani saveti na osnovu kviza
- Checkbox lista za praćenje napretka
- Progress bar za završene aktivnosti

### 7. **Kalendar (Calendar)**
- Vizuelni prikaz uspeha po danima
- Obeležavanje čistih dana
- Obeležavanje relapsa

### 8. **Bottom Navigation**
- Brza navigacija između glavnih sekcija
- SOS dugme za hitne situacije

## 💾 Lokalno Skladištenje

Aplikacija koristi `localStorage` za čuvanje podataka korisnika. Svi podaci se čuvaju lokalno u browseru i ne šalju se na server.

Podaci koji se čuvaju:
- Odgovori na kviz
- Datum početka niza
- Istorija iskušenja
- Napredak u planu
- Status onboarding-a

## 🎨 Stilizovanje

Aplikacija koristi **Tailwind CSS** za stilizovanje. Svi stilovi su utility-based i definisani direktno u komponentama.

Glavne boje:
- **Emerald** (zeleno) - za pozitivne akcije i uspeh
- **Rose** (roze/crveno) - za upozorenja i hitne situacije
- **Slate** (sivo) - za neutralne elemente
- **Blue** - za informacije i plan

## 🔧 Development

### Linting

Za proveru koda, pokrenite:

```bash
npm run lint
```

### TypeScript

Projekat koristi TypeScript za tipizaciju. Sve komponente i funkcije imaju definisane tipove u `src/types/index.ts`.

## 📝 Napomene

- Aplikacija je optimizovana za mobilne uređaje
- Responsive design za različite veličine ekrana
- Sve funkcionalnosti rade offline (osim ako ne dodate server funkcionalnosti)

## 🐛 Rešavanje Problema

### Problem: Port je zauzet
**Rešenje:** Vite će automatski pokušati sledeći dostupan port. Proverite terminal za tačan port.

### Problem: Module not found errors
**Rešenje:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: TypeScript errors
**Rešenje:** Proverite da li su svi tipovi pravilno importovani i da li `tsconfig.json` postoji.

## 📄 Licenca

Ovaj projekat je kreiran za ličnu upotrebu.

## 🤝 Podrška

Za pitanja ili probleme, proverite dokumentaciju ili kreirajte issue u repository-ju.

---

**Napravljeno sa ❤️ za bolje sutra**

