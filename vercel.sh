#!/bin/bash

# Vercel Deployment Script for LUXE Clothing Store

echo "🚀 Starting Vercel Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if needed)
echo "🔐 Logging in to Vercel..."
vercel login

# Link project (first time only)
echo "🔗 Linking project to Vercel..."
vercel link --yes

# Pull environment variables
echo "📦 Pulling environment variables..."
vercel env pull

# Deploy to production
echo "📤 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Visit: https://cloth-by-syed.vercel.app"
