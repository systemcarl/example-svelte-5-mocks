import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ComponentUnderTest from './componentUnderTest.svelte';
import Dependency from './dependency.svelte';

vi.mock('./Dependency.svelte', { spy : true });

describe('ComponentUnderTest', () => {
  it('renders mocked dependency', () => {
    render(ComponentUnderTest, {
      property : 'test value',
    });

    expect(screen.queryByText('Property: test value')).toBeTruthy();
    expect(screen.queryByText('Property: mocked value')).not.toBeTruthy();
    expect(Dependency).toHaveBeenCalledExactlyOnceWith(
      expect.anything(),
      { property : 'test value' },
    );
  });
});
