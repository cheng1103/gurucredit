import { sanitizeText } from '../sanitize.util';

describe('sanitizeText utility', () => {
  it('strips HTML tags and inline handlers', () => {
    const dirty =
      '<script>alert(1)</script><div onclick="evil()">Hello   World</div>';
    const result = sanitizeText(dirty);
    expect(result).toBe('alert(1)Hello World');
  });

  it('removes javascript: payloads', () => {
    const dirty = 'javascript:alert(1)';
    expect(sanitizeText(dirty)).toBe('alert(1)');
    expect(sanitizeText(dirty, 50, false)).toBe('alert(1)');
  });

  it('returns undefined for empty strings when treatEmptyAsUndefined', () => {
    expect(sanitizeText('   ')).toBeUndefined();
  });

  it('respects maxLength and treatEmptyAsUndefined=false', () => {
    const result = sanitizeText('  clean value  ', 5, false);
    expect(result).toBe('clean');
  });
});
