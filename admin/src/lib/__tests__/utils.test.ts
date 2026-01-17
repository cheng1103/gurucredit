import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility', () => {
  it('merges class names and trims duplicates', () => {
    const result = cn('flex', 'items-center', ['text-sm', 'flex'], {
      hidden: false,
      'text-primary': true,
    });

    const tokens = result.split(' ').sort();
    expect(tokens).toEqual(['flex', 'items-center', 'text-primary', 'text-sm'].sort());
  });
});
