export interface CellSizes {
    leftWidth: number;
    rightWidth: number;
    bottomHeight: number;
}

export const small: CellSizes = {
    leftWidth: 200,
    rightWidth: 200,
    bottomHeight: 200
}

export const medium: CellSizes = {
    leftWidth: 300,
    rightWidth: 300,
    bottomHeight: 300,
}

export const defaults: CellSizes = {
    leftWidth: 300,
    rightWidth: 400,
    bottomHeight: 200
}

export interface Panel {
    name: string;
    html: string;
    uuid: string;
}

function panel(name: string): Panel {
    return {
        name,
        html: name,
        uuid: crypto.randomUUID()
    }
}

export function panels(...names: string[]): Panel[] {
    return names.map(panel)
}

export interface PanelLayout {
    leftPanels: Panel[];
    rightPanels: Panel[];
    bottomPanels: Panel[];
    centerPanels: Panel[];
    cellSizes: CellSizes;
    leftSelectedPanel: number;
    rightSelectedPanel: number;
    bottomSelectedPanel: number;
    centerSelectedPanel: number;
}

export function moveTo(layout: PanelLayout, uuid: string, newSide: string) {
    let panel: Panel = [...layout.leftPanels, ...layout.rightPanels, ...layout.bottomPanels, ...layout.centerPanels]
        .find(p => p.uuid === uuid) as Panel;
    layout.leftPanels = layout.leftPanels.filter(p => p.uuid !== uuid);
    layout.rightPanels = layout.rightPanels.filter(p => p.uuid !== uuid);
    layout.bottomPanels = layout.bottomPanels.filter(p => p.uuid !== uuid);
    layout.centerPanels = layout.centerPanels.filter(p => p.uuid !== uuid);
    if (layout.leftSelectedPanel >= layout.leftPanels.length) layout.leftSelectedPanel = layout.leftPanels.length - 1;
    if (layout.rightSelectedPanel >= layout.rightPanels.length) layout.rightSelectedPanel = layout.rightPanels.length - 1;
    if (layout.bottomSelectedPanel >= layout.bottomPanels.length) layout.bottomSelectedPanel = layout.bottomPanels.length - 1;
    if (layout.centerSelectedPanel >= layout.centerPanels.length) layout.centerSelectedPanel = layout.centerPanels.length - 1;
    switch (newSide) {
        case 'left':
            layout.leftPanels.push(panel);
            layout.leftSelectedPanel = layout.leftPanels.length - 1;
            break;
        case 'right':
            layout.rightPanels.push(panel);
            layout.rightSelectedPanel = layout.rightPanels.length - 1;
            break;
        case 'bottom':
            layout.bottomPanels.push(panel);
            layout.bottomSelectedPanel = layout.bottomPanels.length - 1;
            break;
        case 'center':
            layout.centerPanels.push(panel);
            layout.centerSelectedPanel = layout.centerPanels.length - 1;
            break;
    }
}