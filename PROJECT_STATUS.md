# BolKe Project Status & Documentation

## 🚀 Overview
BolKe is a voice-first website builder designed for Indian small business owners ("Vyaaparis"). It allows users to create a professional online presence simply by speaking or filling out a simple form in their native language.

---

## 🏗️ Backend Status
| Feature | Status | Description |
| :--- | :---: | :--- |
| SQLite Database Setup | [x] | Tables for Users, Shops, and Subscriptions. |
| JWT Authentication | [x] | Secure login/signup with token-based sessions. |
| Password Hashing | [x] | Using bcryptjs for security. |
| Multi-tenant Shop Routing | [x] | Logic to handle different shop slugs. |
| Voice Processing (Mock) | [x] | Endpoint ready for Whisper/Llama integration. |
| Voice Processing (Real) | [ ] | Full integration with Groq/Whisper APIs. |
| Stripe Payment Gateway | [x] | Checkout session creation. |
| Plan-based Restrictions | [/] | Basic logic implemented, needs refinement for new plans. |
| User Admin API (CMS) | [ ] | Routes to add products, edit images, and site content. |
| WhatsApp Bot Integration | [ ] | Backend logic for business WhatsApp automation. |
| Form-based Generation API| [ ] | Endpoint to generate site from structured form data. |

---

## 🎨 Frontend Status
| Feature | Status | Description |
| :--- | :---: | :--- |
| Landing Page | [x] | High-conversion design with all sections. |
| Auth Page (Sliding) | [x] | Smooth transition between Login and Signup. |
| Voice Recorder UI | [x] | Interactive recording and processing feedback. |
| User Dashboard | [x] | Overview of websites and plan status. |
| User Admin Panel (CMS) | [ ] | Interface for owners to manage products and content. |
| Form-based Builder UI | [ ] | Multi-language form for manual site creation. |
| Public Shop Templates | [ ] | The actual rendered websites for customers. |
| Pricing Plan Update | [ ] | Updating to new 199/699 price points. |
| Legal Pages | [x] | Privacy, Terms, and Security pages. |

---

## 🛠️ Open-Source Tools Integration
We are committed to using open-source models to keep costs low and performance high:
- **Whisper-v3 (via Groq):** For high-speed Indian language transcription.
- **Llama-3-70B (via Groq):** For intelligent data extraction and site structure.
- **NLLB-200:** For high-quality translation across 22+ Indian languages.
- **SQLite:** For lightweight, portable, and fast data storage.

---

## 📋 Next Version Goals
1. **Implement User CMS:** Allow shop owners to upload product photos and change prices.
2. **Form Builder:** Add a "Manual Entry" option for those who prefer typing over speaking.
3. **Plan Refactoring:** Adjust restrictions to match the new ₹199 and ₹699 tiers.
4. **WhatsApp Bot:** Prototype the auto-reply system for "Dukan" plan users.
