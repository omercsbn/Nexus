# Base image olarak Node.js 14'ü kullanıyoruz
FROM node:14

# Uygulama dizinini oluştur
WORKDIR /usr/src/app

# Paket bağımlılıklarını yüklemek için package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak dosyalarını kopyala
COPY . .

# Servisin dinleyeceği portu belirt
EXPOSE 5000

# Uygulamayı başlat
CMD ["node", "app.js"]
