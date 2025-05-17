<script lang="ts">
    import {onMount} from "svelte";
    import interact from "interactjs";
    import type {Panel} from "./index.svelte";

    interface Props {
        panel: Panel;
        selected: boolean;
        onselect: () => void;
    }

    let {panel, selected, onselect}: Props = $props();

    let selector: HTMLButtonElement;

    onMount(() => {
        const position = {x: 0, y: 0}

        interact(selector).draggable({
            listeners: {
                start() {
                    const rect = selector.getBoundingClientRect()
                    const parentRect = selector.offsetParent!.getBoundingClientRect()

                    selector.style.position = 'fixed'

                    selector.style.top = `${rect.top - parentRect.top}px`
                    selector.style.left = `${rect.left - parentRect.left}px`

                    position.x = 0
                    position.y = 0
                    selector.style.transform = ''
                    selector.classList.remove('hover:opacity-80')
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy

                    selector.style.transform =
                        `translate(${position.x}px, ${position.y}px)`
                },
                end() {
                    selector.style.position = ''
                    selector.style.transform = ''
                    selector.style.top = ''
                    selector.style.left = ''
                    selector.classList.add('hover:opacity-80')
                }
            }
        })
    })
</script>

<button id="panel-name-{panel.uuid}" bind:this={selector} onclick={onselect}
        class="panel-name bg-base-200 cursor-grab! active:cursor-grabbing! flex items-center gap-2 hover:opacity-80 transition-colors duration-150 border-2 p-1 {selected ? 'border-white/80' : 'border-white/20'} rounded-sm">
    <span class="text-md">{panel.name}</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
         stroke="currentColor"
         class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
</button>
