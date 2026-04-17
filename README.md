# API_web

# 🪙 Stablecoin Platform - Plataforma de Stablecoins con IA Local

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-✓-2496ED?logo=docker)](https://www.docker.com/)
[![Expo](https://img.shields.io/badge/Expo-✓-000020?logo=expo)](https://expo.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-✓-000000?logo=ollama)](https://ollama.com/)

Plataforma completa para gestión de stablecoins con inteligencia artificial local, contenerizada con Docker y desplegada con Nginx.

## 📋 Tabla de Contenidos
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Servicios](#-servicios)
- [Desarrollo](#-desarrollo)
- [Producción](#-producción)
- [Contribución](#-contribución)

## 🏗️ Arquitectura




![Banner](https://raw.githubusercontent.com/oscarmacias2000/stablecoin-platform/main/assets/banner.png)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-✓-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Expo](https://img.shields.io/badge/Expo-✓-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-✓-000000?logo=ollama&logoColor=white)](https://ollama.com/)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-14B-4A6FA5?logo=deepseek&logoColor=white)](https://deepseek.com/)
[![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639?logo=nginx&logoColor=white)](https://nginx.com/)
[![React Native](https://img.shields.io/badge/React_Native-✓-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-✓-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-✓-2D3748?logo=prisma&logoColor=white)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-4169E1?logo=postgresql&logoColor=white)](https://postgresql.org/)

> 🚀 **Plataforma completa para gestión de stablecoins con inteligencia artificial local**  
> Todo el stack contenerizado con Docker, IA local con DeepSeek R1 14B, y frontend multiplataforma con Expo

---

## 🎥 Demo y Screenshots

### 🖥️ Open WebUI - Interfaz Principal de IA
![Open WebUI Dashboard](https://github.com/open-webui/open-webui/raw/main/demo.png)

### 🤖 DeepSeek R1 14B en acción
![DeepSeek Demo](https://icon.icepanel.io/Technology/svg/JavaScript.svg)

### 📱 Frontend Expo - App Multiplataforma
![Expo App](https://icon.icepanel.io/Technology/svg/Android.svg)

### 🐳 Arquitectura Docker completa
![Docker Architecture](https://icon.icepanel.io/Technology/svg/Docker.svg)

---

## 🏗️ Arquitectura del Sistema






## 🛠️ Tecnologías

### Backend
- **Node.js** + **Express** - API REST
- **Prisma** - ORM para base de datos
- **PostgreSQL** / **SQLite** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación

### Frontend
- **React Native** + **Expo** - Desarrollo multiplataforma
- **React Navigation** - Navegación
- **Axios** - Cliente HTTP
- **AsyncStorage** - Almacenamiento local

### IA Local
- **Ollama** - Servidor de modelos locales
- **DeepSeek R1:14B** - Modelo de lenguaje (14GB)
- **Open WebUI** - Interfaz web para IA

### Infraestructura
- **Docker** + **Docker Compose** - Contenerización
- **nginx-proxy** - Proxy inverso
- **Let's Encrypt** - Certificados SSL automáticos

## 📦 Requisitos Previos

```bash
# Node.js v18+
node --version

# Docker y Docker Compose
docker --version
docker-compose --version

# Expo CLI
npm install -g expo-cli

# Git
git --version



