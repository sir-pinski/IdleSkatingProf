import {BaseLayer, createLayer} from "../game/layers";
import {createResource} from "../features/resources/resource";
import Decimal, {DecimalSource} from "../lib/break_eternity";
import MainDisplay from "../features/resources/MainDisplay.vue";

const id = "Practice";
const layer = createLayer(id, function (this: BaseLayer) {
    const PracticePoints = createResource<DecimalSource>(0, "Practice Points")
    this.on("update", diff => {
        PracticePoints.value = Decimal.add(PracticePoints.value, diff);
    });
    return {
        display: jsx(() => (
            <>
                <MainDisplay resource={PracticePoints} />
            </>
        ))
    };
});
