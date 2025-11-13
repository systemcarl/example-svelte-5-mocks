<script lang="ts">
  import ComponentUnderTest from './componentUnderTest.svelte';
  import Dependency from './dependency.svelte';

  const { property } : { property : string; } = $props();
</script>

<ComponentUnderTest property={property}>
  <Dependency property="child value" />
</ComponentUnderTest>
