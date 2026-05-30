# Techdive 🚀

**Techdive** is a modern remote tech jobs discovery and matching platform that connects developers worldwide with high-quality remote opportunities. Find your next remote role, track applications, and manage subscriptions all in one place.

**Live:** [techdive.space](https://techdive.space)

---

## Features ✨

### For Job Seekers
- 🔍 **Browse Jobs** - Aggregate remote jobs from Remotive, Arbeitnow, and more
- 🎯 **Smart Filtering** - Filter by category, experience, job type, salary range
- 💾 **Save Jobs** - Bookmark interesting opportunities for later
- 📊 **Track Applications** - Monitor application status (applied, interviewing, accepted, rejected)
- 🤖 **AI Recommendations** - Get personalized job matches based on your skills
- 📧 **Email Alerts** - Daily/weekly job digests tailored to your preferences
- 💳 **Flexible Subscriptions** - Free, Pro ($9.99/month), or Enterprise plans

### For the Platform
- 🌍 **Multi-currency Support** - KES, USD with Paystack/Stripe integration
- 🔐 **Secure Authentication** - JWT tokens, cookie-based sessions
- 📈 **Real-time Analytics** - Vercel Analytics tracking user engagement
- 🎨 **Dark Theme UI** - Modern, accessible design with Tailwind CSS
- 📱 **Fully Responsive** - Works seamlessly on mobile and desktop

---

## Tech Stack 🛠️

### Frontend
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Hosting:** Vercel
- **UI Components:** Custom + Lucide icons
- **Type Safety:** TypeScript

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT + HTTP-only cookies
- **Hosting:** Railway
- **Job Scheduling:** Node.js intervals (every 6 hours)
- **Payment:** Paystack API integration

### DevOps & Tools
- **Database Hosting:** Neon PostgreSQL
- **Email:** Resend (planned)
- **Analytics:** Vercel Analytics
- **Version Control:** Git/GitHub
- **Monitoring:** Railway logs

---

## Project Structure 📁

```
techdive/
├── frontend/                    # Next.js application
│   ├── app/
│   │   ├── (public)/           # Public pages (landing, auth, etc)
│   │   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── components/         # Reusable React components
│   │   ├── lib/               # Utilities, hooks, API client
│   │   └── layout.tsx
│   ├── public/                 # Static assets
│   └── package.json
│
└── backend/                     # Express API
    ├── src/
    │   ├── controllers/        # Request handlers
    │   ├── routes/            # API route definitions
    │   ├── middleware/        # Auth, error handling, rate limiting
    │   ├── services/          # Business logic (payments, scraping)
    │   ├── lib/              # Database, utilities
    │   └── index.js          # Entry point
    ├── prisma/               # Database schema & migrations
    └── package.json
```

---

## Getting Started 🚀

### Prerequisites
- Node.js 22+ 
- npm or yarn
- PostgreSQL database
- Paystack account (for payments)

### Local Setup

#### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/tintin-dev/techdive.git
cd techdive

# Frontend setup
cd frontend
npm install

# Backend setup (in new terminal)
cd ../backend
npm install
```

#### 2. Environment Variables

**Backend:** `backend/.env`
```env
# Database
DATABASE_URL=postgresql://*******

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=24h

# Paystack
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PLAN_PRO=PLN_xxxxx
PAYSTACK_PLAN_ENTERPRISE=PLN_xxxxx

# Frontend
FRONTEND_URL=http://localhost:3000

# Admin
ADMIN_API_KEY=secret_admin_key

# Optional
AFRICA_TALKING_API_KEY=xxxxx
```

**Frontend:** `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 3. Database Setup

```bash
cd backend

# Create database
npx prisma migrate dev --name init

# Seed data (optional)
npx prisma db seed
```

#### 4. Run Locally

```bash
# Terminal 1: Backend (port 5000)
cd backend
npm run dev

# Terminal 2: Frontend (port 3000)
cd frontend
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## API Endpoints 📡

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/save` - Save job
- `POST /api/jobs/unsave` - Unsave job
- `GET /api/jobs/saved` - Get saved jobs

### Applications
- `GET /api/applications` - List user applications
- `POST /api/applications` - Apply for job
- `PATCH /api/applications/:id` - Update application status

### Subscriptions
- `GET /api/subscriptions` - Get subscription status
- `POST /api/subscriptions/paystack/checkout` - Initiate Paystack payment
- `POST /api/subscriptions/payments/verify/:reference` - Verify payment
- `POST /api/subscriptions/cancel` - Cancel subscription

### Recommendations
- `GET /api/recommendations` - Get personalized jobs
- `GET /api/recommendations/trending` - Trending jobs this week
- `GET /api/recommendations/similar/:jobId` - Similar jobs

### Users
- `PATCH /api/users/profile` - Update profile
- `GET /api/users/preferences` - Get email preferences
- `PATCH /api/users/preferences` - Update preferences
- `DELETE /api/users/delete` - Delete account

---

## Database Schema 🗄️

### Core Models
- **User** - User accounts, profiles, preferences
- **Subscription** - Subscription plans and billing
- **Job** - Job listings with details
- **SavedJob** - Bookmarked jobs
- **JobApplication** - Application tracking
- **Invoice** - Payment history
- **JobScrapeLog** - Scraper run logs

See `prisma/schema.prisma` for full schema.

---

## Deployment 🌐

### Backend (Railway)

```bash
# Login to Railway
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs
```

Set environment variables in Railway dashboard.

### Frontend (Vercel)

```bash
# Push to GitHub (auto-deploys)
git push origin main

# Or manual deploy
vercel deploy --prod
```

**Important:** Set `NEXT_PUBLIC_API_URL` in Vercel Environment Variables!

```env
NEXT_PUBLIC_API_URL=https://your-railway-backend.up.railway.app/api
```

---

## Job Scraping 🤖

Jobs are automatically scraped every 6 hours from:
- **Remotive** - Remote-first jobs (https://remotive.com/api/remote-jobs)
- **Arbeitnow** - Tech jobs worldwide (https://www.arbeitnow.com/api/job-board-posts)

Scraper runs on backend startup and scheduled intervals.

To manually trigger:
```bash
curl -X GET http://localhost:5000/api/admin/scrape \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

---

## Payment Integration 💳

### Paystack Setup

1. **Create Account** - https://paystack.com
2. **Create Plans**
   - Pro: 1899 KES
   - Enterprise: 3999 KES
3. **Get Credentials**
   - Secret Key
   - Plan Codes (PLN_xxx)
4. **Set Webhook URL** (Production)
   ```
   https://your-backend.up.railway.app/api/webhooks/paystack
   ```

### Test Payments

Use Paystack test mode cards:
- Visa: `4111 1111 1111 1111`
- Mastercard: `5399 8181 8181 8181`
- Any expiry/CVV in test mode

---

## Email & Notifications 📧

- **Resend** - Email delivery
- **Job alerts** - Daily/weekly digests
- **Application updates** - Status changes
- **Newsletter** - Platform tips & updates

---

## Features Roadmap 🗺️

- [ ] Google/GitHub OAuth
- [ ] Resume upload & matching
- [ ] Interview scheduling
- [ ] Employer dashboard
- [ ] Sponsored job listings
- [ ] API access (Enterprise)
- [ ] Teams collaboration
- [ ] Mobile app (React Native)

---

## Key Pages 📄

### Public
- `/` - Landing page with pricing
- `/jobs` - Browse all jobs
- `/jobs/[id]` - Job details
- `/signup` - Create account
- `/login` - Sign in
- `/blog` - Blog posts
- `/faq` - FAQs
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/cookies` - Cookie policy

### Dashboard (Protected)
- `/dashboard` - Home with stats
- `/dashboard/jobs` - Job browser
- `/dashboard/applications` - Application tracker
- `/dashboard/saved` - Saved jobs
- `/dashboard/pricing` - Upgrade plan
- `/dashboard/profile` - Edit profile
- `/dashboard/settings` - Account settings

---

## Environment Variables Reference 🔑

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | JWT signing key |
| `PAYSTACK_SECRET_KEY` | ✅ | Paystack API key |
| `PAYSTACK_PLAN_PRO` | ✅ | Paystack Pro plan code |
| `PAYSTACK_PLAN_ENTERPRISE` | ✅ | Paystack Enterprise plan code |
| `FRONTEND_URL` | ✅ | Frontend base URL |
| `ADMIN_API_KEY` | ✅ | Admin endpoint auth |
| `NEXT_PUBLIC_API_URL` | ✅ | API base URL (frontend only) |
| `JWT_EXPIRE` | ❌ | Token expiry (default: 24h) |
| `PORT` | ❌ | Backend port (default: 5000) |

---

## Testing 🧪

### Manual Testing
1. Sign up with email
2. Browse jobs on `/jobs`
3. Click job to view details
4. Save a job
5. Go to dashboard
6. View saved jobs
7. Test subscription upgrade
8. Track application status

### Automated Testing
```bash
# Run tests (coming soon)
npm test
```

---

## Performance 🚀

### Metrics
- **Lighthouse Score:** 76+ (Speed, SEO, Best Practices)
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTL (Time to First Byte):** < 1s

### Optimization
- Image optimization (WebP, AVIF)
- Code splitting & lazy loading
- Database query optimization
- Redis caching (planned)

---

## Troubleshooting 🔧

### Jobs Not Displaying
1. Check scraper logs: `npm run dev` in backend
2. Verify database connection: `npx prisma studio`
3. Manually trigger scrape (see Job Scraping section)

### Payment Not Updating
1. Check webhook URL on Paystack dashboard
2. Verify `PAYSTACK_SECRET_KEY` is correct
3. Check Railway logs for webhook errors
4. Use ngrok for local testing: `ngrok http 5000`

### 404 on Job Details
1. Ensure `NEXT_PUBLIC_API_URL` is set on Vercel
2. Backend job endpoint exists: `GET /api/jobs/:id`
3. Redeploy frontend after env var change

### Auth Issues
1. Check cookie in DevTools (Application → Cookies)
2. Verify JWT secret is same on frontend and backend
3. Check token expiry: `JWT_EXPIRE`

---

## Contributing 🤝

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## License 📜

This project is licensed under the MIT License - see LICENSE file for details.

---

## Support 💬

- **Email:** support@techdive.space
- **Contact Form:** https://techdive.space/contact
- **GitHub Issues:** Report bugs and request features

---

## Built By ✍️

**Martin** - Full-stack developer in Nairobi, Kenya

- GitHub: [@TintinSDev](https://github.com/TintinSDev/)
- Portfolio: [techdive.space](https://techdive.space)

---

## Acknowledgments 🙏

- **Job Sources:** Remotive, Arbeitnow
- **Hosting:** Vercel, Railway, Neon
- **Payments:** Paystack
- **Icons:** Lucide React
- **Design:** Tailwind CSS

---

## Last Updated

May 30, 2026

**Status:**  Live & Production Ready

---

Happy coding! 🚀