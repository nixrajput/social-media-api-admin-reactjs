"use strict";(self.webpackChunksocial_api_admin_dashboard=self.webpackChunksocial_api_admin_dashboard||[]).push([[820],{33448:function(e,t,n){var r=n(36283),i=n(99431),o=n(30475),s=n(70811),a=n(78166);t.Z=function(e){var t=e.title,n=e.subtitle,l=(0,r.Z)(),c=(0,s.TV)(l.palette.mode);return(0,a.jsxs)(i.Z,{mb:"30px",children:[(0,a.jsx)(o.Z,{variant:"h2",color:c.grey[100],fontWeight:"bold",sx:{m:"0 0 5px 0"},children:t}),(0,a.jsx)(o.Z,{variant:"h5",color:c.greenAccent[400],children:n})]})}},7942:function(e,t,n){n(11995);var r=n(78166);t.Z=function(e){var t=e.avatar,n=e.size,i=void 0===n?"40px":n,o=e.fit,s={width:i,height:i,borderRadius:"50%",objectFit:void 0===o?"cover":o};return t&&t.url?(0,r.jsx)("div",{style:s,children:(0,r.jsx)("img",{src:t.url,style:s,alt:"avatar",width:i,height:i})}):(0,r.jsx)("div",{style:s,children:(0,r.jsx)("img",{src:"../../avatar.png",style:s,alt:"avatar",width:i,height:i})})}},38732:function(e,t,n){var r=n(79346),i=n(17374),o=n(61637),s=n(11995),a=n(36283),l=n(99431),c=n(26965),d=n(442),u=n(70811),x=n(68447),f=n(96560),h=n(82822),p=n(99028),g=n(90844),m=n(59688),v=n(32732),j=n(63447),Z=n(78166);t.Z=function(){var e=(0,a.Z)(),t=(0,u.TV)(e.palette.mode),n=(0,s.useContext)(u.kc),y=(0,d.v9)((function(e){return e.auth})),w=(0,d.I0)(),b=(0,s.useState)(!1),C=(0,o.Z)(b,2),S=C[0],k=C[1],M=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,j.Cd)(w),e.next=3,t;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,s.useEffect)((function(){return window.addEventListener("scroll",(function(){window.scrollY>40?k(!0):k(!1)})),function(){window.removeEventListener("scroll",(function(){}))}}),[]),(0,Z.jsxs)(l.Z,{position:"fixed",top:"0",left:"0",right:"0",height:{xs:"80px",sm:"80px",md:"80px",lg:"80px"},bgcolor:t.background,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",p:2,m:"0",zIndex:"100",boxShadow:S?"10px 0 10px 20px rgba(0,0,0,0.1)":"none",children:[(0,Z.jsx)(l.Z,{display:"flex",alignItems:"center",justifyContent:"center",children:(0,Z.jsx)("img",{alt:"logo",width:"auto",height:"48px",src:"../../logo.png"})}),"authenticated"===y.status?(0,Z.jsxs)(l.Z,{display:"flex",backgroundColor:t.primary[400],borderRadius:"4px",height:{xs:"40px",sm:"40px",md:"40px",lg:"40px"},children:[(0,Z.jsx)(x.ZP,{sx:{ml:2,flex:1},placeholder:"Search"}),(0,Z.jsx)(c.Z,{type:"button",sx:{p:1},children:(0,Z.jsx)(v.Z,{})})]}):null,(0,Z.jsxs)(l.Z,{display:"flex",children:[(0,Z.jsx)(c.Z,{onClick:n.toggleColorMode,children:"dark"===e.palette.mode?(0,Z.jsx)(h.Z,{}):(0,Z.jsx)(f.Z,{})}),"authenticated"===y.status?(0,Z.jsx)(c.Z,{children:(0,Z.jsx)(p.Z,{})}):null,"authenticated"===y.status?(0,Z.jsx)(c.Z,{children:(0,Z.jsx)(g.Z,{})}):null,"authenticated"===y.status?(0,Z.jsx)(c.Z,{onClick:M,children:(0,Z.jsx)(m.Z,{})}):null]})]})}},37885:function(e,t,n){n.d(t,{Z:function(){return z}});var r=n(87643),i=n(38732),o=n(61637),s=n(11995),a=n(45940),l=n(36283),c=n(30475),d=n(99431),u=n(26965),x=n(49216),f=n(442),h=n(70811),p=n(65499),g=n(34718),m=n(69241),v=n(43615),j=n(59688),Z=n(79894),y=n(90270),w=n(68022),b=n(43516),C=n(17150),S=n(32386),k=n(63698),M=n(30091),D=n(7942),A=n(78166),P=function(e){var t=e.title,n=e.to,r=e.icon,i=e.selected,o=e.setSelected,s=(0,l.Z)(),d=(0,h.TV)(s.palette.mode),u=(0,x.s0)();return(0,A.jsx)(a.sN,{active:i===t,style:{color:d.grey[100]},onClick:function(){o(t),u(n)},icon:r,children:(0,A.jsx)(c.Z,{children:t})})},I=function(){var e,t,n,r,i=(0,l.Z)(),x=(0,h.TV)(i.palette.mode),I=(0,f.v9)((function(e){return e.profileDetails})),z=(0,s.useState)(!1),E=(0,o.Z)(z,2),F=E[0],N=E[1],T=(0,s.useState)("Dashboard"),_=(0,o.Z)(T,2),L=_[0],W=_[1];return(0,s.useEffect)((function(){return window.addEventListener("load",(function(){window.innerWidth<=980?N(!0):N(!1)})),window.addEventListener("resize",(function(){window.innerWidth<=980?N(!0):N(!1)})),function(){window.removeEventListener("load",(function(){})),window.removeEventListener("resize",(function(){}))}}),[]),(0,A.jsx)(d.Z,{sx:{"& .sidebar-inner":{background:"".concat(x.primary[400]," !important")},"& .menu-anchor":{background:"transparent !important",color:"inherit !important"},"& .menu-item:hover":{color:"#868dfb !important"},"& .menu-item.active":{color:"#6870fa !important"}},children:(0,A.jsx)(a.YE,{collapsed:F,children:(0,A.jsxs)(a.v2,{children:[F?null:(0,A.jsxs)(d.Z,{m:"20px 0",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,A.jsx)(D.Z,{avatar:null===(e=I.user)||void 0===e?void 0:e.avatar,size:"100px"}),(0,A.jsxs)(d.Z,{textAlign:"center",children:[(0,A.jsx)(c.Z,{variant:"h3",color:x.grey[100],fontWeight:"bold",sx:{m:"10px 0 0 0"},children:(null===(t=I.user)||void 0===t?void 0:t.fname)+" "+(null===(n=I.user)||void 0===n?void 0:n.lname)}),(0,A.jsx)(c.Z,{variant:"h5",color:x.greenAccent[500],children:"@"+(null===(r=I.user)||void 0===r?void 0:r.uname)})]})]}),(0,A.jsxs)(d.Z,{paddingLeft:F?void 0:"5%",children:[(0,A.jsx)(P,{title:"Dashboard",to:"/",icon:(0,A.jsx)(p.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(c.Z,{variant:"h6",color:x.grey[300],sx:{m:"15px 0 5px 20px"},children:"Data"}),(0,A.jsx)(P,{title:"Manage Users",to:"/users",icon:(0,A.jsx)(g.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"Manage Posts",to:"/posts",icon:(0,A.jsx)(m.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"Manage Comments",to:"/comments",icon:(0,A.jsx)(v.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(c.Z,{variant:"h6",color:x.grey[300],sx:{m:"15px 0 5px 20px"},children:"Pages"}),(0,A.jsx)(P,{title:"Profile Form",to:"/form",icon:(0,A.jsx)(j.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"Calendar",to:"/calendar",icon:(0,A.jsx)(Z.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"FAQ Page",to:"/faq",icon:(0,A.jsx)(y.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(c.Z,{variant:"h6",color:x.grey[300],sx:{m:"15px 0 5px 20px"},children:"Charts"}),(0,A.jsx)(P,{title:"Bar Chart",to:"/bar",icon:(0,A.jsx)(w.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"Pie Chart",to:"/pie",icon:(0,A.jsx)(b.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"Line Chart",to:"/line",icon:(0,A.jsx)(C.Z,{}),selected:L,setSelected:W}),(0,A.jsx)(P,{title:"Geography Chart",to:"/geography",icon:(0,A.jsx)(M.Z,{}),selected:L,setSelected:W})]}),F?(0,A.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0",color:x.grey[100]},children:(0,A.jsx)(u.Z,{onClick:function(){return N(!F)},children:(0,A.jsx)(S.Z,{sx:{fontSize:"16px",fontWeight:"bold"}})})}):(0,A.jsx)("div",{style:{margin:"10px 10px 20px 0",color:x.grey[100],display:"flex",justifyContent:"end",alignItems:"center"},children:(0,A.jsx)(u.Z,{onClick:function(){return N(!F)},children:(0,A.jsx)(k.Z,{sx:{fontSize:"16px",fontWeight:"bold"}})})})]})})})},z=function(e){return function(t){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(i.Z,{}),(0,A.jsxs)(d.Z,{display:"flex",flexDirection:"row",width:"100%",minWidth:"100%",mt:{xs:"80px",sm:"80px",md:"80px",lg:"80px"},children:[(0,A.jsx)(I,{}),(0,A.jsx)(e,(0,r.Z)({},t))]})]})}}},38820:function(e,t,n){n.r(t);var r=n(79346),i=n(17374),o=n(61637),s=n(11995),a=n(442),l=n(36283),c=n(30475),d=n(99431),u=n(32948),x=n(70811),f=n(34952),h=n(78781),p=n(1244),g=n(49216),m=n(33448),v=n(63447),j=n(37885),Z=n(78143),y=n(78166);t.default=(0,j.Z)((function(){var e=(0,l.Z)(),t=(0,x.TV)(e.palette.mode),n=(0,a.v9)((function(e){return e.auth})),j=(0,a.v9)((function(e){return e.profileDetails})),w=(0,a.v9)((function(e){return e.posts})),b=(0,a.I0)(),C=(0,g.s0)(),S=(0,s.useState)(0),k=(0,o.Z)(S,2),M=k[0],D=k[1],A=(0,s.useState)(!1),P=(0,o.Z)(A,2),I=P[0],z=P[1],E=function(){z(!1)},F=function(){z(!0)},N=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,v.pu)(b,n.token),F(),e.next=4,t;case 4:E();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){var i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D(t),i=t<=0?1:t+1,o=(0,v.pu)(b,n.token,i),"loading"===w.status||!w.hasNextPage){e.next=6;break}return e.next=6,o;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=[{field:"_id",headerName:"ID",flex:1.5},{field:"owner",headerName:"User",flex:1.5},{field:"postType",headerName:"Post Type",flex:1,renderCell:function(e){var t=e.row.postType;return(0,y.jsx)(c.Z,{children:t})}},{field:"mediaCount",headerName:"Media Files",flex:1,renderCell:function(e){var t=e.row.mediaFiles;return(0,y.jsx)(c.Z,{children:t.length})}},{field:"visibility",headerName:"Visibility",flex:1,renderCell:function(e){var t=e.row.visibility;return(0,y.jsx)(c.Z,{children:t})}},{field:"postStatus",headerName:"Status",flex:1,renderCell:function(e){var n=e.row.postStatus;return(0,y.jsx)(d.Z,{m:"0",p:"2px 6px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"active"===n?t.greenAccent[600]:t.redAccent[600],borderRadius:"4px",children:(0,y.jsx)(c.Z,{fontSize:"12px",children:n})})}},{field:"createdAt",headerName:"Created At",flex:1,renderCell:function(e){var t=e.row.createdAt;return(0,y.jsx)(c.Z,{children:t?(0,Z.tC)(t):""})}},{field:"edit",headerName:"",flex:1,renderCell:function(e){var n=e.row._id;return(0,y.jsx)("div",{style:{backgroundColor:t.greenAccent[500],padding:"5px 10px",borderRadius:"4px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:function(){return C("/posts/".concat(n))},children:(0,y.jsx)(p.Z,{})})}}];return(0,s.useEffect)((function(){return document.title="All Posts | Dashboard","authenticating"===n.status||"loading"===j.status||"loading"===w.status?F():E(),function(){}}),[n.token,j.status,n.status,w.status]),(0,s.useEffect)((function(){return"idle"===w.status&&N(),function(){}}),[n.token,w.status]),(0,y.jsxs)(d.Z,{m:"20px",mt:"0",width:"100%",children:[(0,y.jsx)(f.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:I,children:(0,y.jsx)(h.Z,{color:"inherit"})}),(0,y.jsx)(m.Z,{title:"POSTS",subtitle:"Managing the Posts"}),(0,y.jsx)(d.Z,{m:"40px 0 0 0",height:"75vh",sx:{"& .MuiDataGrid-root":{border:"none"},"& .MuiDataGrid-cell":{borderBottom:"none"},"& .name-column--cell":{color:t.greenAccent[300]},"& .MuiDataGrid-columnHeaders":{backgroundColor:t.blueAccent[700],borderBottom:"none"},"& .MuiDataGrid-virtualScroller":{backgroundColor:t.primary[400]},"& .MuiDataGrid-footerContainer":{borderTop:"none",backgroundColor:t.blueAccent[700]},"& .MuiCheckbox-root":{color:"".concat(t.greenAccent[200]," !important")}},children:"success"===w.status&&(0,y.jsx)(u._,{rows:w.results,columns:_,rowCount:w.totalPages*w.limit,pagination:!0,paginationMode:"server",pageSize:w.limit,rowsPerPageOptions:[w.limit],page:M,onPageChange:T,disableSelectionOnClick:!0,getRowId:function(e){return e._id},loading:"loading"===w.status})})]})}))},78143:function(e,t,n){n.d(t,{KZ:function(){return o},tC:function(){return r}});var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.format,r=void 0===n?"dd-MM-yyyy":n,i=t.separator,o=void 0===i?"-":i,s=new Date(e),a=s.getFullYear(),l=s.getMonth()+1,c=s.getDate(),d=a.toString(),u=l<10?"0"+l.toString():l.toString(),x=c<10?"0"+c.toString():c.toString();return"dd-MM-yyyy"===r?x+o+u+o+d:d+o+u+o+x},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.is24HourFormat,r=void 0!==n&&n,i=t.showSeconds,o=void 0!==i&&i,s=new Date(e),a=s.getHours(),l=s.getMinutes(),c=s.getSeconds(),d=a<10?"0"+a.toString():a.toString(),u=l<10?"0"+l.toString():l.toString(),x=c<10?"0"+c.toString():c.toString(),f=d+":"+u;if(o&&(f=f+":"+x),!1===r){a>12?d=(a-12).toString():0===a&&(d="12");var h=a<12?"AM":"PM";return o?d+":"+u+":"+x+" "+h:d+":"+u+" "+h}return f},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.format,o=void 0===n?"dd-mm-yyyy":n,s=t.is24HourFormat,a=void 0!==s&&s,l=t.showSeconds,c=void 0!==l&&l;return r(e,{format:o})+" "+i(e,{is24HourFormat:a,showSeconds:c})}}}]);
//# sourceMappingURL=820.c89e0d0a.chunk.js.map