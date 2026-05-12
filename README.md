# Sunshine Coffee API
Et starterprojekt med **Node.js**, **TypeScript**, **Express 5**, og **Prisma ORM**. Perfekt som udgangspunkt for REST API'er med moderne værktøjer og datamodellering.

---

## 🛠 Teknologier

- [TypeScript](https://www.typescriptlang.org/)
- [Express 5](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TSX](https://github.com/esbuild-kit/tsx)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## Kom i gang

### 1. Klon repo og installér afhængigheder

```bash
git clone [REPO-URL]
cd [MAPPE-NAVN]
```
### 2. Kopier eller omdøb *.env.example* til *.env*

```bash
cp .env.example .env
```
### 3. Installer pakker
```bash
npm install
```
### 4. Start serveren
```bash
npm run dev
```
### 5. Få overblik over data
```bash
npx prisma studio
```
Nu skulle du gerne kunne se en oversigt over dine modeller og data i din browser. Det er Prismas admin-panel til din database.

Klik på en af modellerne til venstre hvis du vil se og redigere data.