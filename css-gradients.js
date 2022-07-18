'use strict';

class ViewController
{
    backgroundModel = null;
    backgroundSizeModel = null;

    backgroundElement = null;
    controllerElement = null;

    constructor(backgroundId, controllerId) {
        this.backgroundElement = document.getElementById(backgroundId);
        this.controllerElement = document.getElementById(controllerId);

        this.backgroundSizeModel = [];
        this.addBackground(0);
    }

    addBackground(id) {
        this.backgroundModel = new Background();

        this.controllerElement.insertAdjacentHTML("beforeend",
            generateControllerViewBackground(id)
        );

        document.getElementById(`BG:${id}_addGradient`).addEventListener("click", () => {
            this.addGradient(id);
        });

        document.getElementById(`BG:${id}_render`).addEventListener("click", () => {
            this.renderBackground()
        });
    }

    removeBackground(id) {}

    addBackgroundSize(parentId) {
        let id = this.backgroundSizeModel.push(new BackgroundSize()) - 1;

        let scaleX = document.getElementById(`BG:${parentId}_GR:${id}_scaleX`);
        scaleX.addEventListener("input", () => {
            this.backgroundSizeModel[id].x = scaleX.value;
            this.renderBackground();
        });

        let scaleY = document.getElementById(`BG:${parentId}_GR:${id}_scaleY`);
        scaleY.addEventListener("input", () => {
            this.backgroundSizeModel[id].y = scaleY.value;
            this.renderBackground();
        });

        let scaleX_toggle = document.getElementById(`BG:${parentId}_GR:${id}_scaleX_toggle`);
        scaleX_toggle.addEventListener("input", () => {
            scaleX.disabled = !scaleX_toggle.checked;
            this.backgroundSizeModel[id].x = scaleX_toggle.checked ? scaleX.value : "";
            this.renderBackground();
        });

        let scaleY_toggle = document.getElementById(`BG:${parentId}_GR:${id}_scaleY_toggle`);
        scaleY_toggle.addEventListener("input", () => {
            scaleY.disabled = !scaleY_toggle.checked;
            this.backgroundSizeModel[id].y = scaleY_toggle.checked ? scaleY.value : "";
            this.renderBackground();
        });
    }

    removeBackgroundSize(id) {}

    addGradient(parentId) {
        let id = this.backgroundModel.gradients.push(new Gradient()) - 1;
        
        document.getElementById(`BG:${parentId}_gradients`).insertAdjacentHTML("beforeend",
            generateControllerViewGradient(parentId, id)
        );

        let type = document.getElementById(`BG:${parentId}_GR:${id}_type`);
        type.addEventListener("input", () => {
            this.backgroundModel.gradients[id].type = type.value;
            this.renderBackground();
        });

        let angle = document.getElementById(`BG:${parentId}_GR:${id}_angle`);
        angle.addEventListener("input", () => {
            this.backgroundModel.gradients[id].angle = angle.value;
            this.renderBackground();
        });

        let offsetX = document.getElementById(`BG:${parentId}_GR:${id}_offsetX`);
        offsetX.addEventListener("input", () => {
            this.backgroundModel.gradients[id].x = offsetX.value;
            this.renderBackground();
        });

        let offsetY = document.getElementById(`BG:${parentId}_GR:${id}_offsetY`);
        offsetY.addEventListener("input", () => {
            this.backgroundModel.gradients[id].y = offsetY.value;
            this.renderBackground();
        });

        let angle_toggle = document.getElementById(`BG:${parentId}_GR:${id}_angle_toggle`);
        angle_toggle.addEventListener("input", () => {
            angle.disabled = !angle_toggle.checked;
            this.backgroundModel.gradients[id].angle = angle_toggle.checked ? angle.value : "";
            this.renderBackground();
        });

        let offsetX_toggle = document.getElementById(`BG:${parentId}_GR:${id}_offsetX_toggle`);
        offsetX_toggle.addEventListener("input", () => {
            offsetX.disabled = !offsetX_toggle.checked;
            this.backgroundModel.gradients[id].x = offsetX_toggle.checked ? offsetX.value : "";
            this.renderBackground();
        });

        let offsetY_toggle = document.getElementById(`BG:${parentId}_GR:${id}_offsetY_toggle`);
        offsetY_toggle.addEventListener("input", () => {
            offsetY.disabled = !offsetY_toggle.checked;
            this.backgroundModel.gradients[id].y = offsetY_toggle.checked ? offsetY.value : "";
            this.renderBackground();
        });

        let addColorStop = document.getElementById(`BG:${parentId}_GR:${id}_addColorStop`);
        addColorStop.addEventListener("click", () => this.addColorStop(parentId, id));
        
        this.addBackgroundSize(parentId);
    }

    removeGradient(id) {}

