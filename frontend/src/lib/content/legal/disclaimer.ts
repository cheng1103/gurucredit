import { PATHS } from '@/lib/i18n/routes';
import type { LegalDoc } from './types';

// Normalised from the legacy keyed sections (notice, notFinancial, noGuarantee,
// accuracy, thirdParty, liability, acknowledgment), preserved in that order.
// Each section's trailing "note"/"note1"/"note2" caveat is appended as the
// final entry of its clause's list so it still reads after the bullet points.
export const disclaimerDoc: LegalDoc = {
  path: PATHS.disclaimer,
  content: {
    en: {
      title: 'Disclaimer',
      lede: 'Please read this disclaimer carefully before using our services.',
      lastUpdated: 'December 2024',
      clauses: [
        {
          id: 'important-notice',
          title: 'Important Notice',
          paragraphs: [
            'GURU Credits operates under a Moneylenders Act 1951 license issued by KPKT. We provide credit analysis, loan matching, and lending services in compliance with the statutory interest-rate caps and borrower-protection rules set by the Moneylenders (Control and Licensing) Regulations. We are not a bank, and where a bank product is better suited to your profile we will refer you rather than extend credit ourselves.',
          ],
        },
        {
          id: 'not-financial-advice',
          title: 'Not Financial Advice',
          paragraphs: [
            'The information and analysis provided by GURU Credits are for informational purposes only and should not be construed as professional financial, legal, or tax advice.',
            'Our recommendations are based on general criteria used by banks and may not account for all factors relevant to your specific situation. We strongly recommend consulting with licensed financial advisors, accountants, or legal professionals before making significant financial decisions.',
            'Any actions you take based on our analysis are at your own risk and discretion.',
          ],
        },
        {
          id: 'no-guarantee-of-loan-approval',
          title: 'No Guarantee of Loan Approval',
          paragraphs: [
            'We do not and cannot guarantee loan approval. The final decision on any loan application rests solely with the bank or financial institution you apply to.',
            'Banks consider many factors beyond what we analyze, including but not limited to:',
          ],
          list: [
            'Internal credit scoring models',
            'Current lending policies and appetite',
            'Economic conditions and market factors',
            'Property or asset valuation (for secured loans)',
            'Additional documentation requirements',
            'Relationship history with the bank',
            'Our "success rate" statistics refer to clients who followed our recommendations and subsequently received loan approval. This does not guarantee similar results for all clients.',
          ],
        },
        {
          id: 'accuracy-of-information',
          title: 'Accuracy of Information',
          paragraphs: [
            'Our analysis is only as accurate as the information you provide. We rely on:',
          ],
          list: [
            'Information you submit through our forms',
            'Documents you provide (pay slips, bank statements, etc.)',
            'Credit reports obtained with your authorization',
            'We are not responsible for errors or omissions in your submitted information. Providing false or misleading information may result in inaccurate analysis and is a violation of our Terms of Service.',
            'Bank policies, interest rates, and lending criteria change frequently. Our recommendations are based on information available at the time of analysis and may not reflect the most current bank policies.',
          ],
        },
        {
          id: 'third-party-links-services',
          title: 'Third-Party Links & Services',
          paragraphs: [
            'Our website may contain links to third-party websites, including bank websites and financial calculators. We are not responsible for the content, accuracy, or privacy practices of these external sites.',
            'We may recommend specific banks or financial products based on our analysis. These recommendations are based on general suitability and do not constitute endorsements. We do not receive commissions from banks for referrals unless explicitly disclosed.',
          ],
        },
        {
          id: 'limitation-of-liability',
          title: 'Limitation of Liability',
          paragraphs: [
            'To the fullest extent permitted by law, GURU Credits, its directors, employees, and affiliates shall not be liable for:',
          ],
          list: [
            'Any loan rejection or unfavorable terms from banks',
            'Financial losses resulting from following or not following our recommendations',
            'Delays in service delivery due to circumstances beyond our control',
            'Errors in analysis due to inaccurate information provided by you',
            'Actions taken by banks or third parties',
            'Any indirect, incidental, or consequential damages',
            'Our maximum liability is limited to the amount you paid for the specific service in question.',
          ],
        },
        {
          id: 'your-acknowledgment',
          title: 'Your Acknowledgment',
          paragraphs: [
            'By using GURU Credits services, you acknowledge that you have read, understood, and agree to this disclaimer. You understand that:',
          ],
          list: [
            'We provide consultation services, not loans or financial products',
            'Our analysis is advisory and not a guarantee of any outcome',
            'Final loan decisions are made by banks, not by us',
            'You are responsible for verifying information and making your own decisions',
          ],
        },
      ],
      contact: {
        title: 'Questions?',
        body: 'If you have any questions about this disclaimer, please contact us:',
      },
    },
    ms: {
      title: 'Penafian',
      lede: 'Sila baca penafian ini dengan teliti sebelum menggunakan perkhidmatan kami.',
      lastUpdated: 'Disember 2024',
      clauses: [
        {
          id: 'notis-penting',
          title: 'Notis Penting',
          paragraphs: [
            'GURU Credits beroperasi di bawah lesen Akta Pemberi Pinjam Wang 1951 yang dikeluarkan oleh KPKT. Kami menyediakan analisis kredit, padanan pinjaman, dan perkhidmatan pemberian pinjaman mengikut had kadar faedah berkanun dan peraturan perlindungan peminjam yang ditetapkan oleh Peraturan Pemberi Pinjam Wang (Kawalan dan Pelesenan). Kami bukan bank, dan apabila produk bank lebih sesuai dengan profil anda, kami akan merujuk anda dan bukannya memberikan kredit sendiri.',
          ],
        },
        {
          id: 'bukan-nasihat-kewangan',
          title: 'Bukan Nasihat Kewangan',
          paragraphs: [
            'Maklumat dan analisis yang disediakan oleh GURU Credits adalah untuk tujuan maklumat sahaja dan tidak boleh ditafsirkan sebagai nasihat kewangan, undang-undang, atau cukai profesional.',
            'Cadangan kami berdasarkan kriteria umum yang digunakan oleh bank dan mungkin tidak mengambil kira semua faktor yang berkaitan dengan situasi khusus anda. Kami sangat mengesyorkan berunding dengan penasihat kewangan berlesen, akauntan, atau profesional undang-undang sebelum membuat keputusan kewangan yang penting.',
            'Sebarang tindakan yang anda ambil berdasarkan analisis kami adalah atas risiko dan budi bicara anda sendiri.',
          ],
        },
        {
          id: 'tiada-jaminan-kelulusan-pinjaman',
          title: 'Tiada Jaminan Kelulusan Pinjaman',
          paragraphs: [
            'Kami tidak dan tidak boleh menjamin kelulusan pinjaman. Keputusan akhir mengenai sebarang permohonan pinjaman terletak sepenuhnya dengan bank atau institusi kewangan yang anda mohon.',
            'Bank mempertimbangkan banyak faktor di luar apa yang kami analisis, termasuk tetapi tidak terhad kepada:',
          ],
          list: [
            'Model pemarkahan kredit dalaman',
            'Polisi pemberian pinjaman semasa dan selera',
            'Keadaan ekonomi dan faktor pasaran',
            'Penilaian hartanah atau aset (untuk pinjaman bercagar)',
            'Keperluan dokumentasi tambahan',
            'Sejarah hubungan dengan bank',
            'Statistik "kadar kejayaan" kami merujuk kepada pelanggan yang mengikut cadangan kami dan kemudiannya mendapat kelulusan pinjaman. Ini tidak menjamin hasil yang serupa untuk semua pelanggan.',
          ],
        },
        {
          id: 'ketepatan-maklumat',
          title: 'Ketepatan Maklumat',
          paragraphs: [
            'Analisis kami hanya setepat maklumat yang anda berikan. Kami bergantung kepada:',
          ],
          list: [
            'Maklumat yang anda kemukakan melalui borang kami',
            'Dokumen yang anda berikan (slip gaji, penyata bank, dll.)',
            'Laporan kredit yang diperoleh dengan kebenaran anda',
            'Kami tidak bertanggungjawab untuk kesilapan atau kecuaian dalam maklumat yang anda kemukakan. Memberikan maklumat palsu atau mengelirukan mungkin mengakibatkan analisis yang tidak tepat dan merupakan pelanggaran Syarat Perkhidmatan kami.',
            'Polisi bank, kadar faedah, dan kriteria pemberian pinjaman berubah dengan kerap. Cadangan kami berdasarkan maklumat yang tersedia pada masa analisis dan mungkin tidak mencerminkan polisi bank yang paling terkini.',
          ],
        },
        {
          id: 'pautan-perkhidmatan-pihak-ketiga',
          title: 'Pautan & Perkhidmatan Pihak Ketiga',
          paragraphs: [
            'Laman web kami mungkin mengandungi pautan ke laman web pihak ketiga, termasuk laman web bank dan kalkulator kewangan. Kami tidak bertanggungjawab untuk kandungan, ketepatan, atau amalan privasi laman luaran ini.',
            'Kami mungkin mengesyorkan bank atau produk kewangan tertentu berdasarkan analisis kami. Cadangan ini berdasarkan kesesuaian umum dan tidak merupakan pengesahan. Kami tidak menerima komisen daripada bank untuk rujukan kecuali didedahkan secara jelas.',
          ],
        },
        {
          id: 'had-liabiliti',
          title: 'Had Liabiliti',
          paragraphs: [
            'Setakat yang dibenarkan sepenuhnya oleh undang-undang, GURU Credits, pengarah, pekerja, dan sekutunya tidak bertanggungjawab untuk:',
          ],
          list: [
            'Sebarang penolakan pinjaman atau syarat yang tidak menguntungkan daripada bank',
            'Kerugian kewangan yang terhasil daripada mengikut atau tidak mengikut cadangan kami',
            'Kelewatan dalam penghantaran perkhidmatan kerana keadaan di luar kawalan kami',
            'Kesilapan dalam analisis kerana maklumat tidak tepat yang diberikan oleh anda',
            'Tindakan yang diambil oleh bank atau pihak ketiga',
            'Sebarang kerosakan tidak langsung, sampingan, atau akibat',
            'Liabiliti maksimum kami terhad kepada jumlah yang anda bayar untuk perkhidmatan tertentu yang berkenaan.',
          ],
        },
        {
          id: 'pengakuan-anda',
          title: 'Pengakuan Anda',
          paragraphs: [
            'Dengan menggunakan perkhidmatan GURU Credits, anda mengakui bahawa anda telah membaca, memahami, dan bersetuju dengan penafian ini. Anda memahami bahawa:',
          ],
          list: [
            'Kami menyediakan perkhidmatan konsultasi, bukan pinjaman atau produk kewangan',
            'Analisis kami bersifat nasihat dan bukan jaminan sebarang hasil',
            'Keputusan pinjaman akhir dibuat oleh bank, bukan oleh kami',
            'Anda bertanggungjawab untuk mengesahkan maklumat dan membuat keputusan anda sendiri',
          ],
        },
      ],
      contact: {
        title: 'Soalan?',
        body: 'Jika anda mempunyai sebarang soalan tentang penafian ini, sila hubungi kami:',
      },
    },
  },
};
