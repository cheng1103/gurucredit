'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const testimonials = [
  {
    name: 'Ahmad Razak',
    location: 'Kuala Lumpur',
    locationMs: 'Kuala Lumpur',
    role: 'Business Owner',
    roleMs: 'Pemilik Perniagaan',
    image: '/images/testimonials/ahmad.svg',
    rating: 5,
    loanType: 'Business Loan',
    loanTypeMs: 'Pinjaman Perniagaan',
    amount: 'RM150,000',
    text: 'After 3 bank rejections, I thought it was impossible to get a business loan. GURU Credits identified that my documentation was the issue, not my creditworthiness. They helped restructure my application and I received bank approval within 2 weeks.',
    textMs: 'Selepas 3 penolakan bank, saya ingat mustahil untuk mendapatkan pinjaman perniagaan. GURU Credits mengenal pasti dokumentasi saya yang bermasalah, bukan kelayakan kredit. Mereka bantu susun semula permohonan saya dan saya menerima kelulusan bank dalam 2 minggu.',
  },
  {
    name: 'Sarah Lim',
    location: 'Penang',
    locationMs: 'Pulau Pinang',
    role: 'HR Manager',
    roleMs: 'Pengurus HR',
    image: '/images/testimonials/sarah.svg',
    rating: 5,
    loanType: 'Home Loan',
    loanTypeMs: 'Pinjaman Rumah',
    amount: 'RM380,000',
    text: 'The RM30 credit analysis was the best investment I made. They found a bank offering 100% financing for first-time buyers. I moved into my new apartment 3 months later!',
    textMs: 'Analisis kredit RM30 adalah pelaburan terbaik yang saya buat. Mereka jumpa bank yang tawarkan 100% pembiayaan untuk pembeli pertama. Saya pindah ke apartment baru 3 bulan kemudian!',
  },
  {
    name: 'Raj Kumar',
    location: 'Johor Bahru',
    locationMs: 'Johor Bahru',
    role: 'Software Engineer',
    roleMs: 'Jurutera Perisian',
    image: '/images/testimonials/raj.svg',
    rating: 5,
    loanType: 'Car Loan',
    loanTypeMs: 'Pinjaman Kereta',
    amount: 'RM85,000',
    text: 'GURU Credits got me a 2.88% interest rate - lower than what the dealer offered. Saved me RM3,200 over the loan period. Professional service with fast turnaround!',
    textMs: 'GURU Credits dapat untuk saya kadar faedah 2.88% - lebih rendah dari tawaran dealer. Jimat RM3,200 sepanjang tempoh pinjaman. Perkhidmatan profesional dengan tindak balas cepat!',
  },
  {
    name: 'Mei Ling Tan',
    location: 'Selangor',
    locationMs: 'Selangor',
    role: 'Teacher',
    roleMs: 'Guru',
    image: '/images/testimonials/meiling.svg',
    rating: 5,
    loanType: 'Personal Loan',
    loanTypeMs: 'Pinjaman Peribadi',
    amount: 'RM50,000',
    text: 'I was nervous about applying for a loan after being rejected once. GURU Credits showed me exactly what to fix. The DSR calculation and bank recommendations were spot on. Highly recommend!',
    textMs: 'Saya risau untuk memohon pinjaman selepas ditolak sekali. GURU Credits tunjukkan apa yang perlu diperbaiki. Pengiraan DSR dan cadangan bank sangat tepat. Sangat disyorkan!',
  },
  {
    name: 'Hafiz Abdullah',
    location: 'Shah Alam',
    locationMs: 'Shah Alam',
    role: 'Sales Executive',
    roleMs: 'Eksekutif Jualan',
    image: '/images/testimonials/hafiz.svg',
    rating: 5,
    loanType: 'Debt Consolidation',
    loanTypeMs: 'Penyatuan Hutang',
    amount: 'RM45,000',
    text: 'I had 3 credit cards and was paying RM2,100/month. GURU Credits helped me consolidate to one loan at 7.5%. Now I pay only RM890/month. Life-changing!',
    textMs: 'Saya ada 3 kad kredit dan bayar RM2,100/bulan. GURU Credits bantu saya satukan kepada satu pinjaman pada 7.5%. Sekarang saya bayar hanya RM890/bulan. Mengubah hidup!',
  },
];

const content = {
  en: {
    badge: 'Success Stories',
    title: 'What Our Clients Say',
    subtitle: 'Join over 1,000+ satisfied Malaysians who have successfully navigated their loan applications with our help.',
    approved: 'Result',
  },
  ms: {
    badge: 'Kisah Kejayaan',
    title: 'Apa Kata Pelanggan Kami',
    subtitle: 'Sertai lebih 1,000+ rakyat Malaysia yang berjaya menavigasi permohonan pinjaman dengan bantuan kami.',
    approved: 'Hasil',
  },
};

export function TestimonialCarousel() {
  const { language } = useLanguage();
  const t = content[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {t.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5">
                {/* Left side - Info */}
                <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary/90 text-white p-8 flex flex-col justify-center">
                  <div className="mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20 mb-4">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                    <h3 className="text-xl font-bold">{currentTestimonial.name}</h3>
                    <p className="text-white/80">
                      {language === 'en' ? currentTestimonial.role : currentTestimonial.roleMs}
                    </p>
                    <p className="text-white/60 text-sm">
                      {language === 'en' ? currentTestimonial.location : currentTestimonial.locationMs}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < currentTestimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
                        />
                      ))}
                    </div>
                    <Badge className="bg-white/20 text-white border-0">
                      {language === 'en' ? currentTestimonial.loanType : currentTestimonial.loanTypeMs}
                    </Badge>
                    <div className="text-2xl font-bold">
                      {currentTestimonial.amount}
                      <span className="text-sm font-normal text-white/70 ml-2">{t.approved}</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Quote */}
                <div className="md:col-span-3 p-8 flex flex-col justify-center">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-lg leading-relaxed text-foreground mb-6">
                    {language === 'en' ? currentTestimonial.text : currentTestimonial.textMs}
                  </p>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrentIndex(index);
                          }}
                          aria-label={`Go to testimonial ${index + 1}`}
                          title={`Go to testimonial ${index + 1}`}
                          className={`h-6 w-6 rounded-full transition-all ${
                            index === currentIndex ? 'w-8 bg-primary' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevious}
                        className="h-10 w-10 rounded-full"
                        aria-label="Previous testimonial"
                        title="Previous testimonial"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        className="h-10 w-10 rounded-full"
                        aria-label="Next testimonial"
                        title="Next testimonial"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
