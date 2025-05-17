<script lang="ts">
    import Column from "./lib/Column.svelte";
    import Cell from "./lib/Cell.svelte";
    import Nav from "./lib/Nav.svelte";
    import PanelsBar from "./lib/PanelsBar.svelte";
    import {defaults, panels, type PanelLayout, type CellSizes} from "./lib/index.svelte";

    let panelLayout: PanelLayout = $state({
        cellSizes: defaults,
        leftPanels: panels("OpModes", "Gamepads"),
        rightPanels: panels("Configurables", "Capture"),
        bottomPanels: panels("Telemetry"),
        centerPanels: panels("Field", "Graph", "Limelight Dashboard", "Limelight Feed"),
        leftSelectedPanel: 0,
        rightSelectedPanel: 0,
        bottomSelectedPanel: 0,
        centerSelectedPanel: 0
    });

    let cellSizes: CellSizes = $derived(panelLayout.cellSizes);

    let deltaMiddleWidth = $state(0);
    let middleLeft = $state(false);
    let middleRight = $state(false);
    let topHeight = $state(null);

    $effect(() => {
        deltaMiddleWidth;
        if (middleLeft) {
            setTimeout(() => {
                cellSizes.leftWidth -= deltaMiddleWidth;
            }, 0)
        } else if (middleRight) {
            setTimeout(() => {
                cellSizes.rightWidth -= deltaMiddleWidth;
            }, 0)
        }
    })

    $effect(() => {
        if (topHeight) cellSizes.bottomHeight = window.innerHeight - topHeight - 16 - 40;
    })
</script>

<div class="h-screen flex flex-col">
    <Nav bind:cellSizes/>
    <main class="flex flex-1 p-2">
        <Column width={cellSizes.leftWidth}>
            <Cell bind:panelLayout name="left" right={true} bind:width={cellSizes.leftWidth}>
                <PanelsBar panels={panelLayout.leftPanels} bind:selectedIndex={panelLayout.leftSelectedPanel}/>
                {@html panelLayout.leftPanels[panelLayout.leftSelectedPanel].html}
            </Cell>
        </Column>
        <Column>
            <Cell bind:panelLayout name="center" bottom={true} left={true} right={true}
                  bind:deltaWidth={deltaMiddleWidth}
                  bind:leftDrag={middleLeft}
                  bind:rightDrag={middleRight} bind:height={topHeight}>
                <PanelsBar panels={panelLayout.centerPanels} bind:selectedIndex={panelLayout.centerSelectedPanel}/>
                {@html panelLayout.centerPanels[panelLayout.centerSelectedPanel].html}
            </Cell>
            <Cell bind:panelLayout name="bottom" top={true} left={true} right={true} bind:deltaWidth={deltaMiddleWidth}
                  bind:leftDrag={middleLeft}
                  bind:rightDrag={middleRight} setOwnHeight={true} bind:height={cellSizes.bottomHeight}>
                <div class="flex flex-col justify-between h-full">
                    {@html panelLayout.bottomPanels[panelLayout.bottomSelectedPanel].html}
                    <PanelsBar panels={panelLayout.bottomPanels} bind:selectedIndex={panelLayout.bottomSelectedPanel}/>
                </div>
            </Cell>
        </Column>
        <Column width={cellSizes.rightWidth}>
            <Cell bind:panelLayout name="right" left={true} bind:width={cellSizes.rightWidth}>
                <PanelsBar panels={panelLayout.rightPanels} bind:selectedIndex={panelLayout.rightSelectedPanel}/>
                {@html panelLayout.rightPanels[panelLayout.rightSelectedPanel].html}
            </Cell>
        </Column>
    </main>
</div>