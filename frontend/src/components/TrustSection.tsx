'use client';

import { Shield, Clock, Star, Users, CheckCircle2, BadgeCheck, Building2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

const content = {
  en: {
    title: 'Why Malaysians Trust Us',
    subtitle: 'Licensed, secure, and trusted by thousands',
    badges: [
      {
        title: 'Licensed & Regulated',
        description: 'Registered with SSM and compliant with all Malaysian lending regulations',
      },
      {
        title: 'PDPA Compliant',
        description: 'Your personal data is protected under Malaysian privacy laws',
      },
      {
        title: '24-Hour Approval',
        description: 'Fast processing with most applications approved within 24 hours',
      },
      {
        title: '15+ Bank Partners',
        description: 'Connected with major Malaysian banks for the best rates',
      },
    ],
    stats: [
      { value: '1,000+', label: 'Happy Customers' },
      { value: '4.9/5', label: 'Customer Rating' },
      { value: 'RM2B+', label: 'Loans Processed' },
      { value: '98%', label: 'Approval Rate' },
    ],
    reviews: {
      title: 'What Our Customers Say',
      items: [
        {
          name: 'Ahmad Rizal',
          location: 'Kuala Lumpur',
          rating: 5,
          text: 'Very fast approval! I got my personal loan within 24 hours. The team was very helpful.',
        },
        {
          name: 'Siti Nurhaliza',
          location: 'Penang',
          rating: 5,
          text: 'Great service and competitive rates. They helped me consolidate my debt and save money.',
        },
        {
          name: 'David Tan',
          location: 'Johor Bahru',
          rating: 5,
          text: 'Professional team with excellent customer service. Highly recommended!',
        },
      ],
    },
  },
  ms: {
    title: 'Mengapa Rakyat Malaysia Percaya Kami',
    subtitle: 'Berlesen, selamat, dan dipercayai ribuan orang',
    badges: [
      {
        title: 'Berlesen & Dikawal Selia',
        description: 'Berdaftar dengan SSM dan mematuhi semua peraturan pinjaman Malaysia',
      },
      {
        title: 'Patuh PDPA',
        description: 'Data peribadi anda dilindungi di bawah undang-undang privasi Malaysia',
      },
      {
        title: 'Kelulusan 24 Jam',
        description: 'Pemprosesan pantas dengan kebanyakan permohonan diluluskan dalam 24 jam',
      },
      {
        title: '15+ Rakan Bank',
        description: 'Berhubung dengan bank utama Malaysia untuk kadar terbaik',
      },
    ],
    stats: [
      { value: '1,000+', label: 'Pelanggan Gembira' },
      { value: '4.9/5', label: 'Penilaian Pelanggan' },
      { value: 'RM2B+', label: 'Pinjaman Diproses' },
      { value: '98%', label: 'Kadar Kelulusan' },
    ],
    reviews: {
      title: 'Apa Kata Pelanggan Kami',
      items: [
        {
          name: 'Ahmad Rizal',
          location: 'Kuala Lumpur',
          rating: 5,
          text: 'Kelulusan sangat pantas! Saya dapat pinjaman peribadi dalam masa 24 jam. Pasukan sangat membantu.',
        },
        {
          name: 'Siti Nurhaliza',
          location: 'Penang',
          rating: 5,
          text: 'Perkhidmatan hebat dan kadar kompetitif. Mereka membantu saya menyatukan hutang dan menjimatkan wang.',
        },
        {
          name: 'David Tan',
          location: 'Johor Bahru',
          rating: 5,
          text: 'Pasukan profesional dengan perkhidmatan pelanggan yang cemerlang. Sangat disyorkan!',
        },
      ],
    },
  },
};

const badgeIcons = [Shield, BadgeCheck, Clock, Building2];

export function TrustSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.badges.map((badge, index) => {
            const Icon = badgeIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-primary-foreground"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">{t.reviews.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.reviews.items.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {/* Review text */}
                <p className="text-muted-foreground mb-4">&ldquo;{review.text}&rdquo;</p>
                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.location}</div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
