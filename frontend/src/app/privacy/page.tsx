import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Database, UserCheck, Mail, Clock, AlertCircle } from 'lucide-react';
import { COMPANY, SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Legal',
      title: 'Privacy',
      titleHighlight: 'Policy',
      description: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
      lastUpdated: 'Last updated: December 2024',
    },
    intro: 'GURU Credits ("we", "our", or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our loan consultation services. We comply with the Personal Data Protection Act 2010 (PDPA) of Malaysia.',
    sections: [
      {
        title: 'Information We Collect',
        content: [
          'Personal identification information (Name, IC number, email address, phone number)',
          'Financial information (Income details, existing debts, loan commitments)',
          'Employment information (Employer name, job title, employment duration)',
          'Credit-related documents (CCRIS report, CTOS report, bank statements)',
          'Device and usage data (IP address, browser type, pages visited)',
        ],
      },
      {
        title: 'How We Use Your Information',
        content: [
          'To perform credit analysis and loan eligibility assessments',
          'To provide personalized bank and lender recommendations',
          'To communicate with you about your applications and services',
          'To improve our services and user experience',
          'To comply with legal and regulatory requirements',
          'To send important updates about our services (with your consent)',
        ],
      },
      {
        title: 'Data Security',
        content: [
          'All data is encrypted using industry-standard SSL/TLS encryption',
          'Access to personal data is restricted to authorized personnel only',
          'Regular security audits and vulnerability assessments are conducted',
          'Secure data storage with backup and disaster recovery measures',
          'Two-factor authentication for administrative access',
        ],
      },
      {
        title: 'Your Rights Under PDPA',
        content: [
          'Right to access your personal data held by us',
          'Right to correct any inaccurate personal data',
          'Right to withdraw consent for data processing',
          'Right to request deletion of your personal data',
          'Right to be informed about how your data is used',
          'Right to data portability where applicable',
        ],
      },
      {
        title: 'Data Sharing & Third Parties',
        content: [
          'We do not sell your personal information to third parties',
          'Data is only shared with banks/lenders with your explicit consent',
          'Service providers (payment processors, cloud hosting) are bound by confidentiality agreements',
          'We may disclose information when required by law or court order',
          'Anonymous, aggregated data may be used for statistical analysis',
        ],
      },
      {
        title: 'Data Retention',
        content: [
          'Personal data is retained for up to 12 months after your last transaction',
          'Financial documents are securely deleted within 30 days of analysis completion',
          'Account information is retained while your account is active',
          'You may request immediate deletion of your data at any time',
          'Some data may be retained longer if required by law',
        ],
      },
    ],
    cookies: {
      title: 'Cookies & Tracking',
      content: 'We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us understand how you use our services, remember your preferences, and improve our offerings. You can control cookie settings through your browser preferences. Essential cookies are required for the website to function properly and cannot be disabled.',
    },
    contact: {
      title: 'Contact Us About Privacy',
      description: 'If you have any questions about this Privacy Policy, your personal data, or wish to exercise your rights under PDPA, please contact us:',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
    },
  },
  ms: {
    header: {
      badge: 'Undang-undang',
      title: 'Dasar',
      titleHighlight: 'Privasi',
      description: 'Privasi anda penting bagi kami. Dasar ini menerangkan cara kami mengumpul, menggunakan, dan melindungi maklumat peribadi anda.',
      lastUpdated: 'Kemas kini terakhir: Disember 2024',
    },
    intro: 'GURU Credits ("kami") komited untuk melindungi privasi anda dan memastikan keselamatan maklumat peribadi anda. Dasar Privasi ini menerangkan cara kami mengumpul, menggunakan, mendedahkan, dan melindungi maklumat anda apabila anda menggunakan perkhidmatan konsultasi pinjaman kami. Kami mematuhi Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia.',
    sections: [
      {
        title: 'Maklumat Yang Kami Kumpul',
        content: [
          'Maklumat pengenalan peribadi (Nama, nombor IC, alamat e-mel, nombor telefon)',
          'Maklumat kewangan (Butiran pendapatan, hutang sedia ada, komitmen pinjaman)',
          'Maklumat pekerjaan (Nama majikan, jawatan, tempoh pekerjaan)',
          'Dokumen berkaitan kredit (Laporan CCRIS, laporan CTOS, penyata bank)',
          'Data peranti dan penggunaan (Alamat IP, jenis pelayar, halaman dilawati)',
        ],
      },
      {
        title: 'Cara Kami Menggunakan Maklumat Anda',
        content: [
          'Untuk melaksanakan analisis kredit dan penilaian kelayakan pinjaman',
          'Untuk menyediakan cadangan bank dan pemberi pinjaman yang diperibadikan',
          'Untuk berkomunikasi dengan anda tentang permohonan dan perkhidmatan anda',
          'Untuk menambah baik perkhidmatan dan pengalaman pengguna kami',
          'Untuk mematuhi keperluan undang-undang dan peraturan',
          'Untuk menghantar kemas kini penting tentang perkhidmatan kami (dengan persetujuan anda)',
        ],
      },
      {
        title: 'Keselamatan Data',
        content: [
          'Semua data disulitkan menggunakan penyulitan SSL/TLS standard industri',
          'Akses kepada data peribadi terhad kepada kakitangan yang diberi kuasa sahaja',
          'Audit keselamatan dan penilaian kelemahan berkala dijalankan',
          'Penyimpanan data selamat dengan langkah sandaran dan pemulihan bencana',
          'Pengesahan dua faktor untuk akses pentadbiran',
        ],
      },
      {
        title: 'Hak Anda Di Bawah PDPA',
        content: [
          'Hak untuk mengakses data peribadi anda yang dipegang oleh kami',
          'Hak untuk membetulkan sebarang data peribadi yang tidak tepat',
          'Hak untuk menarik balik persetujuan untuk pemprosesan data',
          'Hak untuk meminta pemadaman data peribadi anda',
          'Hak untuk dimaklumkan tentang cara data anda digunakan',
          'Hak untuk mudah alih data di mana berkenaan',
        ],
      },
      {
        title: 'Perkongsian Data & Pihak Ketiga',
        content: [
          'Kami tidak menjual maklumat peribadi anda kepada pihak ketiga',
          'Data hanya dikongsi dengan bank/pemberi pinjaman dengan persetujuan jelas anda',
          'Penyedia perkhidmatan (pemproses pembayaran, pengehosan awan) terikat dengan perjanjian kerahsiaan',
          'Kami mungkin mendedahkan maklumat apabila dikehendaki oleh undang-undang atau perintah mahkamah',
          'Data tanpa nama dan agregat mungkin digunakan untuk analisis statistik',
        ],
      },
      {
        title: 'Pengekalan Data',
        content: [
          'Data peribadi disimpan sehingga 12 bulan selepas transaksi terakhir anda',
          'Dokumen kewangan dipadam dengan selamat dalam masa 30 hari selepas analisis selesai',
          'Maklumat akaun disimpan selagi akaun anda aktif',
          'Anda boleh meminta pemadaman segera data anda pada bila-bila masa',
          'Sesetengah data mungkin disimpan lebih lama jika dikehendaki oleh undang-undang',
        ],
      },
    ],
    cookies: {
      title: 'Kuki & Penjejakan',
      content: 'Kami menggunakan kuki dan teknologi penjejakan yang serupa untuk meningkatkan pengalaman anda di laman web kami. Kuki membantu kami memahami cara anda menggunakan perkhidmatan kami, mengingati keutamaan anda, dan menambah baik tawaran kami. Anda boleh mengawal tetapan kuki melalui keutamaan pelayar anda. Kuki penting diperlukan untuk laman web berfungsi dengan betul dan tidak boleh dilumpuhkan.',
    },
    contact: {
      title: 'Hubungi Kami Tentang Privasi',
      description: 'Jika anda mempunyai sebarang soalan tentang Dasar Privasi ini, data peribadi anda, atau ingin melaksanakan hak anda di bawah PDPA, sila hubungi kami:',
      email: 'E-mel',
      phone: 'Telefon',
      whatsapp: 'WhatsApp',
    },
  },
};

