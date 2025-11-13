<script lang="ts">
  import type { Snippet } from 'svelte';
  import Dependency from './dependency.svelte';

  const { property, children } : {
    property : string;
    children ?: Snippet;
  } = $props();
</script>

<div>
  <h2>Component Under Test</h2>
  <Dependency property={property} />
  <div data-testid="children-container">
    {@render children?.()}
  </div>
</div>
