"use strict";(self.webpackChunksocial_media_api_admin_dashboard=self.webpackChunksocial_media_api_admin_dashboard||[]).push([[557],{5557:function(e,t,n){n.r(t);var a=n(9346),r=n(7374),s=n(3382),i=n(1995),o=n(442),l=n(9216),d=n(4141),u=n(7432),c=n(2186),p=n(401),m=n(8166);t.default=function(){var e,t,n=(0,o.v9)((function(e){return e.auth})),h=(0,o.I0)(),f=(0,l.s0)(),_=(0,l.TH)(),x=(0,i.useState)(""),v=(0,s.Z)(x,2),j=v[0],y=v[1],w=(0,i.useState)(!1),b=(0,s.Z)(w,2),g=b[0],N=b[1],k=function(){N(!1)};return(0,i.useEffect)((function(){var e,t,a=(null===(e=_.state)||void 0===e||null===(t=e.from)||void 0===t?void 0:t.pathname)||"/";return n.token&&n.user&&"userLoaded"===n.status&&f(a,{replace:!0}),function(){}}),[n.token,n.user,f,n.status,null===(e=_.state)||void 0===e||null===(t=e.from)||void 0===t?void 0:t.pathname]),(0,m.jsxs)("div",{className:"app__flex",style:{width:"100%",height:"100vh"},children:["error"===n.status&&(0,m.jsx)("div",{className:"app__error_box",children:(0,m.jsx)("p",{children:n.error})}),(0,m.jsxs)("form",{className:"app__box__form_container",onSubmit:function(e){return h(function(e){return function(){var t=(0,r.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),N(!0),t.next=4,(0,p.yy)(r,j);case 4:k(),"emailSent"===n.status&&f("/auth/reset-password",{replace:!0});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))},children:[(0,m.jsx)(u.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:g,onClick:k,children:(0,m.jsx)(c.Z,{color:"inherit"})}),(0,m.jsx)("p",{className:"title",children:"Forgot your password?"}),(0,m.jsx)("p",{style:{marginBottom:"0.5rem",fontSize:"0.95rem"},children:"Enter your email address and we'll send you an OTP to reset your password."}),(0,m.jsx)("div",{className:"app__form_control",children:(0,m.jsx)("input",{type:"text",placeholder:"Email",name:"email",required:!0,disabled:"sendingEmail"===n.status,value:j,onChange:function(e){return y(e.target.value)}})}),(0,m.jsx)("div",{style:{width:"100%",marginTop:"1rem",display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,m.jsx)(d.OL,{to:"/auth/login",children:(0,m.jsx)("div",{className:"app__text_btn",children:"Login to account"})})}),(0,m.jsx)("div",{style:{width:"100%",marginTop:"2rem"},children:(0,m.jsx)("input",{type:"submit",value:"send otp",disabled:"sendingEmail"===n.status,className:"app__filled_btn app__form_control"})}),(0,m.jsxs)("div",{className:"app__form_control",children:[(0,m.jsx)("span",{children:"Already have an OTP?"}),(0,m.jsx)(d.OL,{to:"/auth/reset-password",children:(0,m.jsx)("div",{className:"app__text_btn",children:"Reset Password"})})]})]})]})}}}]);
//# sourceMappingURL=557.3033d53f.chunk.js.map