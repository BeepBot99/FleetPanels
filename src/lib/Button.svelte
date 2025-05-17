<script lang="ts">
    import type {Snippet} from "svelte";

    interface Props {
        name: string;
        children: Snippet;
        class?: string;

        [key: string]: any;
    }

    let {name, children, class: clazz = "", ...props}: Props = $props();
</script>

<button {...props} class="cursor-pointer hover:opacity-80 duration-150 active:scale-98 active:translate-y-0.5 {clazz}"
        aria-label={name} title={name}>
    {@render children()}
</button>