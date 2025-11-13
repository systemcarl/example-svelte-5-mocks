import { describe, it, expect } from 'vitest';
import { createRawSnippet, mount, unmount } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import ComponentUnderTest from './componentUnderTest.svelte';
import Dependency from './dependency.svelte';
import ComponentUnderTestWithChild from
  './componentUnderTest.withChild.test.svelte';

describe('ComponentUnderTest', () => {
  it('renders without children', () => {
    render(ComponentUnderTest, {
      property : 'test value',
    });

    expect(screen.queryByText('Property: test value')).toBeTruthy();
  });

  it('renders dependency', () => {
    render(ComponentUnderTestWithChild, {
      property : 'test value',
    });

    expect(screen.queryByText('Property: test value')).toBeTruthy();
    expect(screen.queryByText('Property: child value')).toBeTruthy();
  });

  it('renders mocked dependency', () => {
    const mock = createRawSnippet(() => ({
      render : () => '<div>Property: mocked value</div>',
    }));

    render(ComponentUnderTest, {
      property : 'test value',
      children : mock,
    });

    expect(screen.queryByText('Property: test value')).toBeTruthy();
    expect(screen.queryByText('Property: mocked value')).toBeTruthy();
  });

  it('renders mocked dependency component', () => {
    const mock = createRawSnippet(() => ({
      render : () => '<div></div>',
      setup : (node) => {
        const mounted = mount(Dependency, {
          target : node,
          props : { property : 'mocked value' },
        });
        return () => unmount(mounted);
      },
    }));

    render(ComponentUnderTest, {
      property : 'test value',
      children : mock,
    });

    expect(screen.queryByText('Property: test value')).toBeTruthy();
    expect(screen.queryByText('Property: mocked value')).toBeTruthy();
  });

  it('renders manually mounted dependency component', () => {
    render(ComponentUnderTest, {
      property : 'test value',
    });

    const container = screen.getByTestId('children-container');
    const mounted = mount(Dependency, {
      target : container,
      props : { property : 'mounted value' },
    });

    expect(screen.queryByText('Property: test value')).toBeTruthy();
    expect(screen.queryByText('Property: mounted value')).toBeTruthy();

    unmount(mounted);
  });
});
