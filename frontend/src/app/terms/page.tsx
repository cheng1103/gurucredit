import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, XCircle, AlertTriangle, CreditCard, RefreshCw, Scale, Mail } from 'lucide-react';
import { COMPANY, SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Legal',
      title: 'Terms of',
      titleHighlight: 'Service',
      description: 'Please read these terms carefully before using our services.',
      lastUpdated: 'Last updated: December 2024',
    },
    intro: 'Welcome to GURU Credits. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and GURU Credits.',
    sections: [
      {
        title: 'Services We Provide',
        content: [
          'Credit report analysis and interpretation (CCRIS & CTOS)',
          'Debt Service Ratio (DSR) calculation and assessment',
          'Loan eligibility evaluation and approval chances',
          'Personalized bank and lender recommendations',
          'Credit repair guidance and consultation',
          'Loan application assistance and support',
        ],
      },
      {
        title: 'Important Disclaimers',
        content: [
          'We are a consultation service and NOT a bank or licensed lender',
          'Our analysis is based on information you provide and may not reflect all factors banks consider',
          'We do not guarantee loan approval - final decisions are made by banks',
          'Past results do not guarantee future outcomes',
          'Our recommendations are advisory and should not be considered as financial advice',
          'You should consult with licensed financial advisors for complex financial decisions',
        ],
      },
      {
        title: 'Your Responsibilities',
        content: [
          'Provide accurate and truthful information for analysis',
          'Submit authentic documents (IC, pay slips, bank statements)',
          'Inform us of any changes to your financial situation',
          'Not use our services for fraudulent or illegal purposes',
          'Respect our intellectual property and not redistribute our reports',
          'Comply with all applicable Malaysian laws and regulations',
        ],
      },
      {
        title: 'Payment Terms',
        content: [
          'All prices are in Malaysian Ringgit (RM) and inclusive of any applicable taxes',
          'Payment is required before service delivery',
          'We accept online banking (FPX), credit/debit cards, and e-wallets',
          'Prices may change without prior notice; confirmed orders are honored',
          'All fees are one-time charges unless otherwise specified',
          'Promotional prices may have specific terms and conditions',
        ],
      },
      {
        title: 'Refund Policy',
        content: [
          'Full refund if we cannot complete your analysis due to technical issues on our end',
          'Full refund if service is not delivered within the promised timeframe (excluding delays caused by you)',
          'Partial refund may be considered if incomplete analysis is delivered',
          'No refund once the complete analysis report has been delivered',
          'No refund for change of mind after service delivery',
          'Refund requests must be submitted within 7 days of service delivery',
        ],
      },
      {
        title: 'Prohibited Activities',
        content: [
          'Submitting false or misleading information',
          'Using forged or altered documents',
          "Attempting to access other users' accounts or data",
          'Reverse engineering or copying our analysis methodology',
          'Reselling or redistributing our services without authorization',
          'Any activity that violates Malaysian law',
        ],
      },
    ],
    liability: {
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, GURU Credits shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities arising from your use of our services.',
        'Our total liability for any claims arising from these terms or our services shall not exceed the amount you paid for the specific service giving rise to the claim.',
        'We are not responsible for any actions taken by banks or financial institutions based on their own assessment of your application, regardless of our recommendations.',
      ],
    },
    governing: {
      title: 'Governing Law & Jurisdiction',
      content: 'These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Malaysia. We encourage resolving disputes amicably through direct communication before pursuing legal remedies.',
    },
    changes: {
      title: 'Changes to These Terms',
      content: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes indicates your acceptance of the new terms. We recommend reviewing these terms periodically for updates.',
    },
    contact: {
      title: 'Questions About These Terms?',
      description: 'If you have any questions about these Terms of Service, please contact us:',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
    },
  },
  ms: {
    header: {
      badge: 'Undang-undang',
      title: 'Syarat',
      titleHighlight: 'Perkhidmatan',
      description: 'Sila baca syarat-syarat ini dengan teliti sebelum menggunakan perkhidmatan kami.',
      lastUpdated: 'Kemas kini terakhir: Disember 2024',
    },
    intro: 'Selamat datang ke GURU Credits. Dengan mengakses atau menggunakan laman web dan perkhidmatan kami, anda bersetuju untuk terikat dengan Syarat Perkhidmatan ini. Jika anda tidak bersetuju dengan syarat-syarat ini, sila jangan gunakan perkhidmatan kami. Syarat-syarat ini merupakan perjanjian yang mengikat secara sah antara anda dan GURU Credits.',
    sections: [
      {
        title: 'Perkhidmatan Yang Kami Sediakan',
        content: [
          'Analisis dan tafsiran laporan kredit (CCRIS & CTOS)',
          'Pengiraan dan penilaian Nisbah Khidmat Hutang (DSR)',
          'Penilaian kelayakan pinjaman dan peluang kelulusan',
          'Cadangan bank dan pemberi pinjaman yang diperibadikan',
          'Panduan dan konsultasi pembaikan kredit',
          'Bantuan dan sokongan permohonan pinjaman',
        ],
      },
      {
        title: 'Penafian Penting',
        content: [
          'Kami adalah perkhidmatan konsultasi dan BUKAN bank atau pemberi pinjaman berlesen',
          'Analisis kami berdasarkan maklumat yang anda berikan dan mungkin tidak mencerminkan semua faktor yang dipertimbangkan bank',
          'Kami tidak menjamin kelulusan pinjaman - keputusan akhir dibuat oleh bank',
          'Keputusan lepas tidak menjamin hasil masa depan',
          'Cadangan kami bersifat nasihat dan tidak boleh dianggap sebagai nasihat kewangan',
          'Anda harus berunding dengan penasihat kewangan berlesen untuk keputusan kewangan yang kompleks',
        ],
      },
      {
        title: 'Tanggungjawab Anda',
        content: [
          'Memberikan maklumat yang tepat dan benar untuk analisis',
          'Mengemukakan dokumen yang asli (IC, slip gaji, penyata bank)',
          'Memaklumkan kami tentang sebarang perubahan pada situasi kewangan anda',
          'Tidak menggunakan perkhidmatan kami untuk tujuan penipuan atau haram',
          'Menghormati harta intelek kami dan tidak mengedar semula laporan kami',
          'Mematuhi semua undang-undang dan peraturan Malaysia yang berkenaan',
        ],
      },
      {
        title: 'Syarat Pembayaran',
        content: [
          'Semua harga dalam Ringgit Malaysia (RM) dan termasuk sebarang cukai yang berkenaan',
          'Pembayaran diperlukan sebelum penghantaran perkhidmatan',
          'Kami menerima perbankan dalam talian (FPX), kad kredit/debit, dan e-wallet',
          'Harga mungkin berubah tanpa notis terlebih dahulu; pesanan yang disahkan dihormati',
          'Semua yuran adalah caj sekali sahaja kecuali dinyatakan sebaliknya',
          'Harga promosi mungkin mempunyai syarat dan terma tertentu',
        ],
      },
      {
        title: 'Polisi Bayaran Balik',
        content: [
          'Bayaran balik penuh jika kami tidak dapat menyelesaikan analisis anda kerana isu teknikal di pihak kami',
          'Bayaran balik penuh jika perkhidmatan tidak dihantar dalam tempoh yang dijanjikan (tidak termasuk kelewatan yang disebabkan oleh anda)',
          'Bayaran balik separa mungkin dipertimbangkan jika analisis tidak lengkap dihantar',
          'Tiada bayaran balik setelah laporan analisis lengkap telah dihantar',
          'Tiada bayaran balik untuk perubahan fikiran selepas penghantaran perkhidmatan',
          'Permintaan bayaran balik mesti dikemukakan dalam masa 7 hari penghantaran perkhidmatan',
        ],
      },
      {
        title: 'Aktiviti Yang Dilarang',
        content: [
          'Mengemukakan maklumat palsu atau mengelirukan',
          'Menggunakan dokumen palsu atau dipinda',
          'Cuba mengakses akaun atau data pengguna lain',
          'Kejuruteraan songsang atau menyalin metodologi analisis kami',
          'Menjual semula atau mengedar semula perkhidmatan kami tanpa kebenaran',
          'Sebarang aktiviti yang melanggar undang-undang Malaysia',
        ],
      },
    ],
    liability: {
      title: 'Had Liabiliti',
      content: [
        'Setakat yang dibenarkan oleh undang-undang, GURU Credits tidak bertanggungjawab untuk sebarang kerosakan tidak langsung, sampingan, khas, akibat, atau punitif, termasuk tetapi tidak terhad kepada kehilangan keuntungan, data, atau peluang perniagaan yang timbul daripada penggunaan perkhidmatan kami.',
        'Jumlah liabiliti kami untuk sebarang tuntutan yang timbul daripada syarat-syarat ini atau perkhidmatan kami tidak akan melebihi jumlah yang anda bayar untuk perkhidmatan tertentu yang menimbulkan tuntutan.',
        'Kami tidak bertanggungjawab untuk sebarang tindakan yang diambil oleh bank atau institusi kewangan berdasarkan penilaian mereka sendiri terhadap permohonan anda, tanpa mengira cadangan kami.',
      ],
    },
    governing: {
      title: 'Undang-undang Yang Mentadbir & Bidang Kuasa',
      content: 'Syarat Perkhidmatan ini akan ditadbir dan ditafsirkan mengikut undang-undang Malaysia. Sebarang pertikaian yang timbul daripada syarat-syarat ini atau penggunaan perkhidmatan kami akan tertakluk kepada bidang kuasa eksklusif mahkamah Malaysia. Kami menggalakkan penyelesaian pertikaian secara baik melalui komunikasi langsung sebelum menggunakan remedi undang-undang.',
    },
    changes: {
      title: 'Perubahan kepada Syarat-syarat Ini',
      content: 'Kami berhak untuk mengubah suai Syarat Perkhidmatan ini pada bila-bila masa. Perubahan akan berkuat kuasa serta-merta selepas disiarkan di laman web kami. Penggunaan berterusan anda terhadap perkhidmatan kami selepas sebarang perubahan menunjukkan penerimaan anda terhadap syarat-syarat baharu. Kami mengesyorkan menyemak syarat-syarat ini secara berkala untuk kemas kini.',
    },
    contact: {
      title: 'Soalan Tentang Syarat-syarat Ini?',
      description: 'Jika anda mempunyai sebarang soalan tentang Syarat Perkhidmatan ini, sila hubungi kami:',
      email: 'E-mel',
      phone: 'Telefon',
      whatsapp: 'WhatsApp',
    },
  },
};

const sectionIcons = [CheckCircle, AlertTriangle, FileText, CreditCard, RefreshCw, XCircle];

export default async function TermsPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebPageJsonLd
        url={`${SEO.url}/terms`}
        title="Terms of Service"
        description={t.header.description}
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Terms of Service', url: `${SEO.url}/terms` },
        ]}
      />
      <div className="container max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
            <FileText className="h-3 w-3 mr-1" />
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

        {/* Limitation of Liability */}
        <Card className="mt-6 surface-card border-primary/10">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{t.liability.title}</h2>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed ml-14 space-y-3">
              {t.liability.content.map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mt-6 surface-card border-primary/10">
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-4">{t.governing.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.governing.content}
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mt-6 surface-card border-primary/10">
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-4">{t.changes.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.changes.content}
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
