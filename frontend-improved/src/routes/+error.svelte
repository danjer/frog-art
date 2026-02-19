<script>
  import { page } from '$app/state';
</script>

<div class="flex-1 flex items-center justify-center min-h-dvh p-5">
  <div class="text-center flex flex-col gap-4 items-center">
    <h1 class="text-[72px] text-gold font-light leading-none">{page.status}</h1>
    <p class="text-muted text-base">{page.error?.message ?? 'Something went wrong'}</p>
    <a href="/" class="bg-gold text-surface rounded-xl py-3.5 px-7 text-[15px] font-semibold inline-block mt-2">
      Go home
    </a>
  </div>
</div>
