<script>
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>Art Finder — Kunstuitleen Utrecht</title>
</svelte:head>

<div class="app">
  <slot />
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: #111111;
    color: #f0ede6;
    font-family: 'Georgia', 'Times New Roman', serif;
    min-height: 100dvh;
    overscroll-behavior: none;
  }

  :global(button) {
    cursor: pointer;
    font-family: inherit;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>
