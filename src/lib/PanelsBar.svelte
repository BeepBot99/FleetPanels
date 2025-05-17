<script lang="ts">
    import PanelName from "./PanelName.svelte";
    import type {Panel} from "./index.svelte";

    interface Props {
        panels: Panel[];
        selectedIndex: number;
    }

    let {panels, selectedIndex = $bindable()}: Props = $props();
</script>

<div class="overflow-x-auto flex gap-2 scrollbar scrollbar-track-transparent scrollbar-thumb-base-300 scrollbar-track-rounded-full">
    {#each panels as panel, index}
        <PanelName {panel} selected={index === selectedIndex} onselect={() => selectedIndex = index}/>
    {/each}
</div>