    addColorStop(grandParentId, parentId) {
        let id = this.backgroundModel.gradients[parentId].colorStops.push(new ColorStop()) - 1;

        document.getElementById(`BG:${grandParentId}_GR:${parentId}_colorStops`).insertAdjacentHTML("beforeend",
            generateControllerViewColorStop(grandParentId, parentId, id)
        );

        let color = document.getElementById(`BG:${grandParentId}_GR:${parentId}_CS:${id}_color`);
        color.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].color = color.value;
            this.renderBackground();
        });

        let color_transparency = document.getElementById(`BG:${grandParentId}_GR:${parentId}_CS:${id}_color_transparency`);
        color_transparency.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].color
                = (color_transparency.checked) ? "transparent" : color.value;
            this.renderBackground();
        });
        
        let pos1 = document.getElementById(`BG:${grandParentId}_GR:${parentId}_CS:${id}_pos1`);
        pos1.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].pos1 = pos1.value;
            this.renderBackground();
        });
        
        let pos2 = document.getElementById(`BG:${grandParentId}_GR:${parentId}_CS:${id}_pos2`);
        pos2.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].pos2 = pos2.value;
            this.renderBackground();
        });

        let pos1_toggle = document.getElementById(`BG:${grandParentId}_GR:${parentId}_CS:${id}_pos1_toggle`);
        pos1_toggle.addEventListener("input", () => {
            pos1.disabled = !pos1_toggle.checked;
            this.backgroundModel.gradients[parentId].colorStops[id].pos1 = pos1_toggle.checked ? pos1.value : "";
            this.renderBackground();
        });
        
        let pos2_toggle = document.getElementById(`BG:${grandParentId}_GR:${parentId}_CS:${id}_pos2_toggle`);
        pos2_toggle.addEventListener("input", () => {
            pos2.disabled = !pos2_toggle.checked;
            this.backgroundModel.gradients[parentId].colorStops[id].pos2 = pos2_toggle.checked ? pos2.value : "";
            this.renderBackground();
        });
    }

    removeColorStop(id) {}

    renderBackground() {
        console.log(this.backgroundModel.toString());
        this.backgroundElement.style.background = this.backgroundModel.toString();

        // Get BackgroundSize CSS string
        let bgSize = "";
        for (const [i, v] of this.backgroundSizeModel.entries()) {
            bgSize += v.toString();
            if (i !== this.backgroundSizeModel.length - 1) bgSize += ", ";
        }

        console.log(bgSize);
        this.backgroundElement.style.backgroundSize = bgSize;
    }

}


class BackgroundSize
{
    _x = null;
    get x() {
        return (this._x !== "") ? this._x + "%" : this._x;
    }
    set x(value) {this._x = value;}

    _y = null;
    get y() {
        return (this._y !== "") ? this._y + "%" : this._y;
    }
    set y(value) {this._y = value;}

