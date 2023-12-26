import {BaseLayer, createLayer} from "../game/layers";

const id = "Practice";
const layer = createLayer(id, function (this: BaseLayer) {
    return {
        display: jsx(() => <>Practice Layer</>)
    };
});