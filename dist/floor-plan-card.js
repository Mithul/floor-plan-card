var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, } from "lit";
import { state } from "lit/decorators";
// export class ClockController implements ReactiveController {
//   host: ReactiveControllerHost;
//   value = new Date();
//   timeout: number;
//   private _timerID?: number;
//   constructor(host: ReactiveControllerHost, timeout = 1000) {
//     (this.host = host).addController(this);
//     this.timeout = timeout;
//   }
//   hostConnected() {
//     // Start a timer when the host is connected
//     this._timerID = setInterval(() => {
//       this.value = new Date();
//       // Update the host with new value
//       this.host.requestUpdate();
//     }, this.timeout);
//   }
//   hostDisconnected() {
//     // Clear the timer when the host is disconnected
//     clearInterval(this._timerID);
//     this._timerID = undefined;
//   }
// }
function loadCSS(url) {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}
loadCSS("https://fonts.googleapis.com/css?family=Gloria+Hallelujah");
class FloorPlanCard extends LitElement {
    render() {
        var _this = this;
        const bitmap = this.config.entities.map(function (entity) { return _this.hass.states[entity].state == "on" ? "1" : "0"; }).join("");
        console.log(_this.config);
        return html `
      <ha-card>
        <img src="/local/images/floor_plan_lights/${bitmap}.jpg" class='floor-plan'>
        ${this.config.elements.map((e) => {
            return html `
            <img src='/local/images/bulb-off.png' @click=${() => { console.log('clicked', _this._toggle(e.entity)); }} class='element ${_this.hass.states[e.entity].state}' style='left:${e.style.left};top:${e.style.top}' >
            `;
        })}
      </ha-card>
    `;
    }
    setConfig(config) {
        if (!config.entities) {
            throw new Error("You need to define entities");
        }
        var _this = this;
        this.config = config;
    }
    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 2;
    }
    _toggle(entity_id) {
        this.hass.callService("homeassistant", "toggle", {
            entity_id: entity_id,
        });
    }
    static get styles() {
        return css `
      .floor-plan{
          max-width: 100%;
          max-height: 100%;
        //   position:absolute;
          top:0;
          left:0
      }
      .element{
          cursor: pointer;
          position: absolute;
          transform: translate(-50%, -50%);
          width: 5%;
      }
      .on{
            filter: invert(1);
      }
    `;
    }
}
__decorate([
    state()
], FloorPlanCard.prototype, "_state", void 0);
__decorate([
    state()
], FloorPlanCard.prototype, "config", void 0);
// class ContentCardExample extends LitElement {
//     static get properties() {
//     return {
//       hass: {},
//       config: {},
//     };
//   }
// // 1111101101
// // 0000000
//   render(){
//     const entities = this.config.entities;
//     // const state = hass.states[entityId];
//     // const stateStr = state ? state.state : "unavailable";
//     const bitmap = entities.map(function(entity) {return hass.states[entity].state == "on" ? "1" : "0"}).join("")
//     return html`
//         <p>The state of ${bitmap}!</p>
//       <br><br>
//       <img src="/local/images/floor_plan_lights/${bitmap}.jpg" class='floor-plan' width='400px'>
//     `;
//   }
//   // The user supplied configuration. Throw an exception and Home Assistant
//   // will render an error card.
//   setConfig(config) {
//     if (!config.entities) {
//       throw new Error("You need to define entities");
//     }
//     this.config = config;
//   }
//   // The height of your card. Home Assistant uses this to automatically
//   // distribute all cards over the available columns.
//   getCardSize() {
//     return 3;
//   }
//   _toggle(state) {
//     this.hass.callService("homeassistant", "toggle", {
//       entity_id: state.entity_id,
//     });
//   }
//   static get styles() {
//     return css`
//       .card-content{
//           width: 400px;
//       }
//       img{
//         max-width: 100%;
//         max-height: 100%;
//         object-fit: cover;
//       }
//       p {
//           color:red;
//       }
//     `;
//   }
// }
customElements.define("floor-plan-card", FloorPlanCard);
