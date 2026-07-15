import { PanelLayerHost } from "@/app/panel_layer/PanelLayerHost";
import type
{
    QuestionResultLayeredPanelBindings,
    QuestionResultLayeredPanelPayload,
} from "@/panels/layered/QuestionResultLayeredPanel/QuestionResultLayeredPanelInterface";
import { RoundResultSection } from "@/panels/layered/QuestionResultLayeredPanel/sections/RoundResultSection/RoundResultSection";

type QuestionResultLayeredPanelProps = QuestionResultLayeredPanelPayload & QuestionResultLayeredPanelBindings;

export function QuestionResultLayeredPanel(Props: QuestionResultLayeredPanelProps)
{
    return (
        <PanelLayerHost>
            <div className="layered-panel" role="dialog" aria-modal="true" data-ue-page="QuestionResultLayeredPanel">
                <RoundResultSection Result={Props.Result} IsFinalQuestion={Props.IsFinalQuestion} OnComplete={Props.OnComplete} />
            </div>
        </PanelLayerHost>
    );
}
