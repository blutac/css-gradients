'use strict';

class ViewController
{
    backgroundModel = null;
    backgroundSizeModel = null;

    backgroundElement = null;
    controllerElement = null;

    // have these implicitly defined via id string for consistency?
    gradientListView = null;
    addGradientButton = null;

    constructor(backgroundId, controllerId) {
        this.backgroundElement = document.getElementById(backgroundId);
        this.controllerElement = document.getElementById(controllerId);

        this.backgroundSizeModel = [];
        this.addBackground();
    }

    addBackground() {
        this.backgroundModel = new Background();

        // Create gradient list view container
        this.gradientListView = document.createElement("div");
        this.gradientListView.id = this.backgroundElement.id + "_gradientListView";
        this.controllerElement.append(this.gradientListView);

        // Create gradient list view adder button
        this.gradientListView_button = document.createElement("button");
        this.gradientListView_button.id = this.backgroundElement.id + "_addGradientButton";
        this.gradientListView_button.innerHTML = "+";
        this.gradientListView_button.addEventListener("click", () => {
            this.addGradient(this.gradientListView.id);
            this.addBackgroundSize(this.gradientListView.id);
        });
        this.controllerElement.append(this.gradientListView_button);

        // Add Manual Render Button
        this.renderButton = document.createElement("button");
        this.renderButton.innerHTML = "Render";
        this.renderButton.addEventListener("click", () => this.renderBackground());
        this.controllerElement.append(this.renderButton);
    }
    // removeBackground() {}

    addBackgroundSize(parentId) {
        let id = this.backgroundSizeModel.push(new BackgroundSize()) - 1;

        // Get Gradient Container
        let gradient = document.getElementById(`${parentId}-G${id}`);

        // Gradient Scale-X
        let scaleX = document.createElement("input");
        scaleX.id = gradient.id + "_scaleX";
        scaleX.type = "range";
        scaleX.min = 0;
        scaleX.max = 1000;
        scaleX.value = 0;
        scaleX.addEventListener("input", () => {
            this.backgroundSizeModel[id].x = scaleX.value;
            this.renderBackground();
        });
        
        let scaleX_label = document.createElement("label");
        scaleX_label.htmlFor = scaleX.id;
        scaleX_label.innerText = "scale X:";

        // Gradient Scale-Y
        let scaleY = document.createElement("input");
        scaleY.id = gradient.id + "_scaleY";
        scaleY.type = "range";
        scaleY.min = 0;
        scaleY.max = 1000;
        scaleY.value = 0;
        scaleY.addEventListener("input", () => {
            this.backgroundSizeModel[id].y = scaleY.value;
            this.renderBackground();
        });
        
        let scaleY_label = document.createElement("label");
        scaleY_label.htmlFor = scaleY.id;
        scaleY_label.innerText = "scale Y:";

        gradient.append(scaleX_label);
        gradient.append(scaleX);
        gradient.append(scaleY_label);
        gradient.append(scaleY);
    }

    removeBackgroundSize(id) {}

    addGradient(parentId) {
        let id = this.backgroundModel.gradients.push(new Gradient()) - 1;

        // Gradient Container
        let gradient = document.createElement("div");
        gradient.id = `${parentId}-G${id}`;

        // Gradient Type
        let type = document.createElement("select");
        type.id = gradient.id + "_type";
        type.addEventListener("input", () => {
            this.backgroundModel.gradients[id].type = type.value;
            this.renderBackground();
        });
        
        let options = ["linear", "radial", "conic", "repeating-linear", "repeating-radial"];
        for (const option of options) {
            let type_option = document.createElement("option");
            type_option.value = option;
            type_option.innerText = option;
            type.append(type_option);
        }

        let type_label = document.createElement("label");
        type_label.htmlFor = type.id;
        type_label.innerText = "type:";

        // Gradient Angle
        let angle = document.createElement("input");
        angle.id = gradient.id + "_angle";
        angle.type = "range";
        angle.min = 0;
        angle.max = 360;
        angle.value = 0;
        angle.addEventListener("input", () => {
            this.backgroundModel.gradients[id].angle = angle.value;
            this.renderBackground();
        });

        let angle_label = document.createElement("label");
        angle_label.htmlFor = angle.id;
        angle_label.innerText = "angle:";

        // Gradient Offset-X
        let offsetX = document.createElement("input");
        offsetX.id = gradient.id + "_offsetX";
        offsetX.type = "range";
        offsetX.min = 0;
        offsetX.max = 1000;
        offsetX.value = 0;
        offsetX.addEventListener("input", () => {
            this.backgroundModel.gradients[id].x = offsetX.value;
            this.renderBackground();
        });
        
        let offsetX_label = document.createElement("label");
        offsetX_label.htmlFor = offsetX.id;
        offsetX_label.innerText = "offset X:";

        // Gradient Offset-Y
        let offsetY = document.createElement("input");
        offsetY.id = gradient.id + "_offsetY";
        offsetY.type = "range";
        offsetY.min = 0;
        offsetY.max = 1000;
        offsetY.value = 0;
        offsetY.addEventListener("input", () => {
            this.backgroundModel.gradients[id].y = offsetY.value;
            this.renderBackground();
        });
        
        let offsetY_label = document.createElement("label");
        offsetY_label.htmlFor = offsetY.id;
        offsetY_label.innerText = "offset Y:";
        
        // Gradient ColorStops list view container
        let colorStopListView = document.createElement("div");
        colorStopListView.id = gradient.id + "_colorStopListView";
        
        // Gradient ColorStops list view adder button
        let colorStopListView_button = document.createElement("button");
        colorStopListView_button.id = gradient.id + "_addColorStopButton";
        colorStopListView_button.innerText = "+";
        colorStopListView_button.addEventListener("click", () => this.addColorStop(id));

        // Populate gradient view container
        gradient.append(type_label);
        gradient.append(type);
        gradient.append(angle_label);
        gradient.append(angle);
        gradient.append(offsetX_label);
        gradient.append(offsetX);
        gradient.append(offsetY_label);
        gradient.append(offsetY);
        gradient.append(colorStopListView);
        gradient.append(colorStopListView_button);

        this.gradientListView.append(gradient);
    }
    