    constructor(x = 100, y = 100) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x} ${this.y}`;
    }
}

class Background
{
    gradients = null;

    constructor() {
        this.gradients = [];
    }

    toString() {
        let value = "";

        for (const [i, v] of this.gradients.entries()) {
            value += v.toString();
            if (i !== this.gradients.length - 1) value += ", ";
        }
        return value;
    }
}

class Gradient
{
    colorStops = null;
    type = null;
    
    _angle = null;
    get angle() {
        return (this._angle !== "") ? this._angle + "deg" : this._angle;
    }
    set angle(value) {this._angle = value;}
    
    _x = null;
    get x() {
        return (this._x !== "") ? this._x + "px" : this._x;
    }
    set x(value) {this._x = value;}

    _y = null;
    get y() {
        return (this._y !== "") ? this._y + "px" : this._y;
    }
    set y(value) {this._y = value;}

    constructor(type = "linear", angle = 0, x = 0, y = 0) {
        this.colorStops = [];
        this.type = type;
        this.angle = angle;
        this.x = x;
        this.y = y;
    }

    toString() {
        let value = `${this.type}-gradient(${this.angle}`;
        if (this.angle !== "") value += ", ";

        for (const [i, v] of this.colorStops.entries()) {
            value += v.toString();
            if (i !== this.colorStops.length - 1) value += ", ";
        }
        return value + `) ${this.x} ${this.y}`;
    }
}

class ColorStop
{
    _color = null;
    get color() { return this._color; }
    set color(value) { this._color = value;}
    
    _pos1 = null;
    get pos1() {
        return (this._pos1 !== "") ? this._pos1 + "%" : this._pos1;
    }
    set pos1(value) {this._pos1 = value;}
    
    _pos2 = null;
    get pos2() {
        return (this._pos2 !== "") ? this._pos2 + "%" : this._pos2;
    }
    set pos2(value) {this._pos2 = value;}

    constructor(color = "Black", pos1 = 0, pos2 = 0) {
        this.color = color;
        this.pos1 = pos1;
        this.pos2 = pos2;
    }

    toString() {
        return `${this.color} ${this.pos1} ${this.pos2}`;
    }
}


function generateControllerViewBackground(BG_id) {
    return `
    <div id="BG:${BG_id}_gradients" class="container box"></div>
    <button id="BG:${BG_id}_addGradient" class="btn btn-success">+</button>
    <button id="BG:${BG_id}_render" class="btn btn-success">Render</button>
    `;
}

function generateControllerViewGradient(BG_id, GR_id) {
    return `
    <div id="BG:${BG_id}_GR:${GR_id}" class="row box">
        <div class="col box">
            <div class="row box">
                <button id="BG:${BG_id}_GR:${GR_id}_moveUp" class="btn btn-outline-secondary">△</button>
            </div>
            <div class="row box">
                <button id="BG:${BG_id}_GR:${GR_id}_delete" class="btn btn-outline-danger">X</button>
            </div>
            <div class="row box">
                <button id="BG:${BG_id}_GR:${GR_id}_moveDown" class="btn btn-outline-secondary">▽</button>
            </div>
        </div>

        <div class="col-11 box">
            <div class="row box">
                <div class="col-2 box">
                    <label for="BG:${BG_id}_GR:${GR_id}_type">Type</label>
                    <select id="BG:${BG_id}_GR:${GR_id}_type">
                        <option value="linear">linear</option>
                        <option value="radial">radial</option>
                        <option value="conic">conic</option>
                        <option value="repeating-linear">repeating-linear</option>
                        <option value="repeating-radial">repeating-radial</option>
                    </select>
                    <br>
                    <label for="BG:${BG_id}_GR:${GR_id}_angle">Angle</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_angle_toggle" class="form-check-input" checked="">
                        <input type="range" id="BG:${BG_id}_GR:${GR_id}_angle" class="form-range" value="0" min="0" max="360" step="1">
                    </div>
                </div>
                <div class="col box">
                    <label for="BG:${BG_id}_GR:${GR_id}_offsetX">X-Offset</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_offsetX_toggle" class="form-check-input" checked="">
                        <input type="range" id="BG:${BG_id}_GR:${GR_id}_offsetX" class="form-range" value="0" min="0" max="500" step="1">
                    </div>
                    <label for="BG:${BG_id}_GR:${GR_id}_offsetY">Y-Offset</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_offsetY_toggle" class="form-check-input" checked="">
                        <input type="range" id="BG:${BG_id}_GR:${GR_id}_offsetY" class="form-range" value="0" min="0" max="500" step="1">
                    </div>
                </div>
                <div class="col box">
                    <label for="BG:${BG_id}_GR:${GR_id}_scaleX">X-Scale</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_scaleX_toggle" class="form-check-input" checked="">
                        <input type="range" id="BG:${BG_id}_GR:${GR_id}_scaleX" class="form-range" value="100" min="0" max="100" step="1">
                    </div>
                    <label for="BG:${BG_id}_GR:${GR_id}_scaleY">Y-Scale</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_scaleY_toggle" class="form-check-input" checked="">
                        <input type="range" id="BG:${BG_id}_GR:${GR_id}_scaleY" class="form-range" value="100" min="0" max="100" step="1">
                    </div>
                </div>
            </div>
            <div class="row box">
                <div id="BG:${BG_id}_GR:${GR_id}_colorStops" class="container box">
                </div>
            </div>
        </div>
    </div>

    <button id="BG:${BG_id}_GR:${GR_id}_addColorStop" class="btn btn-success">+</button>
    `;
}

function generateControllerViewColorStop(BG_id, GR_id, CS_id) {
    return `
    <div id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}" class="row box">
    <div class="col box">
        <div class="row box">
            <button id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_moveUp" class="btn btn-outline-secondary">△</button>
        </div>
        <div class="row box">
            <button id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_delete" class="btn btn-outline-danger">X</button>
        </div>
        <div class="row box">
            <button id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_moveDown" class="btn btn-outline-secondary">▽</button>
        </div>
    </div>
    <div class="col-2 box">
        <div class="row box">
            <div class="col box">
                <label for="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_color">Color</label>
            </div>
            <div class="col box">
                <label for="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_color_transparency">Transparency</label>
            </div>
        </div>
        <div class="row box">
            <div class="col box">
                <div class="form-check form-switch">
                    <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_color_toggle" class="form-check-input" checked="">
                    <input type="color" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_color">
                </div>
            </div>
            <div class="col box">
                <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_color_transparency" class="form-check-input">
            </div>
        </div>
    </div>
    <div class="col-9 box">
        <label for="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_pos1">Pos-1</label>
        <div class="form-check form-switch">
            <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_pos1_toggle" class="form-check-input" checked="">
            <input type="range" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_pos1" class="form-range" value="0" min="0" max="100" step="1">
        </div>
        <label for="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_pos2">Pos-2</label>
        <div class="form-check form-switch">
            <input type="checkbox" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_pos2_toggle" class="form-check-input" checked="">
            <input type="range" id="BG:${BG_id}_GR:${GR_id}_CS:${CS_id}_pos2" class="form-range" value="0" min="0" max="100" step="1">
        </div>
    </div>
    </div>
    `;
}
