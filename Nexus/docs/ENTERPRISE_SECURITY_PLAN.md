# Nexus Enterprise Security Hazırlık Planı

## 1) Mevcut Bulgu Özeti

Bu depo üstünde yapılan hızlı statik incelemede aşağıdaki güvenlik açıkları/riskleri görüldü:

- Django ayarlarında hard-coded `SECRET_KEY`, `DEBUG=True` ve `ALLOWED_HOSTS=['*']` kullanımı mevcut.
- DB bağlantı ayarlarında örnek/parola değerleri düz metin olarak kod içinde yer alıyor.
- Kubernetes deployment içinde düz metin parola environment variable olarak set ediliyor.
- JWT secret fallback değeri (`your_jwt_secret`) ile bırakılmış.
- Güvenlik otomasyonları (Dependabot config, CodeQL, dependency gate, container/fs taraması) repo içinde tanımlı değil.

> Not: CI dışı ortamda `npm audit` denemesi npm advisory endpoint erişim kısıtı (403) nedeniyle tamamlanamadı.

## 2) Dependabot için Önerilen Kapsam

Yeni `.github/dependabot.yml` ile aşağıdaki ekosistemler haftalık taranmalı:

- `backend/auth` (npm)
- `frontend/react_frontend` (npm)
- `backend/main_service` (pip)
- `backend` (docker)
- `infra/docker` (docker)
- root (`github-actions`)

Policy:
- Tüm dependency PR’larına `dependencies` + `security` label.
- Haftalık sabit pencere (Pazartesi UTC sabah).
- Açık PR limiti ile birikmenin kontrolü.

## 3) Enterprise Seviyeye Geçiş Yol Haritası

### Faz 0 (0-7 gün) – Hızlı Kazanımlar

1. **Secrets yönetimi**
   - Kod içindeki tüm sabit secret/parolaları kaldır.
   - GitHub Secrets + runtime secret manager (Vault/AWS/GCP) ile inject et.
2. **Prod güvenli Django baseline**
   - `DEBUG=False`
   - kısıtlı `ALLOWED_HOSTS`
   - rotation’lı güçlü `SECRET_KEY`
3. **Auth hardening**
   - JWT secret zorunlu env olsun (fallback kaldır).
   - Access/refresh token ayrımı + refresh token revoke list.
4. **PR security gates**
   - CodeQL + Dependency Review + Trivy zorunlu check.

### Faz 1 (1-4 hafta) – Güvenlik Standartları

1. **Supply chain güvenliği**
   - SBOM üretimi (CycloneDX)
   - Image signing (cosign) + doğrulama policy
2. **Container/K8s hardening**
   - Non-root container, readOnlyRootFilesystem, drop capabilities
   - NetworkPolicy, PodSecurity Standards (restricted)
3. **SAST/DAST ekleme**
   - Semgrep (SAST) + OWASP ZAP (stage DAST)
4. **Branch protection**
   - En az 2 review, force-push kapalı, status checks zorunlu

### Faz 2 (1-3 ay) – Enterprise Olgunluk

1. **SOC2 / ISO27001 uyumluluk hazırlığı**
   - Asset inventory, risk register, control mapping
2. **Merkezi loglama + SIEM**
   - Uygulama, audit ve security loglarının merkezi korelasyonu
3. **Threat modeling & pentest döngüsü**
   - Her major release öncesi threat model güncellemesi
   - Yılda en az 1 dış pentest
4. **Incident response**
   - IR runbook, on-call, tabletop exercise

## 4) Teknik Backlog (Önceliklendirilmiş)

### P0
- [ ] Hard-coded secret/parolaların kaldırılması
- [ ] Django prod security ayarlarının zorunlu hale getirilmesi
- [ ] Dependabot + Security workflow’lerinin aktive edilmesi

### P1
- [ ] JWT lifecycle hardening
- [ ] K8s secret refactor (plain env yerine secretRef)
- [ ] Container hardening profile

### P2
- [ ] SBOM + artifact signing
- [ ] SIEM entegrasyonu
- [ ] Periyodik pentest programı

## 5) KPI / Başarı Kriterleri

- Critical vulns için MTTR < 7 gün
- High vulns için MTTR < 30 gün
- Dependabot PR merge oranı > %90 (30 gün)
- Security gate pass oranı > %95
- Secrets leak olay sayısı: 0
