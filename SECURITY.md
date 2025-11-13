# Güvenlik Dokümantasyonu

Bu dokümantasyon, PDF Converter web sitesinin güvenlik gereksinimlerini ve uygulanan önlemleri açıklar.

## 🔒 Uygulanan Güvenlik Önlemleri

### Frontend Güvenlik

#### 1. Content Security Policy (CSP)
- XSS saldırılarına karşı koruma
- Sadece güvenilir kaynaklardan script ve stil yüklenmesi
- Inline script'ler için `unsafe-inline` kullanımı (sadece gerekli yerlerde)

#### 2. Güvenli HTTP Header'lar
- `X-Content-Type-Options: nosniff` - MIME type sniffing koruması
- `X-Frame-Options: DENY` - Clickjacking koruması
- `Referrer-Policy: strict-origin-when-cross-origin` - Referrer bilgisi kontrolü
- `Permissions-Policy` - Gereksiz API erişimlerinin engellenmesi

#### 3. Dosya Validasyonu
- **Dosya Tipi Kontrolü**: Hem uzantı hem de MIME type kontrolü
- **Dosya Boyutu Limitleri**: 
  - Tek dosya: 100 MB
  - Toplam: 500 MB
- **Dosya Adı Sanitizasyonu**: Path traversal ve özel karakter koruması

#### 4. Client-Side Rate Limiting
- Dosya yükleme sayısı kontrolü
- Eşzamanlı işlem limiti

## ⚠️ Backend Gerektiren Güvenlik Önlemleri

Aşağıdaki önlemler backend implementasyonu gerektirir:

### 1. Network & İletişim Güvenliği

#### HTTPS Zorunluluğu
```nginx
# Nginx örneği
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### 2. Dosya Yükleme Güvenliği

#### Magic Bytes Doğrulama
```python
# Python örneği
import magic

def validate_pdf(file_content):
    mime = magic.Magic(mime=True)
    detected_type = mime.from_buffer(file_content)
    return detected_type == 'application/pdf'
```

#### Sandbox Ortamı
- Docker container'da PDF işleme
- Root olmayan kullanıcı ile çalıştırma
- Network izolasyonu
- Resource limitleri (CPU, RAM, disk)

### 3. Dosya Saklama & Silme

#### Geçici Saklama
- Dosyalar geçici storage'da (S3, local tmp)
- Token-based erişim
- Otomatik silme (10-60 dakika sonra)

#### Şifreleme
- At-rest encryption (AES-256)
- Random UUID ile dosya adlandırma

### 4. Web Uygulaması Güvenliği

#### OWASP Top 10 Önlemleri
- **SQL Injection**: Prepared statements
- **XSS**: Output encoding, CSP
- **CSRF**: CSRF token, SameSite cookies
- **SSRF/RCE**: İzole servisler

#### Rate Limiting
```python
# Flask-Limiter örneği
from flask_limiter import Limiter

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["100 per hour"]
)

@app.route('/upload', methods=['POST'])
@limiter.limit("10 per minute")
def upload_file():
    pass
```

### 5. Loglama & İzleme

#### Güvenli Loglama
- PII (kişisel bilgiler) loglanmamalı
- Dosya içeriği loglanmamalı
- Sadece teknik bilgiler: IP, timestamp, işlem durumu

#### Monitoring
- Hata oranları
- Response time
- Şüpheli trafik alarmları

### 6. Sunucu & Altyapı

#### Ayrık Servisler
- Web API
- Dosya işleme servisi
- Storage servisi

#### Güncellemeler
- PDF işleme araçları düzenli güncellenmeli
- Güvenlik patch'leri otomatik uygulanmalı

## 📋 Güvenlik Checklist

### Deployment Öncesi
- [ ] HTTPS yapılandırıldı
- [ ] HSTS header eklendi
- [ ] Güvenli header'lar yapılandırıldı
- [ ] CSP policy test edildi
- [ ] Dosya validasyonu test edildi
- [ ] Rate limiting aktif
- [ ] Loglama yapılandırıldı
- [ ] Monitoring kuruldu
- [ ] Backup stratejisi hazır

### Sürekli İyileştirme
- [ ] Güvenlik güncellemeleri takip ediliyor
- [ ] Loglar düzenli inceleniyor
- [ ] Penetrasyon testleri yapılıyor
- [ ] Güvenlik açıkları bildirimi mekanizması var

## 🔗 Kaynaklar

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 📧 Güvenlik Açığı Bildirimi

Güvenlik açığı bulursanız, lütfen özel olarak bildirin:
- Email: security@example.com
- GitHub Security Advisories: [Repository]/security/advisories

**Lütfen güvenlik açıklarını public issue olarak açmayın.**

