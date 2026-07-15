import type { PropsWithChildren } from "react";

export function PanelLayerHost(Props: PropsWithChildren)
{
    return <div className="panel-layer-host"><div className="panel-backdrop" />{Props.children}</div>;
}
