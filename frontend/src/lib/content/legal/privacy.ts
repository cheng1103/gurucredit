import { PATHS } from '@/lib/i18n/routes';
import type { LegalDoc } from './types';

// Normalised from the legacy `sections` array (6 entries) plus the standalone
// `cookies` block, which is folded into the trailing "Data Retention" clause
// as a leading paragraph so the page keeps exactly six numbered clauses.
export const privacyDoc: LegalDoc = {
  path: PATHS.privacy,
  content: {
    en: {
      title: 'Privacy Policy',
      lede: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
      lastUpdated: 'December 2024',
      clauses: [
        {
          id: 'information-we-collect',
          title: 'Information We Collect',
          list: [
            'Personal identification information (Name, IC number, email address, phone number)',
            'Financial information (Income details, existing debts, loan commitments)',
            'Employment information (Employer name, job title, employment duration)',
            'Credit-related documents (CCRIS report, CTOS report, bank statements)',
            'Device and usage data (IP address, browser type, pages visited)',
          ],
        },
        {
          id: 'how-we-use-your-information',
          title: 'How We Use Your Information',
          list: [
            'To perform credit analysis and loan eligibility assessments',
            'To provide personalized bank and lender recommendations',
            'To communicate with you about your applications and services',
            'To improve our services and user experience',
            'To comply with legal and regulatory requirements',
            'To send important updates about our services (with your consent)',
          ],
        },
        {
          id: 'data-security',
          title: 'Data Security',
          list: [
            'All data is encrypted using industry-standard SSL/TLS encryption',
            'Access to personal data is restricted to authorized personnel only',
            'Regular security audits and vulnerability assessments are conducted',
            'Secure data storage with backup and disaster recovery measures',
            'Two-factor authentication for administrative access',
          ],
        },
        {
          id: 'your-rights-under-pdpa',
          title: 'Your Rights Under PDPA',
          list: [
            'Right to access your personal data held by us',
            'Right to correct any inaccurate personal data',
            'Right to withdraw consent for data processing',
            'Right to request deletion of your personal data',
            'Right to be informed about how your data is used',
            'Right to data portability where applicable',
          ],
        },
        {
          id: 'data-sharing-third-parties',
          title: 'Data Sharing & Third Parties',
          list: [
            'We do not sell your personal information to third parties',
            'Data is only shared with banks/lenders with your explicit consent',
            'Service providers (payment processors, cloud hosting) are bound by confidentiality agreements',
            'We may disclose information when required by law or court order',
            'Anonymous, aggregated data may be used for statistical analysis',
          ],
        },
        {
          id: 'data-retention',
          title: 'Data Retention',
          paragraphs: [
            'Cookies & Tracking: We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us understand how you use our services, remember your preferences, and improve our offerings. You can control cookie settings through your browser preferences. Essential cookies are required for the website to function properly and cannot be disabled.',
          ],
          list: [
            'Personal data is retained for up to 12 months after your last transaction',
            'Financial documents are securely deleted within 30 days of analysis completion',
            'Account information is retained while your account is active',
            'You may request immediate deletion of your data at any time',
            'Some data may be retained longer if required by law',
          ],
        },
      ],
      contact: {
        title: 'Contact Us About Privacy',
        body: 'If you have any questions about this Privacy Policy, your personal data, or wish to exercise your rights under PDPA, please contact us:',
      },
    },
    ms: {
      title: 'Dasar Privasi',
      lede: 'Privasi anda penting bagi kami. Dasar ini menerangkan cara kami mengumpul, menggunakan, dan melindungi maklumat peribadi anda.',
      lastUpdated: 'Disember 2024',
      clauses: [
        {
          id: 'maklumat-yang-kami-kumpul',
          title: 'Maklumat Yang Kami Kumpul',
          list: [
            'Maklumat pengenalan peribadi (Nama, nombor IC, alamat e-mel, nombor telefon)',
            'Maklumat kewangan (Butiran pendapatan, hutang sedia ada, komitmen pinjaman)',
            'Maklumat pekerjaan (Nama majikan, jawatan, tempoh pekerjaan)',
            'Dokumen berkaitan kredit (Laporan CCRIS, laporan CTOS, penyata bank)',
            'Data peranti dan penggunaan (Alamat IP, jenis pelayar, halaman dilawati)',
          ],
        },
        {
          id: 'cara-kami-menggunakan-maklumat-anda',
          title: 'Cara Kami Menggunakan Maklumat Anda',
          list: [
            'Untuk melaksanakan analisis kredit dan penilaian kelayakan pinjaman',
            'Untuk menyediakan cadangan bank dan pemberi pinjaman yang diperibadikan',
            'Untuk berkomunikasi dengan anda tentang permohonan dan perkhidmatan anda',
            'Untuk menambah baik perkhidmatan dan pengalaman pengguna kami',
            'Untuk mematuhi keperluan undang-undang dan peraturan',
            'Untuk menghantar kemas kini penting tentang perkhidmatan kami (dengan persetujuan anda)',
          ],
        },
        {
          id: 'keselamatan-data',
          title: 'Keselamatan Data',
          list: [
            'Semua data disulitkan menggunakan penyulitan SSL/TLS standard industri',
            'Akses kepada data peribadi terhad kepada kakitangan yang diberi kuasa sahaja',
            'Audit keselamatan dan penilaian kelemahan berkala dijalankan',
            'Penyimpanan data selamat dengan langkah sandaran dan pemulihan bencana',
            'Pengesahan dua faktor untuk akses pentadbiran',
          ],
        },
        {
          id: 'hak-anda-di-bawah-pdpa',
          title: 'Hak Anda Di Bawah PDPA',
          list: [
            'Hak untuk mengakses data peribadi anda yang dipegang oleh kami',
            'Hak untuk membetulkan sebarang data peribadi yang tidak tepat',
            'Hak untuk menarik balik persetujuan untuk pemprosesan data',
            'Hak untuk meminta pemadaman data peribadi anda',
            'Hak untuk dimaklumkan tentang cara data anda digunakan',
            'Hak untuk mudah alih data di mana berkenaan',
          ],
        },
        {
          id: 'perkongsian-data-pihak-ketiga',
          title: 'Perkongsian Data & Pihak Ketiga',
          list: [
            'Kami tidak menjual maklumat peribadi anda kepada pihak ketiga',
            'Data hanya dikongsi dengan bank/pemberi pinjaman dengan persetujuan jelas anda',
            'Penyedia perkhidmatan (pemproses pembayaran, pengehosan awan) terikat dengan perjanjian kerahsiaan',
            'Kami mungkin mendedahkan maklumat apabila dikehendaki oleh undang-undang atau perintah mahkamah',
            'Data tanpa nama dan agregat mungkin digunakan untuk analisis statistik',
          ],
        },
        {
          id: 'pengekalan-data',
          title: 'Pengekalan Data',
          paragraphs: [
            'Kuki & Penjejakan: Kami menggunakan kuki dan teknologi penjejakan yang serupa untuk meningkatkan pengalaman anda di laman web kami. Kuki membantu kami memahami cara anda menggunakan perkhidmatan kami, mengingati keutamaan anda, dan menambah baik tawaran kami. Anda boleh mengawal tetapan kuki melalui keutamaan pelayar anda. Kuki penting diperlukan untuk laman web berfungsi dengan betul dan tidak boleh dilumpuhkan.',
          ],
          list: [
            'Data peribadi disimpan sehingga 12 bulan selepas transaksi terakhir anda',
            'Dokumen kewangan dipadam dengan selamat dalam masa 30 hari selepas analisis selesai',
            'Maklumat akaun disimpan selagi akaun anda aktif',
            'Anda boleh meminta pemadaman segera data anda pada bila-bila masa',
            'Sesetengah data mungkin disimpan lebih lama jika dikehendaki oleh undang-undang',
          ],
        },
      ],
      contact: {
        title: 'Hubungi Kami Tentang Privasi',
        body: 'Jika anda mempunyai sebarang soalan tentang Dasar Privasi ini, data peribadi anda, atau ingin melaksanakan hak anda di bawah PDPA, sila hubungi kami:',
      },
    },
  },
};
