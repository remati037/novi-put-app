# Novi Put - Aplikacija za Oporavak

Modern React aplikacija za praćenje oporavka i izgradnju boljih navika. Aplikacija pomaže korisnicima da razumeju svoje navike, prate napredak i izgrade bolju verziju sebe.

## 🚀 Tehnologije

- **React 18** - UI biblioteka
- **TypeScript** - Tipizirani JavaScript
- **Vite** - Brzi build tool i dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Moderna ikona biblioteka
- **Supabase** - Backend-as-a-Service (authentication & database)

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
│   │   ├── BottomNav.tsx
│   │   └── AuthScreen.tsx
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx
│   ├── services/            # API services
│   │   └── userDataService.ts
│   ├── lib/                 # Library configurations
│   │   └── supabase.ts
│   ├── data/                # Podaci aplikacije
│   │   └── quizQuestions.ts
│   ├── utils/               # Pomoćne funkcije
│   │   └── helpers.ts
│   ├── types/               # TypeScript tipovi
│   │   └── index.ts
│   ├── App.tsx              # Glavna komponenta
│   ├── main.tsx             # Entry point
│   └── index.css            # Globalni stilovi
├── supabase/                # Supabase SQL schemas
│   └── schema.sql
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

### Korak 1: Kreiranje Supabase Projekta

1. Idite na [supabase.com](https://supabase.com) i kreirajte novi projekat
2. Sačekajte da se projekat inicijalizuje (može potrajati nekoliko minuta)
3. Nakon što je projekat spreman, idite na **Settings** → **API**
4. Kopirajte sledeće vrednosti:
   - **Project URL** (to je vaš `VITE_SUPABASE_URL`)
   - **anon/public key** (to je vaš `VITE_SUPABASE_ANON_KEY`)

### Korak 2: Konfiguracija Environment Variables

1. Kreirajte `.env` fajl u root direktorijumu projekta:
```bash
cp .env.example .env
```

2. Otvorite `.env` fajl i dodajte vaše Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Važno:** Zamenite `your_supabase_project_url` i `your_supabase_anon_key` sa stvarnim vrednostima iz Supabase dashboard-a.

### Korak 3: Setup Supabase Database

1. U Supabase dashboard-u, idite na **SQL Editor**
2. Otvorite fajl `supabase/schema.sql` iz ovog projekta
3. Kopirajte ceo SQL kod i paste-ujte ga u SQL Editor
4. Kliknite **Run** da izvršite SQL skriptu
5. Ovo će kreirati `user_data` tabelu sa potrebnim Row Level Security policies

### Korak 4: Instalacija Dependencies

Ako već niste instalirali dependencies, pokrenite:

```bash
npm install
```

Ova komanda će instalirati sve potrebne pakete definisane u `package.json` fajlu.

### Korak 5: Pokretanje Development Servera

Za pokretanje aplikacije u development modu, pokrenite:

```bash
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:5173` (ili drugom portu ako je 5173 zauzet).

Otvorite browser i idite na adresu koja će biti prikazana u terminalu.

**Prvi put kada otvorite aplikaciju:**
- Videćete login ekran
- Možete kreirati novi nalog sa email i password
- Nakon registracije, proverite email za potvrdu (ako je email confirmation omogućen u Supabase)
- Nakon prijave, vaši podaci će se automatski čuvati u Supabase bazi

### Korak 6: Build za Production

Kada ste spremni da napravite production build, pokrenite:

```bash
npm run build
```

Ova komanda će kreirati optimizovani build u `dist/` folderu.

### Korak 7: Preview Production Builda

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

### 9. **Autentifikacija (Auth)**
- Email/password registracija i prijava
- Automatska sinhronizacija podataka sa Supabase
- Logout funkcionalnost
- Podaci su vezani za korisnički nalog

## 💾 Skladištenje Podataka

Aplikacija koristi **Supabase** za čuvanje podataka korisnika. Svi podaci se čuvaju u cloud bazi podataka i vezani su za korisnički nalog.

### Podaci koji se čuvaju:
- Odgovori na kviz
- Datum početka niza
- Istorija iskušenja
- Napredak u planu
- Status onboarding-a

### Sigurnost:
- Row Level Security (RLS) omogućava korisnicima da vide samo svoje podatke
- Svi podaci su zaštićeni autentifikacijom
- Automatska enkripcija u tranzitu i na serveru

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
- Podaci se automatski sinhronizuju sa Supabase bazom
- Korisnici mogu pristupiti svojim podacima sa bilo kog uređaja nakon prijave

## 🔐 Supabase Konfiguracija

### Email Confirmation

Po defaultu, Supabase zahteva email potvrdu. Možete to promeniti:

1. U Supabase dashboard-u, idite na **Authentication** → **Settings**
2. U sekciji **Email Auth**, možete onemogućiti "Enable email confirmations"
3. **Napomena:** Za production, preporučeno je da ostavite email confirmation uključen

### Row Level Security

RLS policies su već konfigurisane u `schema.sql` fajlu. Oni osiguravaju da:
- Korisnici mogu čitati samo svoje podatke
- Korisnici mogu ažurirati samo svoje podatke
- Korisnici mogu brisati samo svoje podatke

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

### Problem: Supabase connection errors
**Rešenje:** 
1. Proverite da li su environment variables pravilno postavljene u `.env` fajlu
2. Proverite da li je Supabase projekat aktivan
3. Proverite da li je SQL schema izvršen u Supabase SQL Editor-u
4. Proverite browser console za detaljnije greške

### Problem: Authentication not working
**Rešenje:**
1. Proverite da li je email confirmation omogućen/onemogućen prema vašim potrebama
2. Proverite da li su Supabase credentials ispravni
3. Proverite Supabase dashboard za auth logs

## 🚀 Deployment na Vercel

Aplikacija je spremna za deployment na Vercel. Za detaljne instrukcije, pogledajte [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

### Brzi Start:

1. **Dodajte Environment Variables u Vercel:**
   - `VITE_SUPABASE_URL` - Vaš Supabase URL
   - `VITE_SUPABASE_ANON_KEY` - Vaš Supabase anon key

2. **Redeploy aplikaciju** (automatski se dešava nakon git push-a)

3. **Konfigurišite Supabase Redirect URLs** sa vašim Vercel domenom

Za više detalja, pogledajte `VERCEL_DEPLOYMENT.md`.

## 📄 Licenca

Ovaj projekat je kreiran za ličnu upotrebu.

## 🤝 Podrška

Za pitanja ili probleme, proverite dokumentaciju ili kreirajte issue u repository-ju.

---

**Napravljeno sa ❤️ za bolje sutra**

