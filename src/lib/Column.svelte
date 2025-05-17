<script lang="ts">
    import type {Snippet} from "svelte";

    interface Props {
        children: Snippet;
        width?: number | null;
    }

    let {children, width = null}: Props = $props();

    let column: HTMLDivElement;

    $effect(() => {
        column.style.flexBasis = `${width}px`;
    })
</script>

<div bind:this={column} class="h-full flex flex-col min-w-50 {width ? 'max-w-1/3' : 'flex-1'}">
    {@render children()}
</div>