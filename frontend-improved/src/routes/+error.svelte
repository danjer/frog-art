<script>
  import { page } from '$app/state';
</script>

<main>
  <div class="error-page">
    <h1>{page.status}</h1>
    <p>{page.error?.message ?? 'Something went wrong'}</p>
    <a href="/" class="btn">Go home</a>
  </div>
</main>

<style>
  main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    padding: 20px;
  }

  .error-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  h1 {
    font-size: 72px;
    color: #c3a920;
    font-weight: 300;
    line-height: 1;
  }

  p {
    color: #888;
    font-size: 16px;
  }

  .btn {
    background: #c3a920;
    color: #111;
    border-radius: 12px;
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 600;
    display: inline-block;
    margin-top: 8px;
  }
</style>
