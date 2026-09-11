import { PATHS } from '@/lib/i18n/routes';
import type { GuideDoc } from './types';

export const editorialPolicyGuide: GuideDoc = {
  slug: 'editorial-policy',
  path: PATHS.editorialPolicy,
  breadcrumbLabel: 'How We Publish Borrower-Facing Financial Content',
  section: 'editorial',
  content: {
    en: {
      eyebrow: 'Editorial',
      title: 'How We Publish Borrower-Facing Financial Content',
      lede: 'How GURU Credits researches, reviews, updates, and maintains loan and credit education content for Malaysian borrowers.',
      sections: [
        {
          kind: 'paragraphs',
          id: 'at-a-glance',
          heading: 'At a glance',
          paragraphs: [
            'Scope: loans, CCRIS, CTOS, DSR, debt consolidation, documents, and borrower decision support.',
            'Review standard: visible claims, internal consistency, and borrower usefulness are checked before publication.',
            'Freshness: high-intent pages are revised when guidance becomes stale or borrower search intent shifts.',
            'YMYL care: we treat financial guidance as high-stakes content and avoid unsupported promises.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'people-first',
          heading: 'People-first content before search-first content',
          paragraphs: [
            'We publish pages to answer borrower questions clearly: eligibility, CCRIS and CTOS, debt consolidation, self-employed income proof, lender fit, and application readiness. Search traffic matters, but it does not replace practical usefulness.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'review-before-publish',
          heading: 'Review before publish',
          paragraphs: [
            'Pages touching borrowing decisions, rates, DSR, CCRIS, CTOS, debt pressure, or application preparation are checked against their visible claims before they are updated or launched.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'update-cadence',
          heading: 'Update cadence',
          paragraphs: [
            'We revise pages when borrower guidance changes, internal application patterns shift, lender requirements move materially, or a page becomes stale relative to current borrower intent.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'claim-discipline',
          heading: 'Claim discipline',
          paragraphs: [
            'We avoid guarantees, fake urgency, unverifiable approval claims, or invented licensing details. Where outcomes vary, we say so and explain the conditions.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'internal-linking',
          heading: 'Internal linking and maintenance',
          paragraphs: [
            'Important guides link to tools, service pages, and supporting articles so readers and crawlers can follow a coherent cluster rather than isolated pages.',
          ],
        },
      ],
      related: [
        { title: 'Review methodology', href: PATHS.reviewMethodology },
        { title: 'Verify us', href: PATHS.verifyUs },
      ],
    },
    ms: {
      eyebrow: 'Editorial',
      title: 'Bagaimana Kami Menerbitkan Kandungan Kewangan untuk Peminjam',
      lede: 'Bagaimana GURU Credits menyelidik, menyemak, mengemas kini, dan menyelenggara kandungan pendidikan pinjaman dan kredit untuk peminjam Malaysia.',
      sections: [
        {
          kind: 'paragraphs',
          id: 'at-a-glance',
          heading: 'Sepintas lalu',
          paragraphs: [
            'Skop: pinjaman, CCRIS, CTOS, DSR, penyatuan hutang, dokumen, dan sokongan keputusan peminjam.',
            'Standard semakan: dakwaan yang dipaparkan, konsistensi dalaman, dan kegunaan untuk peminjam diperiksa sebelum penerbitan.',
            'Kesegaran: halaman berniat tinggi dikemas kini apabila panduan menjadi lapuk atau niat carian berubah.',
            'Penjagaan YMYL: kami menganggap panduan kewangan sebagai kandungan berisiko tinggi dan mengelakkan janji yang tidak disokong.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'people-first',
          heading: 'Kandungan berpandukan pengguna sebelum carian',
          paragraphs: [
            'Kami menerbitkan halaman untuk menjawab soalan peminjam dengan jelas: kelayakan, CCRIS dan CTOS, penyatuan hutang, bukti pendapatan bekerja sendiri, kesesuaian lender, dan kesiapsiagaan permohonan. Trafik carian penting, tetapi ia tidak menggantikan kegunaan sebenar.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'review-before-publish',
          heading: 'Semakan sebelum terbit',
          paragraphs: [
            'Halaman yang menyentuh keputusan pinjaman, kadar, DSR, CCRIS, CTOS, tekanan hutang, atau persediaan permohonan disemak berbanding dakwaan yang dipaparkan sebelum dikemas kini atau dilancarkan.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'update-cadence',
          heading: 'Kekerapan kemas kini',
          paragraphs: [
            'Kami mengemas kini halaman apabila panduan peminjam berubah, corak permohonan dalaman bergerak, keperluan lender berubah dengan ketara, atau halaman menjadi lapuk berbanding niat carian semasa.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'claim-discipline',
          heading: 'Disiplin dakwaan',
          paragraphs: [
            'Kami mengelakkan jaminan, urgensi palsu, dakwaan kelulusan yang tidak boleh disahkan, atau butiran lesen yang direka. Apabila hasil berbeza, kami nyatakan dengan jelas serta terangkan syaratnya.',
          ],
        },
        {
          kind: 'paragraphs',
          id: 'internal-linking',
          heading: 'Internal linking dan penyelenggaraan',
          paragraphs: [
            'Panduan penting dipautkan kepada tools, halaman perkhidmatan, dan artikel sokongan supaya pembaca dan crawler dapat mengikuti kluster yang koheren, bukan halaman terpencil.',
          ],
        },
      ],
      related: [
        { title: 'Metodologi semakan', href: PATHS.reviewMethodology },
        { title: 'Sahkan kami', href: PATHS.verifyUs },
      ],
    },
  },
};
