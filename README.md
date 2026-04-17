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
