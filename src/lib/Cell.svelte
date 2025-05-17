<script lang="ts">
    import {onMount, type Snippet} from "svelte";
    import interact from "interactjs";
    import {moveTo, type PanelLayout} from "./index.svelte";

    interface Props {
        left?: boolean;
        top?: boolean;
        right?: boolean;
        bottom?: boolean;
        height?: number | null;
        width?: number | null;
        setOwnHeight?: boolean;
        leftDrag?: boolean;
        rightDrag?: boolean;
        deltaWidth?: number;
        children: Snippet;
        panelLayout: PanelLayout;
        name: string;
    }

    let {
        left = false,
        right = false,
        top = false,
        bottom = false,
        height = $bindable(null),
        width = $bindable(null),
        setOwnHeight = false,
        leftDrag = $bindable(false),
        rightDrag = $bindable(false),
        deltaWidth = $bindable(0),
        children,
        panelLayout = $bindable(),
        name
    }: Props = $props();

    let cell: HTMLDivElement;

    $effect(() => {
        if (setOwnHeight) cell.style.flexBasis = `${height}px`;
    });

    onMount(() => {
        interact(cell)
            .resizable({
                edges: {left, right, top, bottom},
                listeners: {
                    move: event => {
                        if (event.rect.height >= 160 && event.rect.height <= window.innerHeight - 16 - 40 - 160) height = event.rect.height;
                        width = event.rect.width;
                        leftDrag = event.edges.left;
                        rightDrag = event.edges.right;
                        deltaWidth = event.deltaRect.width;
                    }
                },
                inertia: true
            })
            .dropzone({
                accept: ".panel-name",
                ondropactivate: () => dragging = true,
                ondropdeactivate: () => {
                    dragging = false
                    draggingOver = false
                },
                ondragenter: () => draggingOver = true,
                ondragleave: () => draggingOver = false,
                ondrop: event => {
                    moveTo(panelLayout, event.relatedTarget.id.slice("panel-name-".length), name)
                }
            })
    })

    let dragging = $state(false);
    let draggingOver = $state(false);
</script>

<div bind:this={cell} class:pl-1={left} class:pr-1={right} class:pt-1={top} class:pb-1={bottom}
     class:flex-1={!setOwnHeight}>
    <div class="rounded-md bg-base-200 h-full p-2 text-white {dragging ? draggingOver ? 'bg-base-300/30' : 'bg-base-300/20' : ''}">
        {@render children()}
    </div>
</div>
