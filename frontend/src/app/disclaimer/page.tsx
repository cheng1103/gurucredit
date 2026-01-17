import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, Building2, TrendingUp, Shield, Mail } from 'lucide-react';
import { COMPANY, SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Legal',
      titleHighlight: 'Disclaimer',
      description: 'Please read this disclaimer carefully before using our services.',
      lastUpdated: 'Last updated: December 2024',
    },
    notice: {
      title: 'Important Notice',
      content: 'GURU Credits is a loan consultation and credit analysis service. We are NOT a bank, licensed money lender, or financial institution. We do not provide loans, approve loan applications, or make lending decisions. Our role is limited to analysis, consultation, and recommendations.',
    },
    notFinancial: {
      title: 'Not Financial Advice',
      content: [
        'The information and analysis provided by GURU Credits are for informational purposes only and should not be construed as professional financial, legal, or tax advice.',
        'Our recommendations are based on general criteria used by banks and may not account for all factors relevant to your specific situation. We strongly recommend consulting with licensed financial advisors, accountants, or legal professionals before making significant financial decisions.',
        'Any actions you take based on our analysis are at your own risk and discretion.',
      ],
    },
    noGuarantee: {
      title: 'No Guarantee of Loan Approval',
      intro: 'We do not and cannot guarantee loan approval. The final decision on any loan application rests solely with the bank or financial institution you apply to.',
      factors: 'Banks consider many factors beyond what we analyze, including but not limited to:',
      factorsList: [
        'Internal credit scoring models',
        'Current lending policies and appetite',
        'Economic conditions and market factors',
        'Property or asset valuation (for secured loans)',
        'Additional documentation requirements',
        'Relationship history with the bank',
      ],
      note: 'Our "success rate" statistics refer to clients who followed our recommendations and subsequently received loan approval. This does not guarantee similar results for all clients.',
    },
    accuracy: {
      title: 'Accuracy of Information',
      intro: 'Our analysis is only as accurate as the information you provide. We rely on:',
      list: [
        'Information you submit through our forms',
        'Documents you provide (pay slips, bank statements, etc.)',
        'Credit reports obtained with your authorization',
      ],
      note1: 'We are not responsible for errors or omissions in your submitted information. Providing false or misleading information may result in inaccurate analysis and is a violation of our Terms of Service.',
      note2: 'Bank policies, interest rates, and lending criteria change frequently. Our recommendations are based on information available at the time of analysis and may not reflect the most current bank policies.',
    },
    thirdParty: {
      title: 'Third-Party Links & Services',
      content: [
        'Our website may contain links to third-party websites, including bank websites and financial calculators. We are not responsible for the content, accuracy, or privacy practices of these external sites.',
        'We may recommend specific banks or financial products based on our analysis. These recommendations are based on general suitability and do not constitute endorsements. We do not receive commissions from banks for referrals unless explicitly disclosed.',
      ],
    },
    liability: {
      title: 'Limitation of Liability',
      intro: 'To the fullest extent permitted by law, GURU Credits, its directors, employees, and affiliates shall not be liable for:',
      list: [
        'Any loan rejection or unfavorable terms from banks',
        'Financial losses resulting from following or not following our recommendations',
        'Delays in service delivery due to circumstances beyond our control',
        'Errors in analysis due to inaccurate information provided by you',
        'Actions taken by banks or third parties',
        'Any indirect, incidental, or consequential damages',
      ],
      note: 'Our maximum liability is limited to the amount you paid for the specific service in question.',
    },
    acknowledgment: {
      title: 'Your Acknowledgment',
      intro: 'By using GURU Credits services, you acknowledge that you have read, understood, and agree to this disclaimer. You understand that:',
      list: [
        'We provide consultation services, not loans or financial products',
        'Our analysis is advisory and not a guarantee of any outcome',
        'Final loan decisions are made by banks, not by us',
        'You are responsible for verifying information and making your own decisions',
      ],
    },
    contact: {
      title: 'Questions?',
      description: 'If you have any questions about this disclaimer, please contact us:',
      email: 'Email',
      phone: 'Phone',
    },
  },
  ms: {
    header: {
      badge: 'Undang-undang',
      titleHighlight: 'Penafian',
      description: 'Sila baca penafian ini dengan teliti sebelum menggunakan perkhidmatan kami.',
      lastUpdated: 'Kemas kini terakhir: Disember 2024',
    },
    notice: {
      title: 'Notis Penting',
      content: 'GURU Credits adalah perkhidmatan konsultasi pinjaman dan analisis kredit. Kami BUKAN bank, pemberi pinjaman wang berlesen, atau institusi kewangan. Kami tidak menyediakan pinjaman, meluluskan permohonan pinjaman, atau membuat keputusan pemberian pinjaman. Peranan kami terhad kepada analisis, konsultasi, dan cadangan.',
    },
    notFinancial: {
      title: 'Bukan Nasihat Kewangan',
      content: [
        'Maklumat dan analisis yang disediakan oleh GURU Credits adalah untuk tujuan maklumat sahaja dan tidak boleh ditafsirkan sebagai nasihat kewangan, undang-undang, atau cukai profesional.',
        'Cadangan kami berdasarkan kriteria umum yang digunakan oleh bank dan mungkin tidak mengambil kira semua faktor yang berkaitan dengan situasi khusus anda. Kami sangat mengesyorkan berunding dengan penasihat kewangan berlesen, akauntan, atau profesional undang-undang sebelum membuat keputusan kewangan yang penting.',
        'Sebarang tindakan yang anda ambil berdasarkan analisis kami adalah atas risiko dan budi bicara anda sendiri.',
      ],
    },
    noGuarantee: {
      title: 'Tiada Jaminan Kelulusan Pinjaman',
      intro: 'Kami tidak dan tidak boleh menjamin kelulusan pinjaman. Keputusan akhir mengenai sebarang permohonan pinjaman terletak sepenuhnya dengan bank atau institusi kewangan yang anda mohon.',
      factors: 'Bank mempertimbangkan banyak faktor di luar apa yang kami analisis, termasuk tetapi tidak terhad kepada:',
      factorsList: [
        'Model pemarkahan kredit dalaman',
        'Polisi pemberian pinjaman semasa dan selera',
        'Keadaan ekonomi dan faktor pasaran',
        'Penilaian hartanah atau aset (untuk pinjaman bercagar)',
        'Keperluan dokumentasi tambahan',
        'Sejarah hubungan dengan bank',
      ],
      note: 'Statistik "kadar kejayaan" kami merujuk kepada pelanggan yang mengikut cadangan kami dan kemudiannya mendapat kelulusan pinjaman. Ini tidak menjamin hasil yang serupa untuk semua pelanggan.',
    },
    accuracy: {
      title: 'Ketepatan Maklumat',
      intro: 'Analisis kami hanya setepat maklumat yang anda berikan. Kami bergantung kepada:',
      list: [
        'Maklumat yang anda kemukakan melalui borang kami',
        'Dokumen yang anda berikan (slip gaji, penyata bank, dll.)',
        'Laporan kredit yang diperoleh dengan kebenaran anda',
      ],
      note1: 'Kami tidak bertanggungjawab untuk kesilapan atau kecuaian dalam maklumat yang anda kemukakan. Memberikan maklumat palsu atau mengelirukan mungkin mengakibatkan analisis yang tidak tepat dan merupakan pelanggaran Syarat Perkhidmatan kami.',
      note2: 'Polisi bank, kadar faedah, dan kriteria pemberian pinjaman berubah dengan kerap. Cadangan kami berdasarkan maklumat yang tersedia pada masa analisis dan mungkin tidak mencerminkan polisi bank yang paling terkini.',
    },
    thirdParty: {
      title: 'Pautan & Perkhidmatan Pihak Ketiga',
      content: [
        'Laman web kami mungkin mengandungi pautan ke laman web pihak ketiga, termasuk laman web bank dan kalkulator kewangan. Kami tidak bertanggungjawab untuk kandungan, ketepatan, atau amalan privasi laman luaran ini.',
        'Kami mungkin mengesyorkan bank atau produk kewangan tertentu berdasarkan analisis kami. Cadangan ini berdasarkan kesesuaian umum dan tidak merupakan pengesahan. Kami tidak menerima komisen daripada bank untuk rujukan kecuali didedahkan secara jelas.',
      ],
    },
    liability: {
      title: 'Had Liabiliti',
      intro: 'Setakat yang dibenarkan sepenuhnya oleh undang-undang, GURU Credits, pengarah, pekerja, dan sekutunya tidak bertanggungjawab untuk:',
      list: [
        'Sebarang penolakan pinjaman atau syarat yang tidak menguntungkan daripada bank',
        'Kerugian kewangan yang terhasil daripada mengikut atau tidak mengikut cadangan kami',
        'Kelewatan dalam penghantaran perkhidmatan kerana keadaan di luar kawalan kami',
        'Kesilapan dalam analisis kerana maklumat tidak tepat yang diberikan oleh anda',
        'Tindakan yang diambil oleh bank atau pihak ketiga',
        'Sebarang kerosakan tidak langsung, sampingan, atau akibat',
      ],
      note: 'Liabiliti maksimum kami terhad kepada jumlah yang anda bayar untuk perkhidmatan tertentu yang berkenaan.',
    },
    acknowledgment: {
      title: 'Pengakuan Anda',
      intro: 'Dengan menggunakan perkhidmatan GURU Credits, anda mengakui bahawa anda telah membaca, memahami, dan bersetuju dengan penafian ini. Anda memahami bahawa:',
      list: [
        'Kami menyediakan perkhidmatan konsultasi, bukan pinjaman atau produk kewangan',
        'Analisis kami bersifat nasihat dan bukan jaminan sebarang hasil',
        'Keputusan pinjaman akhir dibuat oleh bank, bukan oleh kami',
        'Anda bertanggungjawab untuk mengesahkan maklumat dan membuat keputusan anda sendiri',
      ],
    },
    contact: {
      title: 'Soalan?',
      description: 'Jika anda mempunyai sebarang soalan tentang penafian ini, sila hubungi kami:',
      email: 'E-mel',
      phone: 'Telefon',
    },
  },
};

