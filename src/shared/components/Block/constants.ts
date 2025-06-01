export const enum BLOCK_EVENTS {
  INIT = 'init',
  FLOW_CDR = 'flow:component-did-render',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CWU = 'flow:component-will-unmount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}
