Uygulamanın APK dosyasını [buradan](https://drive.google.com/file/d/1ap57KCybpCbAmNA7Ed86c-Jrg6VUyl3i/view?usp=sharing) indirebilirsiniz.  

# Wordle React Native

React Native ve Expo ile geliştirilmiş modern bir Wordle oyunu. Firebase entegrasyonu ve gerçek zamanlı kelime doğrulama özelliklerine sahiptir.

## 🎮 Özellikler

- **Klasik Wordle Oyunu**: 5-6 denemede kelimeyi tahmin edin
- **Çoklu Kelime Uzunlukları**: 4, 5 ve 6 harfli kelimeler için destek
- **Gerçek Zamanlı Doğrulama**: Dictionary API kullanarak kelime doğrulama
- **Firebase Entegrasyonu**: Kullanıcı kimlik doğrulama ve veri depolama
- **Çapraz Platform**: iOS ve Android'de çalışır
- **Çevrimdışı Destek**: API mevcut olmadığında yedek kelimeler
- **Modern Arayüz**: Temiz ve sezgisel kullanıcı deneyimi
- **Sosyal Paylaşım**: Sonuçları WhatsApp, Twitter ve diğer platformlarda paylaşma
- **Seri Takibi**: Günlük oynama serilerini takip etme
- **İstatistikler**: Oyun geçmişi ve başarı oranları

## 📱 Uygulama Ekranları

### 🏠 Ana Ekran (Başlangıç Ekranı)
- **Görünüm**: WORDLE başlığı ve kelime uzunluğu seçimi
- **Özellikler**: 
  - 4, 5, 6 harfli kelimeler için butonlar
  - Her buton farklı görselle desteklenir
  - Profil butonu (kullanıcı girişi için)
  - Seri sayacı (giriş yapan kullanıcılar için)
- **Kullanım**: Kullanıcı oyuna başlamak için kelime uzunluğunu seçer

<img src="https://github.com/user-attachments/assets/0032a642-259f-41a9-8af3-da5ff6847642" alt="Screenshot_1750200318" width="25%">

<img src="https://github.com/user-attachments/assets/74deb3e8-e4f3-4ccf-852c-1f4374897c4f" alt="Screenshot_1750200336" width="25%">

### 🎯 Oyun Ekranı
- **Görünüm**: 
  - Üst kısımda kelime uzunluğu göstergesi
  - Ortada tahmin kutuları (5 satır, seçilen uzunluk kadar sütun)
  - Alt kısımda sanal klavye
- **Renk Kodları**:
  - 🟩 Yeşil: Harf doğru ve doğru pozisyonda
  - 🟨 Sarı: Harf kelimede var ama yanlış pozisyonda
  - ⬜ Gri: Harf kelimede yok
- **Klavye**: 
  - Alfabetik sıraya göre harfler
  - Enter ve Backspace butonları
  - Harflerin durumuna göre renk değişimi

<img src="https://github.com/user-attachments/assets/2d3cfd04-803e-4033-bbf4-810f6819f09c" alt="Screenshot_1750200902" width="25%">

<img src="https://github.com/user-attachments/assets/9fb83cac-a860-41ed-a93f-c3c4268d2967" alt="Screenshot_1750201180" width="25%">

### 🏆 Sonuç Ekranı (Modal)
- **Kazanma Durumu**:
  - "Congratulations!" başlığı
  - Doğru kelimeyi gösterir
  - Paylaşım butonları
- **Kaybetme Durumu**:
  - "You Lost!" başlığı
  - Doğru cevabı gösterir
  - Paylaşım seçenekleri
- **Paylaşım Seçenekleri**:
  - WhatsApp paylaşımı
  - Twitter/X paylaşımı
  - Kopyala butonu
  - Genel paylaşım

<img src="https://github.com/user-attachments/assets/9d25bf17-eae7-4e6e-a5df-13aac4f1ab34" alt="Screenshot_1750200946" width="25%">

<img src="https://github.com/user-attachments/assets/e2e7f69f-c7b0-4959-9534-4fee7abab98b" alt="Screenshot_1750201024" width="25%">

### 👤 Profil ve Giriş Ekranları
- **Giriş Yapmamış Kullanıcılar**:
  - "Sınırsız oyun için giriş yapın!" mesajı
  - Giriş Yap ve Kayıt Ol butonları
- **Giriş Modal'ı**:
  - E-posta ve şifre alanları
  - Şifre görünürlük toggle'ı
  - "Welcome Back!" başlığı
- **Kayıt Modal'ı**:
  - Ad Soyad, e-posta, şifre ve şifre onayı
  - Şifre güvenlik kontrolleri
  - "Create Account" başlığı

<img src="https://github.com/user-attachments/assets/eb74b04c-b420-4763-904a-960db591d5dd" alt="Screenshot_1750200339" width="25%">

<img src="https://github.com/user-attachments/assets/a5743f27-772e-4cbb-9518-9ce1d938260a" alt="Screenshot_1750200385" width="25%">

### 🔥 Seri Takip Ekranı (Modal)
- **Seri Bilgileri**:
  - Mevcut seri sayısı
  - Toplam oynanan oyun sayısı
  - Son oynama tarihi
- **Görsel Göstergeler**:
  - Alev ikonu (🔥) seri göstergesi
  - İstatistik kartları
  - Günlük ilerleme çubuğu

![Screenshot_1750200403](https://github.com/user-attachments/assets/1ac2bfc5-2a62-464d-a6f9-5cdd21fe8202)

### ⚙️ Ayarlar ve Onay Ekranları
- **Çıkış Onayı**:
  - "Çıkış yapmak istediğinizden emin misiniz?" mesajı
  - Evet/Hayır butonları
- **Hata Mesajları**:
  - "Geçerli bir kelime girin!" uyarısı
  - API bağlantı hataları için bildirimler

## 🛠️ Kullanılan Teknolojiler

- **React Native**: Mobil uygulama framework'ü
- **Expo**: Geliştirme platformu ve araçları
- **TypeScript**: Tip güvenli JavaScript
- **Firebase**: Backend servisleri (Auth, Firestore)
- **RapidAPI**: Kelime üretimi API'si
- **Dictionary API**: Kelime doğrulama

## 🚀 Kurulum

Apk dosyasını indirmek için: 

## 🏗️ Proje Yapısı

```
wordle_react_native/
├── src/
│   ├── components/         # Tekrar kullanılabilir UI bileşenleri
│   │   ├── auth/          # Kimlik doğrulama bileşenleri
│   │   ├── Elements.ts    # Stil sabitleri ve renkler
│   │   ├── ProfileButton.tsx
│   │   └── ResultModal.tsx
│   ├── screens/           # Uygulama ekranları
│   ├── utils/             # Yardımcı fonksiyonlar ve servisler
│   │   ├── alphabet.ts    # Alfabe ve klavye düzeni
│   │   └── wordServices.ts # Kelime API servisleri
│   ├── logic/             # Oyun mantığı
│   │   └── GameLogic.ts
│   ├── services/          # Firebase servisleri
│   │   ├── AuthService.ts
│   │   └── FirebaseService.ts
│   ├── config/            # Yapılandırma dosyaları
│   │   └── firebase.ts
│   └── contexts/          # React Context'leri
├── assets/                # Görseller, fontlar ve statik dosyalar
├── app.config.js          # Expo yapılandırması
├── .env                   # Ortam değişkenleri
└── README.md              # Bu dosya
```

## 🎯 Nasıl Oynanır

1. **Amaç**: Gizli kelimeyi 6 denemede veya daha azında tahmin edin
2. **Girdi**: Geçerli bir kelime yazın ve Enter'a basın
3. **Geri Bildirim**: 
   - 🟩 Yeşil: Harf doğru ve doğru pozisyonda
   - 🟨 Sarı: Harf kelimede var ama yanlış pozisyonda
   - ⬜ Gri: Harf kelimede yok
4. **Kazanma**: Kelimeyi doğru tahmin edin
5. **Kaybetme**: 6 deneme hakkınızı tüketin


## 📋 Detaylı Özellikler

### Kelime Üretimi
- RapidAPI'nin Random Word API'sini kullanır
- API mevcut olmadığında önceden tanımlı kelimelerle yedekleme sistemi
- Çoklu kelime uzunluğu desteği (4, 5, 6 harf)

### Kelime Doğrulama
- Dictionary API kullanarak gerçek zamanlı doğrulama
- Hedef kelime sözlükte olmasa bile kabul edilir
- Ağ hataları için hata yönetimi

### Firebase Entegrasyonu
- Kullanıcı kimlik doğrulama
- Oyun istatistikleri depolama
- Cihazlar arası senkronizasyon
- Günlük seri takibi

### Kullanıcı Deneyimi
- Sezgisel dokunmatik klavye
- Anlık görsel geri bildirim
- Sosyal medya paylaşım entegrasyonu
- Çevrimdışı oyun desteği

## 🙏 Teşekkürler

- Josh Wardle'a orijinal Wordle oyunu için
- [RapidAPI](https://rapidapi.com/)'ye kelime üretimi API'si için
- [Dictionary API](https://dictionaryapi.dev/)'ye kelime doğrulama için
- [Firebase](https://firebase.google.com/)'e backend servisleri için
- [Expo](https://expo.dev/)'ya geliştirme araçları için

---

## 🎨 Ekran Görüntüleri ve Kullanım Detayları

### Ana Ekran Akışı
1. Uygulama açılır ve kullanıcı WORDLE başlığını görür
2. Alt kısımda 3 seçenek sunulur: "4 Letters", "5 Letters", "6 Letters"
3. Her seçenek görsel bir kart şeklinde tasarlanmıştır
4. Sağ üst köşede profil ikonu ve seri sayacı bulunur

### Oyun Mekaniği
- Oyun başladığında seçilen uzunlukta boş kutular görüntülenir
- Kullanıcı sanal klavyeyi kullanarak kelime girer
- Her harf girişinde kutular dolar
- Enter tuşuna basıldığında kelime kontrol edilir
- Geçersiz kelime girişinde uyarı mesajı gösterilir
- Geçerli kelime girişinde renkli geri bildirim verilir

### Sosyal Özellikler
- Oyun bitiminde sonuç emoji'lerle gösterilir
- Paylaşım butonu ile sonuçlar sosyal medyada paylaşılabilir
- Giriş yapan kullanıcılar için seri takibi yapılır
- İstatistikler Firebase'de saklanır

Bu kapsamlı dokümantasyon, Wordle React Native uygulamanızın tüm özelliklerini ve kullanım şekillerini Türkçe olarak açıklamaktadır.
