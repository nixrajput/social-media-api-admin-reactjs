"use strict";(self.webpackChunksocial_api_admin_dashboard=self.webpackChunksocial_api_admin_dashboard||[]).push([[960],{28960:function(o,e,a){a.r(e);var t=a(11995),n=a(98992),i=a(49216),r=a(78166);e.default=function(){var o=(0,i.s0)();return(0,t.useEffect)((function(){return document.title="Not Found",function(){}}),[]),(0,r.jsxs)("div",{className:"app__flex",style:{width:"100%",height:"100vh"},children:[(0,r.jsx)("div",{children:"Page Not Found!"}),(0,r.jsx)(n.Z,{variant:"text",color:"secondary",sx:{marginTop:"4px"},onClick:function(){return o("/")},children:"Go to Home"})]})}},7667:function(o,e,a){var t=a(11995).createContext({});e.Z=t},98992:function(o,e,a){var t=a(67519),n=a(87075),i=a(24250),r=a(11995),c=a(74663),l=a(84383),d=a(53079),s=a(13527),p=a(62352),u=a(22570),v=a(84320),h=a(64626),m=a(58812),b=a(7667),x=a(78166),f=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],g=function(o){return(0,i.Z)({},"small"===o.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===o.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===o.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},S=(0,p.ZP)(v.Z,{shouldForwardProp:function(o){return(0,p.FO)(o)||"classes"===o},name:"MuiButton",slot:"Root",overridesResolver:function(o,e){var a=o.ownerState;return[e.root,e[a.variant],e["".concat(a.variant).concat((0,h.Z)(a.color))],e["size".concat((0,h.Z)(a.size))],e["".concat(a.variant,"Size").concat((0,h.Z)(a.size))],"inherit"===a.color&&e.colorInherit,a.disableElevation&&e.disableElevation,a.fullWidth&&e.fullWidth]}})((function(o){var e,a,n,r=o.theme,c=o.ownerState;return(0,i.Z)({},r.typography.button,(e={minWidth:64,padding:"6px 16px",borderRadius:(r.vars||r).shape.borderRadius,transition:r.transitions.create(["background-color","box-shadow","border-color","color"],{duration:r.transitions.duration.short}),"&:hover":(0,i.Z)({textDecoration:"none",backgroundColor:r.vars?"rgba(".concat(r.vars.palette.text.primaryChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):(0,s.Fq)(r.palette.text.primary,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===c.variant&&"inherit"!==c.color&&{backgroundColor:r.vars?"rgba(".concat(r.vars.palette[c.color].mainChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):(0,s.Fq)(r.palette[c.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===c.variant&&"inherit"!==c.color&&{border:"1px solid ".concat((r.vars||r).palette[c.color].main),backgroundColor:r.vars?"rgba(".concat(r.vars.palette[c.color].mainChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):(0,s.Fq)(r.palette[c.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===c.variant&&{backgroundColor:(r.vars||r).palette.grey.A100,boxShadow:(r.vars||r).shadows[4],"@media (hover: none)":{boxShadow:(r.vars||r).shadows[2],backgroundColor:(r.vars||r).palette.grey[300]}},"contained"===c.variant&&"inherit"!==c.color&&{backgroundColor:(r.vars||r).palette[c.color].dark,"@media (hover: none)":{backgroundColor:(r.vars||r).palette[c.color].main}}),"&:active":(0,i.Z)({},"contained"===c.variant&&{boxShadow:(r.vars||r).shadows[8]})},(0,t.Z)(e,"&.".concat(m.Z.focusVisible),(0,i.Z)({},"contained"===c.variant&&{boxShadow:(r.vars||r).shadows[6]})),(0,t.Z)(e,"&.".concat(m.Z.disabled),(0,i.Z)({color:(r.vars||r).palette.action.disabled},"outlined"===c.variant&&{border:"1px solid ".concat((r.vars||r).palette.action.disabledBackground)},"outlined"===c.variant&&"secondary"===c.color&&{border:"1px solid ".concat((r.vars||r).palette.action.disabled)},"contained"===c.variant&&{color:(r.vars||r).palette.action.disabled,boxShadow:(r.vars||r).shadows[0],backgroundColor:(r.vars||r).palette.action.disabledBackground})),e),"text"===c.variant&&{padding:"6px 8px"},"text"===c.variant&&"inherit"!==c.color&&{color:(r.vars||r).palette[c.color].main},"outlined"===c.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===c.variant&&"inherit"!==c.color&&{color:(r.vars||r).palette[c.color].main,border:r.vars?"1px solid rgba(".concat(r.vars.palette[c.color].mainChannel," / 0.5)"):"1px solid ".concat((0,s.Fq)(r.palette[c.color].main,.5))},"contained"===c.variant&&{color:r.vars?r.vars.palette.text.primary:null==(a=(n=r.palette).getContrastText)?void 0:a.call(n,r.palette.grey[300]),backgroundColor:(r.vars||r).palette.grey[300],boxShadow:(r.vars||r).shadows[2]},"contained"===c.variant&&"inherit"!==c.color&&{color:(r.vars||r).palette[c.color].contrastText,backgroundColor:(r.vars||r).palette[c.color].main},"inherit"===c.color&&{color:"inherit",borderColor:"currentColor"},"small"===c.size&&"text"===c.variant&&{padding:"4px 5px",fontSize:r.typography.pxToRem(13)},"large"===c.size&&"text"===c.variant&&{padding:"8px 11px",fontSize:r.typography.pxToRem(15)},"small"===c.size&&"outlined"===c.variant&&{padding:"3px 9px",fontSize:r.typography.pxToRem(13)},"large"===c.size&&"outlined"===c.variant&&{padding:"7px 21px",fontSize:r.typography.pxToRem(15)},"small"===c.size&&"contained"===c.variant&&{padding:"4px 10px",fontSize:r.typography.pxToRem(13)},"large"===c.size&&"contained"===c.variant&&{padding:"8px 22px",fontSize:r.typography.pxToRem(15)},c.fullWidth&&{width:"100%"})}),(function(o){var e;return o.ownerState.disableElevation&&(e={boxShadow:"none","&:hover":{boxShadow:"none"}},(0,t.Z)(e,"&.".concat(m.Z.focusVisible),{boxShadow:"none"}),(0,t.Z)(e,"&:active",{boxShadow:"none"}),(0,t.Z)(e,"&.".concat(m.Z.disabled),{boxShadow:"none"}),e)})),z=(0,p.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(o,e){var a=o.ownerState;return[e.startIcon,e["iconSize".concat((0,h.Z)(a.size))]]}})((function(o){var e=o.ownerState;return(0,i.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===e.size&&{marginLeft:-2},g(e))})),Z=(0,p.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(o,e){var a=o.ownerState;return[e.endIcon,e["iconSize".concat((0,h.Z)(a.size))]]}})((function(o){var e=o.ownerState;return(0,i.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===e.size&&{marginRight:-2},g(e))})),y=r.forwardRef((function(o,e){var a=r.useContext(b.Z),t=(0,l.Z)(a,o),s=(0,u.Z)({props:t,name:"MuiButton"}),p=s.children,v=s.color,g=void 0===v?"primary":v,y=s.component,w=void 0===y?"button":y,C=s.className,I=s.disabled,k=void 0!==I&&I,R=s.disableElevation,E=void 0!==R&&R,F=s.disableFocusRipple,W=void 0!==F&&F,N=s.endIcon,M=s.focusVisibleClassName,T=s.fullWidth,B=void 0!==T&&T,L=s.size,P=void 0===L?"medium":L,_=s.startIcon,O=s.type,V=s.variant,j=void 0===V?"text":V,q=(0,n.Z)(s,f),A=(0,i.Z)({},s,{color:g,component:w,disabled:k,disableElevation:E,disableFocusRipple:W,fullWidth:B,size:P,type:O,variant:j}),D=function(o){var e=o.color,a=o.disableElevation,t=o.fullWidth,n=o.size,r=o.variant,c=o.classes,l={root:["root",r,"".concat(r).concat((0,h.Z)(e)),"size".concat((0,h.Z)(n)),"".concat(r,"Size").concat((0,h.Z)(n)),"inherit"===e&&"colorInherit",a&&"disableElevation",t&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,h.Z)(n))],endIcon:["endIcon","iconSize".concat((0,h.Z)(n))]},s=(0,d.Z)(l,m.F,c);return(0,i.Z)({},c,s)}(A),G=_&&(0,x.jsx)(z,{className:D.startIcon,ownerState:A,children:_}),H=N&&(0,x.jsx)(Z,{className:D.endIcon,ownerState:A,children:N});return(0,x.jsxs)(S,(0,i.Z)({ownerState:A,className:(0,c.Z)(a.className,D.root,C),component:w,disabled:k,focusRipple:!W,focusVisibleClassName:(0,c.Z)(D.focusVisible,M),ref:e,type:O},q,{classes:D,children:[G,p,H]}))}));e.Z=y},58812:function(o,e,a){a.d(e,{F:function(){return i}});var t=a(21086),n=a(18787);function i(o){return(0,n.Z)("MuiButton",o)}var r=(0,t.Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);e.Z=r}}]);
//# sourceMappingURL=960.d8a9f6cd.chunk.js.map