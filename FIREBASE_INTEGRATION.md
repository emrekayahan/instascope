# Instascope - Firebase Firestore Entegrasyon Talimatı

## Genel Durum ve Hedef
Yerel Python botu (Gemma 4 kullanarak) başarıyla içerik üretmekte ve üretilen içerikleri Firebase Firestore üzerinde, `instascope` isimli özel veritabanındaki (Database ID: `instascope`) `published_content` koleksiyonuna yazmaktadır. 

Şu anki sorun, Next.js (Docker üzerinde çalışan) projesinin bu yeni makaleleri canlı sitede çekemiyor / listelemiyor olmasıdır. Bunun temel nedenleri, varsayılan veritabanı seçimi (`(default)`) uyuşmazlığı ve Docker ortam değişkenleri eksikliğidir.

## IDE'den Yapılması İstenen Adımlar

### 1. Firebase Yapılandırma (Config) Güncellemesi
Projede Firebase'in başlatıldığı (initialize edildiği) dosyayı (Örn: `lib/firebase.js`, `config/firebase.ts` vb.) bulun. 

Firestore istemcisi başlatılırken **mutlaka** `databaseId` parametresine `"instascope"` değeri atanmalıdır. Varsayılan istemci (boş bırakıldığında) `(default)` veritabanına bağlanmaya çalışır, bu da makalelerin çekilememesine neden olur.

**Örnek Güncel Kod Yapısı:**
```javascript
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "instascope-aba22",
};

// Uygulamayı başlat
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// KRİTİK: databaseId parametresi eklenerek 'instascope' veritabanı hedeflenmeli
const db = getFirestore(app, "instascope");

export { db };