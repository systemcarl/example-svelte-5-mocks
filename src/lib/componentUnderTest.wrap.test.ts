import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ComponentUnderTest from './componentUnderTest.svelte';
import Dependency from './dependency.svelte';

vi.mock('./Dependency.svelte', async (originalModule) => {
  // dynamic import to avoid missing initialization after vitest hoisting
  const { createRawSnippet, mount, unmount } = await import('svelte');
  const originalComponent =
    ((await originalModule()) as typeof import('./dependency.svelte')).default;
  const spy = vi.fn(createRawSnippet((props) => {
    const testId = ('property' in props) ? props['property'] : 'default';
    return {
      render : () => `<div data-testid="${testId}"></div>`,
      setup : (node) => {
        const mounted = mount(originalComponent, {
          target : node,
          props : { ...props, property : 'mocked value' },
        });
        return () => unmount(mounted);
      },
    };
  }));

  return { default : spy };
});

describe('ComponentUnderTest', () => {
  it('renders mocked dependency', () => {
    render(ComponentUnderTest, {
      property : 'test value',
    });

    expect(screen.queryByTestId('test value')).toBeTruthy();
    expect(screen.queryByText('Property: test value')).not.toBeTruthy();
    expect(screen.queryByText('Property: mocked value')).toBeTruthy();
    expect(Dependency).toHaveBeenCalledExactlyOnceWith(
      expect.anything(),
      { property : 'test value' },
    );
  });
});
