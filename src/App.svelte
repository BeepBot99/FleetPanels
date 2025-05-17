<script lang="ts">
    import Column from "./lib/Column.svelte";
    import Cell from "./lib/Cell.svelte";
    import Nav from "./lib/Nav.svelte";
    import PanelsBar from "./lib/PanelsBar.svelte";

    let leftWidth = $state(300);
    let rightWidth = $state(400);
    let deltaMiddleWidth = $state(0);
    let middleLeft = $state(false);
    let middleRight = $state(false);
    let bottomHeight = $state(200);
    let topHeight = $state(null);

    $effect(() => {
        deltaMiddleWidth;
        if (middleLeft) {
            setTimeout(() => {
                leftWidth -= deltaMiddleWidth;
            }, 0)
        } else if (middleRight) {
            setTimeout(() => {
                rightWidth -= deltaMiddleWidth;
            }, 0)
        }
    })

    $effect(() => {
        if (topHeight) bottomHeight = window.innerHeight - topHeight - 16 - 40;
    })
</script>

<div class="h-screen flex flex-col">
    <Nav/>
    <main class="flex flex-1 p-2">
        <Column width={leftWidth}>
            <Cell right={true} bind:width={leftWidth}>
                <PanelsBar panelNames={["OpModes", "Gamepads"]}/>
            </Cell>
        </Column>
        <Column>
            <Cell bottom={true} left={true} right={true} bind:deltaWidth={deltaMiddleWidth} bind:leftDrag={middleLeft}
                  bind:rightDrag={middleRight} bind:height={topHeight}>
                <PanelsBar panelNames={["Field", "Graph", "Limelight Dashboard", "Limelight Feed"]}/>
            </Cell>
            <Cell top={true} left={true} right={true} bind:deltaWidth={deltaMiddleWidth} bind:leftDrag={middleLeft}
                  bind:rightDrag={middleRight} setOwnHeight={true} bind:height={bottomHeight}>
                <div class="flex items-end h-full">
                    <PanelsBar panelNames={["Telemetry"]}/>
                </div>
            </Cell>
        </Column>
        <Column width={rightWidth}>
            <Cell left={true} bind:width={rightWidth}>
                <PanelsBar panelNames={["Configurables", "Capture"]}/>
            </Cell>
        </Column>
    </main>
</div>