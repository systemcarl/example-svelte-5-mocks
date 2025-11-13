import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ComponentUnderTest from './componentUnderTest.svelte';
import Dependency from './dependency.svelte';

vi.mock('./Dependency.svelte', async () => {
  // dynamic import to avoid missing initialization after vitest hoisting
  const { createRawSnippet } = await import('svelte');
  return {
    default : vi.fn(createRawSnippet(() => ({
      render : () => '<div>Property: mocked value</div>',
    }))),
  };
});

describe('ComponentUnderTest', () => {
  it('renders mocked dependency', () => {
    render(ComponentUnderTest, {
      property : 'test value',
    });

    expect(screen.queryByText('Property: test value')).not.toBeTruthy();
    expect(screen.queryByText('Property: mocked value')).toBeTruthy();
    expect(Dependency).toHaveBeenCalledExactlyOnceWith(
      expect.anything(),
      { property : 'test value' },
    );
  });
});
