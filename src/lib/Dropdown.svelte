<script lang="ts">
    interface Props {
        title: string;
        options: string[];
    }

    let {title, options}: Props = $props();
</script>

<div class="relative group">
    <button class="cursor-pointer flex items-center gap-2 hover:opacity-80 duration-150 border-2 p-1 border-white/20 rounded-sm">
        <span class="text-md">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
        </svg>
    </button>

    <div class="absolute translate-y-2 w-30 py-2 bg-base-200 transition-transform origin-top duration-200 group-hover:scale-y-100 scale-y-0 group-hover:shadow-md group-hover:border-2 group-hover:border-white/20 rounded-md">
        <ul>
            {#each options as option}
                {#if option === "hr"}
                    <hr class="mx-3 border-white/20 my-0.5"/>
                {:else}
                    <li class="block my-0.5 w-30 flex items-center justify-center px-1">
                        <button class="py-2 cursor-pointer hover:bg-base-100/80 w-full block transition-background duration-200">
                            {option}
                        </button>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>
