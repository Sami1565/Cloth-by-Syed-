'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { FaSearch, FaStar } from 'react-icons/fa'
import { IoHeartOutline } from 'react-icons/io5'
import { useCartStore } from '@/store/cartStore'

const allProducts = [
  // ===== MEN'S PRODUCTS =====
  { id: 1, name: 'Velocity Jacket', price: 249, category: 'Men', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.8, reviews: 42 },
  { id: 2, name: 'Cargo Pants', price: 134, category: 'Men', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.6, reviews: 29 },
  { id: 3, name: 'Wool Sweater', price: 159, category: 'Men', subCategory: 'Sweaters', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop', rating: 4.7, reviews: 28 },
  { id: 4, name: 'Leather Jacket', price: 299, category: 'Men', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', rating: 4.8, reviews: 51 },
  { id: 5, name: 'Formal Shirt', price: 89, category: 'Men', subCategory: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', rating: 4.5, reviews: 34 },
  { id: 6, name: 'Casual Blazer', price: 199, category: 'Men', subCategory: 'Blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop', rating: 4.7, reviews: 39 },
  { id: 7, name: 'Denim Jeans', price: 119, category: 'Men', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', rating: 4.6, reviews: 44 },
  { id: 8, name: 'T-Shirt', price: 49, category: 'Men', subCategory: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', rating: 4.4, reviews: 56 },
  { id: 9, name: 'Hoodie', price: 99, category: 'Men', subCategory: 'Sweaters', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop', rating: 4.5, reviews: 38 },
  
  // ===== WOMEN'S PRODUCTS =====
  { id: 10, name: 'Aura Dress', price: 189, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 38 },
  { id: 11, name: 'Silk Blouse', price: 119, category: 'Women', subCategory: 'Tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', rating: 4.9, reviews: 47 },
  { id: 12, name: 'Summer Dress', price: 149, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', rating: 4.6, reviews: 35 },
  { id: 13, name: 'Designer Saree', price: 299, category: 'Women', subCategory: 'Traditional', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.8, reviews: 43 },
  { id: 14, name: 'Women Kurti', price: 79, category: 'Women', subCategory: 'Traditional', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.6, reviews: 28 },
  { id: 15, name: 'Party Gown', price: 249, category: 'Women', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1566174053873-3156b1a6c5a6?w=400&h=500&fit=crop', rating: 4.9, reviews: 52 },
  { id: 16, name: 'Jeans', price: 99, category: 'Women', subCategory: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', rating: 4.5, reviews: 33 },
  { id: 17, name: 'Skirt', price: 69, category: 'Women', subCategory: 'Bottoms', image: 'https://images.unsplash.com/photo-1583496661160-f4b2dafb1fd3?w=400&h=500&fit=crop', rating: 4.6, reviews: 41 },
  
  // ===== KIDS' PRODUCTS =====
  { id: 18, name: 'Kids T-Shirt', price: 49, category: 'Kids', subCategory: 'T-Shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop', rating: 4.7, reviews: 18 },
  { id: 19, name: 'Kids Sneakers', price: 69, category: 'Kids', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop', rating: 4.6, reviews: 24 },
  { id: 20, name: 'Kids Dress', price: 59, category: 'Kids', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop', rating: 4.8, reviews: 21 },
  { id: 21, name: 'Kids Jacket', price: 79, category: 'Kids', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.5, reviews: 16 },
  { id: 22, name: 'Kids Pants', price: 39, category: 'Kids', subCategory: 'Pants', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop', rating: 4.4, reviews: 19 },
  
  // ===== ACCESSORIES =====
  { id: 23, name: 'Nova Sneakers', price: 159, category: 'Accessories', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 56 },
  { id: 24, name: 'Leather Belt', price: 89, category: 'Accessories', subCategory: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', rating: 4.5, reviews: 33 },
  { id: 25, name: 'Crossbody Bag', price: 79, category: 'Accessories', subCategory: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', rating: 4.4, reviews: 22 },
  { id: 26, name: 'Designer Watch', price: 199, category: 'Accessories', subCategory: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop', rating: 4.8, reviews: 45 },
  { id: 27, name: 'Sunglasses', price: 129, category: 'Accessories', subCategory: 'Eyewear', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop', rating: 4.6, reviews: 38 },
  { id: 28, name: 'Leather Wallet', price: 49, category: 'Accessories', subCategory: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop', rating: 4.7, reviews: 41 },
  { id: 29, name: 'Scarf', price: 39, category: 'Accessories', subCategory: 'Scarves', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=500&fit=crop', rating: 4.3, reviews: 27 },
  
  // ===== UNSTITCHED =====
  { id: 30, name: 'Unstitched Fabric', price: 99, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1601071651953-a2c10558bae3?w=400&h=500&fit=crop', rating: 4.5, reviews: 31 },
  { id: 31, name: 'Premium Cotton', price: 129, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.6, reviews: 27 },
  { id: 32, name: 'Silk Fabric', price: 199, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1596783074918-c84cb5fc0bc0?w=400&h=500&fit=crop', rating: 4.8, reviews: 34 },
  { id: 33, name: 'Linen Fabric', price: 89, category: 'Unstitched', subCategory: 'Fabrics', image: 'https://images.unsplash.com/photo-1601071651953-a2c10558bae3?w=400&h=500&fit=crop', rating: 4.4, reviews: 19 },
  
  // ===== EMBROIDERED =====
  { id: 34, name: 'Embroidered Kurta', price: 179, category: 'Embroidered', subCategory: 'Kurtas', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop', rating: 4.9, reviews: 44 },
  { id: 35, name: 'Embroidered Shawl', price: 89, category: 'Embroidered', subCategory: 'Shawls', image: 'https://images.unsplash.com/photo-1596783074918-c84cb5fc0bc0?w=400&h=500&fit=crop', rating: 4.7, reviews: 36 },
  { id: 36, name: 'Embroidered Dupatta', price: 69, category: 'Embroidered', subCategory: 'Dupattas', image: 'https://images.unsplash.com/photo-1601071651953-a2c10558bae3?w=400&h=500&fit=crop', rating: 4.6, reviews: 29 },
  
  // ===== NEW IN =====
  { id: 37, name: 'Summer Collection Dress', price: 199, category: 'New In', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', rating: 4.9, reviews: 26 },
  { id: 38, name: 'New Arrival Jacket', price: 279, category: 'New In', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', rating: 4.8, reviews: 19 },
  { id: 39, name: 'Trendy Sneakers', price: 169, category: 'New In', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.7, reviews: 23 },
  { id: 40, name: 'Designer Handbag', price: 249, category: 'New In', subCategory: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', rating: 4.8, reviews: 31 },
  
  // ===== SALE =====
  { id: 41, name: 'Sale Leather Jacket', price: 199, category: 'Sale', subCategory: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', rating: 4.8, reviews: 45 },
  { id: 42, name: 'Sale Aura Dress', price: 129, category: 'Sale', subCategory: 'Dresses', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop', rating: 4.9, reviews: 33 },
  { id: 43, name: 'Sale Sneakers', price: 99, category: 'Sale', subCategory: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', rating: 4.6, reviews: 28 },
  { id: 44
