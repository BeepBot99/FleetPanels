<script lang="ts">
    interface Props {
        panelNames: string[]
    }

    let {panelNames}: Props = $props();

    let selectedIndex = $state(0);
</script>

<div class="overflow-x-auto flex gap-2 scrollbar scrollbar-track-transparent scrollbar-thumb-base-300 scrollbar-track-rounded-full">
    {#each panelNames as panelName, index}
        <button onclick={() => selectedIndex = index} class="cursor-pointer flex items-center gap-2 hover:opacity-80 duration-150 border-2 p-1 {index === selectedIndex ? 'border-white/80' : 'border-white/20'} rounded-sm">
            <span class="text-md">{panelName}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
        </button>
    {/each}
</div>
