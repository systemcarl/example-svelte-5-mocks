<main>
  <h1>Mocking Svelte 5 Components</h1>
  <p>
    The tests in this project demonstrate various techniques for mocking Svelte
      components.
    Run them with <code>npm test</code>.
  </p>
  <p>
    For more information, read the
      <a href="https://carledwardlyons.ca/articles/tips/svelte/mocking">
        Mocking Components in Svelte 5
      </a>
    guide.
  </p>
</main>

<style>
  :global(body) {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: linear-gradient(100deg, #FCFAED 0%, #FFFFFF 100%);
    font-family: 'Public Sans', sans-serif;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    color: #111818;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-family: 'Atkinson Hyperlegible', sans-serif;
    font-weight: 700;
  }

  code {
    font-family: 'Fragment Mono', monospace;
    font-size: 0.9em;
  }
</style>
