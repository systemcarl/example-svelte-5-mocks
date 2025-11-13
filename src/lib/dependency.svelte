<script lang="ts">
  const { property = 'default value' } : { property ?: string; } = $props();
</script>

<div>
  <h3>Inner Component</h3>
  <p>Property: { property }</p>
</div>
