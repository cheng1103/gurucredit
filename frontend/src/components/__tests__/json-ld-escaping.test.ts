import { describe, it, expect } from 'vitest';
import { serializeJsonLd } from '@/components/JsonLd';

// Every JSON-LD emitter writes its graph into the page with
// dangerouslySetInnerHTML. Plain JSON.stringify leaves `</script>` intact, so
// a single such sequence in any FAQ answer, glossary definition, or article
// title would close the <script type="application/ld+json"> element early —
// breaking the structured data and turning whatever follows into live markup.
// See final-review.md M1.
describe('serializeJsonLd', () => {
  it('escapes every < so a </script> in content cannot close the script element', () => {
    const out = serializeJsonLd({
      '@type': 'Question',
      name: 'Is 5 < 6?',
      text: 'Yes </script><img src=x onerror=alert(1)> and <b>bold</b>',
    });

    expect(out).not.toContain('<');
    expect(out).not.toContain('</script>');
    // `>` needs no escaping — the HTML tokenizer only ever leaves script
    // data on a `</`, so neutralising `<` is sufficient and sufficient only.
    expect(out).toContain('\\u003c/script>');
  });

  it('stays parse-identical to JSON.stringify for a JSON consumer', () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [{ name: 'a </script> b', nested: { deep: '<<<' } }],
      n: 1,
      ok: true,
      nothing: null,
    };

    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it('leaves content without angle brackets byte-identical', () => {
    const data = { '@type': 'WebPage', name: 'Soalan Lazim', url: 'https://guru-credit.com/ms/faq' };
    expect(serializeJsonLd(data)).toBe(JSON.stringify(data));
  });
});