    removeGradient(id) {}

    addColorStop(parentId) {
        let id = this.backgroundModel.gradients[parentId].colorStops.push(new ColorStop()) - 1;

        // ColorStop Container
        let colorStop = document.createElement("div");
        colorStop.id = `${this.gradientListView.id}-G${parentId}-CS${id}`; // pull in gradientListView.id correctly

        // ColorStop Color
        // add radio/checkbox for transparent option
        let color = document.createElement("input");
        color.id = colorStop.id + "_color";
        color.type = "color";
        color.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].color = color.value;
            this.renderBackground();
        });

        let color_label = document.createElement("label");
        color_label.htmlFor = color.id;
        color_label.innerText = "color:";

        // ColorStop Pos1
        let pos1 = document.createElement("input");
        pos1.id = colorStop.id + "_pos1";
        pos1.type = "range";
        pos1.value = 0;
        pos1.min = 0;
        pos1.max = 100;
        pos1.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].pos1 = pos1.value;
            this.renderBackground();
        });

        let pos1_label = document.createElement("label");
        pos1_label.htmlFor = pos1.id;
        pos1_label.innerText = "pos1:";

        // ColorStop Pos2
        let pos2 = document.createElement("input");
        pos2.id = colorStop.id + "_pos2";
        pos2.type = "range";
        pos2.value = 0;
        pos2.min = 0;
        pos2.max = 100;
        pos2.addEventListener("input", () => {
            this.backgroundModel.gradients[parentId].colorStops[id].pos2 = pos2.value;
            this.renderBackground();
        });

        let pos2_label = document.createElement("label");
        pos2_label.htmlFor = pos2.id;
        pos2_label.innerText = "pos2:";

        // Populate gradient view container
        colorStop.append(color_label);
        colorStop.append(color);
        colorStop.append(pos1_label);
        colorStop.append(pos1);
        colorStop.append(pos2_label);
        colorStop.append(pos2);

        let colorStopListView = document.getElementById(`${this.gradientListView.id}-G${parentId}_colorStopListView`); // TODO: pull in gradientListView.id correctly
        colorStopListView.append(colorStop);
    }
    
    removeColorStop(id) {}

    renderBackground() {
        console.log(this.backgroundModel.toString());
        this.backgroundElement.style.background = this.backgroundModel.toString();

        // Get BackgroundSize CSS string
        let bgSize = "";
        for (const [i, v] of this.backgroundSizeModel.entries()) {
            bgSize += v.toString();
            if (i !== this.backgroundSizeModel.length - 1) bgSize += ",";
        }

        console.log(bgSize);
        this.backgroundElement.style.backgroundSize = bgSize;
    }

}

class BackgroundSize
{
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

    constructor(x = "", y = "") {
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
            if (i !== this.gradients.length - 1) value += ",";
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

    constructor(type = "linear", angle = 0, x = "", y = "") {
        this.colorStops = [];
        this.type = type;
        this.angle = angle;
        this.x = x;
        this.y = y;
    }

    toString() {
        let value = `${this.type}-gradient(${this.angle}`;
        if (this.angle !== "") value += ",";

        for (const [i, v] of this.colorStops.entries()) {
            value += v.toString();
            if (i !== this.colorStops.length - 1) value += ",";
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

    constructor(color = "Black", pos1 = "", pos2 = "") {
        this.color = color;
        this.pos1 = pos1;
        this.pos2 = pos2;
    }

    toString() {
        return `${this.color} ${this.pos1} ${this.pos2}`;
    }
}