const sectionIcons = [Database, Eye, Lock, UserCheck, Shield, Clock];

export default async function PrivacyPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebPageJsonLd
        url={`${SEO.url}/privacy`}
        title="Privacy Policy"
        description={t.header.description}
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Privacy Policy', url: `${SEO.url}/privacy` },
        ]}
      />
      <div className="container max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
            <Shield className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {t.header.lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 surface-card border-primary/10">
          <CardContent className="p-6 lg:p-8">
            <p className="text-muted-foreground leading-relaxed">
              {t.intro}
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {t.sections.map((section, index) => {
            const Icon = sectionIcons[index];
            return (
              <Card key={index} className="surface-card border-primary/10">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  <ul className="space-y-3 ml-14">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cookies */}
        <Card className="mt-6 surface-card border-primary/10">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{t.cookies.title}</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed ml-14">
              {t.cookies.content}
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mt-8 surface-card border-primary/15">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{t.contact.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t.contact.description}
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>{t.contact.email}:</strong> <a href={COMPANY.emailLink} className="text-primary hover:underline">{COMPANY.email}</a></p>
                  <p><strong>{t.contact.phone}:</strong> <a href={COMPANY.phoneLink} className="text-primary hover:underline">{COMPANY.phone}</a></p>
                  <p><strong>{t.contact.whatsapp}:</strong> <a href={COMPANY.whatsappLink} className="text-primary hover:underline">{COMPANY.whatsapp}</a></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
