# EasySnap Backend

Bu proje, GraphQL tabanlı bir anlık mesajlaşma uygulamasının backend servisidir. Apollo Server, Express ve MongoDB kullanılarak geliştirilmiştir.

## Özellikler

- GraphQL API
- WebSocket desteği ile gerçek zamanlı mesajlaşma
- MongoDB veritabanı entegrasyonu
- JWT tabanlı kimlik doğrulama
- CORS desteği

## Teknolojiler

- Node.js
- Express.js
- Apollo Server
- GraphQL
- MongoDB
- WebSocket
- JWT
- Bcrypt

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd server
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:
```
MONGO_DB_CONN=your_mongodb_connection_string
MONGO_DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

4. Geliştirme modunda sunucuyu başlatın:
```bash
npm run start:dev
```

## API Endpointleri

- GraphQL Playground: `http://localhost:4000/graphql`
- WebSocket Endpoint: `ws://localhost:4000/graphql`

## Proje Yapısı

```
server/
├── graphql/
│   ├── resolvers/     # GraphQL resolver'ları
│   └── schema.graphql # GraphQL şeması
├── models/           # MongoDB modelleri
├── helpers/         # Yardımcı fonksiyonlar
├── app.js           # Ana uygulama dosyası
└── package.json     # Proje bağımlılıkları
```

## Lisans

ISC
