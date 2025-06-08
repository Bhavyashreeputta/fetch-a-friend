# Fetch Dogs – Find a Shelter Pup a New Home 🐾

Welcome! This little web app lets you browse real shelter-dog data, mark your
favourite pups, and get matched with the perfect companion. It was created as
a front-end take-home for Fetch, but anyone can run it locally in just a few
minutes.

---

## Quick tour

| Screen            | What you can do                                                      |
| ----------------- | -------------------------------------------------------------------- |
| **Landing**       | Animated hero, floating paw prints, “Start Browsing” button.         |
| **Login**         | Type a name + email (no password needed) and you’re in.              |
| **Search**        | Filter by breed, age range, city/ZIP, sort results, infinite scroll. |
| **Favourites**    | Click "heart" to add dogs; a tray slides up to show your list.       |
| **Match**         | Click **Find my match** → confetti 🎉 and your best-fit dog card.    |
| **Logout**        | One click ends your session and returns you to login.                |

Everything is responsive (phone to desktop) and supports light & dark mode.

---

## Tech stack 

| What                | Why it’s here                                                   |
| ------------------- | --------------------------------------------------------------- |
| **Next.js 14**      | Fast pages plus built-in “API routes” so we didn’t need a backend server. |
| **React**           | Breaks the UI into reusable components.                         |
| **Tailwind CSS**    | Utility classes for quick, consistent styling.                  |
| **Framer Motion**   | Smooth fades, hover zooms, and button animations.               |
| **React Query**     | Caches API calls so scrolling feels instant.                    |
| **Canvas-Confetti** | The fun fireworks on the match screen.                          |

---

## 🚀 Run it on your computer (≈ 5 min)

1. **Install Node 18 +**  
   Windows / macOS downloads: <https://nodejs.org>

2. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/fetch-dogs.git
   cd fetch-dogs
   npm install
   npm run dev 
