import { PATHS } from '@/lib/i18n/routes';
import type { LegalDoc } from './types';

// Normalised from the legacy `sections` array (6 entries) plus the standalone
// `liability`, `governing`, and `changes` blocks, each promoted to its own
// trailing clause in that order.
export const termsDoc: LegalDoc = {
  path: PATHS.terms,
  content: {
    en: {
      title: 'Terms of Service',
      lede: 'Please read these terms carefully before using our services.',
      lastUpdated: 'December 2024',
      clauses: [
        {
          id: 'services-we-provide',
          title: 'Services We Provide',
          list: [
            'Credit report analysis and interpretation (CCRIS & CTOS)',
            'Debt Service Ratio (DSR) calculation and assessment',
            'Loan eligibility evaluation and approval chances',
            'Personalized bank and lender recommendations',
            'Credit repair guidance and consultation',
            'Loan application assistance and support',
          ],
        },
        {
          id: 'important-disclaimers',
          title: 'Important Disclaimers',
          list: [
            'We are a consultation service and NOT a bank or licensed lender',
            'Our analysis is based on information you provide and may not reflect all factors banks consider',
            'We do not guarantee loan approval - final decisions are made by banks',
            'Past results do not guarantee future outcomes',
            'Our recommendations are advisory and should not be considered as financial advice',
            'You should consult with licensed financial advisors for complex financial decisions',
          ],
        },
        {
          id: 'your-responsibilities',
          title: 'Your Responsibilities',
          list: [
            'Provide accurate and truthful information for analysis',
            'Submit authentic documents (IC, pay slips, bank statements)',
            'Inform us of any changes to your financial situation',
            'Not use our services for fraudulent or illegal purposes',
            'Respect our intellectual property and not redistribute our reports',
            'Comply with all applicable Malaysian laws and regulations',
          ],
        },
        {
          id: 'payment-terms',
          title: 'Payment Terms',
          list: [
            'All prices are in Malaysian Ringgit (RM) and inclusive of any applicable taxes',
            'Payment is required before service delivery',
            'We accept online banking (FPX), credit/debit cards, and e-wallets',
            'Prices may change without prior notice; confirmed orders are honored',
            'All fees are one-time charges unless otherwise specified',
            'Promotional prices may have specific terms and conditions',
          ],
        },
        {
          id: 'refund-policy',
          title: 'Refund Policy',
          list: [
            'Full refund if we cannot complete your analysis due to technical issues on our end',
            'Full refund if service is not delivered within the promised timeframe (excluding delays caused by you)',
            'Partial refund may be considered if incomplete analysis is delivered',
            'No refund once the complete analysis report has been delivered',
            'No refund for change of mind after service delivery',
            'Refund requests must be submitted within 7 days of service delivery',
          ],
        },
        {
          id: 'prohibited-activities',
          title: 'Prohibited Activities',
          list: [
            'Submitting false or misleading information',
            'Using forged or altered documents',
            "Attempting to access other users' accounts or data",
            'Reverse engineering or copying our analysis methodology',
            'Reselling or redistributing our services without authorization',
            'Any activity that violates Malaysian law',
          ],
        },
        {
          id: 'limitation-of-liability',
          title: 'Limitation of Liability',
          paragraphs: [
            'To the maximum extent permitted by law, GURU Credits shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities arising from your use of our services.',
            'Our total liability for any claims arising from these terms or our services shall not exceed the amount you paid for the specific service giving rise to the claim.',
            'We are not responsible for any actions taken by banks or financial institutions based on their own assessment of your application, regardless of our recommendations.',
          ],
        },
        {
          id: 'governing-law-jurisdiction',
          title: 'Governing Law & Jurisdiction',
          paragraphs: [
            'These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Malaysia. We encourage resolving disputes amicably through direct communication before pursuing legal remedies.',
          ],
        },
        {
          id: 'changes-to-these-terms',
          title: 'Changes to These Terms',
          paragraphs: [
            'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes indicates your acceptance of the new terms. We recommend reviewing these terms periodically for updates.',
          ],
        },
      ],
      contact: {
        title: 'Questions About These Terms?',
        body: 'If you have any questions about these Terms of Service, please contact us:',
      },
    },
    ms: {
      title: 'Syarat Perkhidmatan',
      lede: 'Sila baca syarat-syarat ini dengan teliti sebelum menggunakan perkhidmatan kami.',
      lastUpdated: 'Disember 2024',
      clauses: [
        {
          id: 'perkhidmatan-yang-kami-sediakan',
          title: 'Perkhidmatan Yang Kami Sediakan',
          list: [
            'Analisis dan tafsiran laporan kredit (CCRIS & CTOS)',
            'Pengiraan dan penilaian Nisbah Khidmat Hutang (DSR)',
            'Penilaian kelayakan pinjaman dan peluang kelulusan',
            'Cadangan bank dan pemberi pinjaman yang diperibadikan',
            'Panduan dan konsultasi pembaikan kredit',
            'Bantuan dan sokongan permohonan pinjaman',
          ],
        },
        {
          id: 'penafian-penting',
          title: 'Penafian Penting',
          list: [
            'Kami adalah perkhidmatan konsultasi dan BUKAN bank atau pemberi pinjaman berlesen',
            'Analisis kami berdasarkan maklumat yang anda berikan dan mungkin tidak mencerminkan semua faktor yang dipertimbangkan bank',
            'Kami tidak menjamin kelulusan pinjaman - keputusan akhir dibuat oleh bank',
            'Keputusan lepas tidak menjamin hasil masa depan',
            'Cadangan kami bersifat nasihat dan tidak boleh dianggap sebagai nasihat kewangan',
            'Anda harus berunding dengan penasihat kewangan berlesen untuk keputusan kewangan yang kompleks',
          ],
        },
        {
          id: 'tanggungjawab-anda',
          title: 'Tanggungjawab Anda',
          list: [
            'Memberikan maklumat yang tepat dan benar untuk analisis',
            'Mengemukakan dokumen yang asli (IC, slip gaji, penyata bank)',
            'Memaklumkan kami tentang sebarang perubahan pada situasi kewangan anda',
            'Tidak menggunakan perkhidmatan kami untuk tujuan penipuan atau haram',
            'Menghormati harta intelek kami dan tidak mengedar semula laporan kami',
            'Mematuhi semua undang-undang dan peraturan Malaysia yang berkenaan',
          ],
        },
        {
          id: 'syarat-pembayaran',
          title: 'Syarat Pembayaran',
          list: [
            'Semua harga dalam Ringgit Malaysia (RM) dan termasuk sebarang cukai yang berkenaan',
            'Pembayaran diperlukan sebelum penghantaran perkhidmatan',
            'Kami menerima perbankan dalam talian (FPX), kad kredit/debit, dan e-wallet',
            'Harga mungkin berubah tanpa notis terlebih dahulu; pesanan yang disahkan dihormati',
            'Semua yuran adalah caj sekali sahaja kecuali dinyatakan sebaliknya',
            'Harga promosi mungkin mempunyai syarat dan terma tertentu',
          ],
        },
        {
          id: 'polisi-bayaran-balik',
          title: 'Polisi Bayaran Balik',
          list: [
            'Bayaran balik penuh jika kami tidak dapat menyelesaikan analisis anda kerana isu teknikal di pihak kami',
            'Bayaran balik penuh jika perkhidmatan tidak dihantar dalam tempoh yang dijanjikan (tidak termasuk kelewatan yang disebabkan oleh anda)',
            'Bayaran balik separa mungkin dipertimbangkan jika analisis tidak lengkap dihantar',
            'Tiada bayaran balik setelah laporan analisis lengkap telah dihantar',
            'Tiada bayaran balik untuk perubahan fikiran selepas penghantaran perkhidmatan',
            'Permintaan bayaran balik mesti dikemukakan dalam masa 7 hari penghantaran perkhidmatan',
          ],
        },
        {
          id: 'aktiviti-yang-dilarang',
          title: 'Aktiviti Yang Dilarang',
          list: [
            'Mengemukakan maklumat palsu atau mengelirukan',
            'Menggunakan dokumen palsu atau dipinda',
            'Cuba mengakses akaun atau data pengguna lain',
            'Kejuruteraan songsang atau menyalin metodologi analisis kami',
            'Menjual semula atau mengedar semula perkhidmatan kami tanpa kebenaran',
            'Sebarang aktiviti yang melanggar undang-undang Malaysia',
          ],
        },
        {
          id: 'had-liabiliti',
          title: 'Had Liabiliti',
          paragraphs: [
            'Setakat yang dibenarkan oleh undang-undang, GURU Credits tidak bertanggungjawab untuk sebarang kerosakan tidak langsung, sampingan, khas, akibat, atau punitif, termasuk tetapi tidak terhad kepada kehilangan keuntungan, data, atau peluang perniagaan yang timbul daripada penggunaan perkhidmatan kami.',
            'Jumlah liabiliti kami untuk sebarang tuntutan yang timbul daripada syarat-syarat ini atau perkhidmatan kami tidak akan melebihi jumlah yang anda bayar untuk perkhidmatan tertentu yang menimbulkan tuntutan.',
            'Kami tidak bertanggungjawab untuk sebarang tindakan yang diambil oleh bank atau institusi kewangan berdasarkan penilaian mereka sendiri terhadap permohonan anda, tanpa mengira cadangan kami.',
          ],
        },
        {
          id: 'undang-undang-yang-mentadbir-bidang-kuasa',
          title: 'Undang-undang Yang Mentadbir & Bidang Kuasa',
          paragraphs: [
            'Syarat Perkhidmatan ini akan ditadbir dan ditafsirkan mengikut undang-undang Malaysia. Sebarang pertikaian yang timbul daripada syarat-syarat ini atau penggunaan perkhidmatan kami akan tertakluk kepada bidang kuasa eksklusif mahkamah Malaysia. Kami menggalakkan penyelesaian pertikaian secara baik melalui komunikasi langsung sebelum menggunakan remedi undang-undang.',
          ],
        },
        {
          id: 'perubahan-kepada-syarat-syarat-ini',
          title: 'Perubahan kepada Syarat-syarat Ini',
          paragraphs: [
            'Kami berhak untuk mengubah suai Syarat Perkhidmatan ini pada bila-bila masa. Perubahan akan berkuat kuasa serta-merta selepas disiarkan di laman web kami. Penggunaan berterusan anda terhadap perkhidmatan kami selepas sebarang perubahan menunjukkan penerimaan anda terhadap syarat-syarat baharu. Kami mengesyorkan menyemak syarat-syarat ini secara berkala untuk kemas kini.',
          ],
        },
      ],
      contact: {
        title: 'Soalan Tentang Syarat-syarat Ini?',
        body: 'Jika anda mempunyai sebarang soalan tentang Syarat Perkhidmatan ini, sila hubungi kami:',
      },
    },
  },
};
