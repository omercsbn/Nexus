#!/bin/bash

# Nexus Project Structure

# Root Directory
mkdir -p Nexus
cd Nexus

# Backend
mkdir -p backend/auth/src/{config,controllers,middlewares,models,routes,services,test,utils}
mkdir -p backend/db/{migrations,models,seeds}
mkdir -p backend/logs/{auth,db,main}
mkdir -p backend/main_service/ecommerce/{banking,catalog,checkout,migrations,payment,test}
mkdir -p backend/main_service/main_service/migrations
mkdir -p backend/monitoring/{grafana/dashboards,prometheus}
mkdir -p backend/scripts

# Frontend
mkdir -p frontend/{web/{src,public},mobile/{src,public},desktop/{src,public}}

# Infrastructure
mkdir -p infra/docker/{auth,main_service,monitoring/{grafana/dashboards,prometheus}}
mkdir -p infra/kubernetes/{auth,main_service,monitoring}

# General Files
touch README.md LICENSE

# Backend Files
touch backend/auth/.env backend/auth/app.js backend/auth/Dockerfile backend/auth/package.json
touch backend/auth/src/config/{authConfig.js,dbConfig.js,serverConfig.js}
touch backend/auth/src/controllers/{authController.js,orderController.js,paymentController.js,productController.js,userController.js}
touch backend/auth/src/middlewares/{validateMiddleware.js,validationMiddleware.js}
touch backend/auth/src/models/{bankAccountModel.js,orderModel.js,paymentModel.js,productModel.js,userModel.js}
touch backend/auth/src/routes/{authRoutes.js,orderRoutes.js,paymentRoutes.js,productRoutes.js,userRoutes.js}
touch backend/auth/src/services/{authService.js,bankService.js,orderService.js,paymentService.js,productService.js}
touch backend/auth/src/test/auth.test.js
touch backend/auth/src/utils/jwtHelper.js
touch backend/auth/src/index.js

touch backend/db/knexfile.js backend/db/migrations/{Dockerfile,init.js} backend/db/models/databaseModel.js backend/db/seeds/seed.js
touch backend/logs/auth/auth.log backend/logs/db/db.log backend/logs/main/main.log

touch backend/main_service/Dockerfile backend/main_service/manage.py backend/main_service/requirements.txt
touch backend/main_service/main_service/{asgi.py,settings.py,urls.py,wsgi.py,__init__.py}

touch backend/monitoring/grafana/dashboards/main.json backend/monitoring/prometheus/prometheus.yml

touch backend/.env backend/docker-compose.yml backend/Dockerfile

# Frontend Files
touch frontend/web/{Dockerfile,package.json,.env}
touch frontend/mobile/{Dockerfile,package.json,.env}
touch frontend/desktop/{Dockerfile,package.json,.env}

# Infrastructure Files
touch infra/docker/docker-compose.yaml
touch infra/docker/auth/Dockerfile infra/docker/main_service/Dockerfile
touch infra/docker/monitoring/grafana/dashboards/main.json infra/docker/monitoring/prometheus/prometheus.yml
touch infra/kubernetes/auth/{deployment.yaml,service.yaml}
touch infra/kubernetes/main_service/deployment.yaml
touch infra/kubernetes/monitoring/{grafana-deployment.yaml,prometheus-deployment.yaml}

echo "Proje yapısı oluşturuldu."