export default async function DisclaimerPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebPageJsonLd
        url={`${SEO.url}/disclaimer`}
        title="Disclaimer"
        description={t.header.description}
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Disclaimer', url: `${SEO.url}/disclaimer` },
        ]}
      />
      <div className="container max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {t.header.lastUpdated}
          </p>
        </div>

        {/* Main Disclaimer */}
        <Card className="mb-8 border-amber-200/70 bg-amber-50/60 surface-card">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{t.notice.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.notice.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {/* Not Financial Advice */}
          <Card className="surface-card border-primary/10">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{t.notFinancial.title}</h2>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed ml-14 space-y-3">
                {t.notFinancial.content.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* No Guarantee of Approval */}
          <Card className="surface-card border-primary/10">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{t.noGuarantee.title}</h2>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed ml-14 space-y-3">
                <p><strong>{t.noGuarantee.intro}</strong></p>
                <p>{t.noGuarantee.factors}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {t.noGuarantee.factorsList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p>{t.noGuarantee.note}</p>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy of Information */}
          <Card className="surface-card border-primary/10">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{t.accuracy.title}</h2>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed ml-14 space-y-3">
                <p>{t.accuracy.intro}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {t.accuracy.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p>{t.accuracy.note1}</p>
                <p>{t.accuracy.note2}</p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Links */}
          <Card className="surface-card border-primary/10">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{t.thirdParty.title}</h2>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed ml-14 space-y-3">
                {t.thirdParty.content.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="surface-card border-red-200/70">
            <CardContent className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-4">{t.liability.title}</h2>
              <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                <p>{t.liability.intro}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {t.liability.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="font-medium">{t.liability.note}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acknowledgment */}
        <Card className="mt-8 surface-card border-primary/15">
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-4">{t.acknowledgment.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {t.acknowledgment.intro}
            </p>
            <ul className="text-muted-foreground text-sm space-y-2 mb-6">
              {t.acknowledgment.list.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mt-6 surface-card border-primary/10">
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
