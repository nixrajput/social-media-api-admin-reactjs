"use strict";(self.webpackChunksocial_api_admin_dashboard=self.webpackChunksocial_api_admin_dashboard||[]).push([[812],{8812:function(e,t,r){r.r(t);var n=r(79346),a=r(17374),o=r(61637),i=r(11995),u=r(442),s=r(36283),c=r(30475),l=r(99431),d=r(32948),f=r(70811),p=r(49216),x=r(1244),h=r(34952),g=r(78781),m=r(81838),b=r(33448),k=r(56245),C=r(37885),v=(r(7942),r(78143)),w=r(78166);t.default=(0,C.Z)((function(){var e=(0,s.Z)(),t=(0,f.TV)(e.palette.mode),r=(0,u.v9)((function(e){return e.auth})),C=(0,u.v9)((function(e){return e.profileDetails})),Z=(0,u.v9)((function(e){return e.blueTickRequests})),j=(0,u.I0)(),y=(0,p.s0)(),D=(0,m.Ds)().enqueueSnackbar,A=(0,i.useState)(0),I=(0,o.Z)(A,2),S=I[0],_=I[1],M=(0,i.useState)(!1),N=(0,o.Z)(M,2),E=N[0],R=N[1],T=function(){R(!1)},q=function(){R(!0)},G=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,k.Vb)(j,r.token),q(),e.next=4,t;case 4:T();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var a,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(_(t),a=t<=0?1:t+1,o=(0,k.Vb)(j,r.token,a),"loading"===Z.status||!Z.hasNextPage){e.next=6;break}return e.next=6,o;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=[{field:"_id",headerName:"ID",flex:1},{field:"email",headerName:"Email",flex:1},{field:"user",headerName:"User ID",flex:1},{field:"category",headerName:"Category",flex:1.5},{field:"status",headerName:"Status",flex:1.5,renderCell:function(e){var r=e.row.status;return(0,w.jsx)("div",{style:{backgroundColor:"approved"===r?t.greenAccent[500]:t.redAccent[500],padding:"4px 8px",borderRadius:"4px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"},children:(0,w.jsx)(c.Z,{style:{color:t.white,fontWeight:"bold",fontSize:"12px"},children:r})})}},{field:"createdAt",headerName:"Created At",flex:1,renderCell:function(e){var t=e.row.createdAt;return(0,w.jsx)(c.Z,{children:t?(0,v.tC)(t):""})}},{field:"edit",headerName:"",flex:1,renderCell:function(e){var r=e.row._id;return(0,w.jsx)("div",{style:{backgroundColor:t.greenAccent[500],padding:"5px 10px",borderRadius:"4px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:function(){return y("/blue-tick-requests/".concat(r))},children:(0,w.jsx)(x.Z,{})})}}];return(0,i.useEffect)((function(){return document.title="Dashboard - Blue Tick Requests","authenticating"===r.status||"loading"===C.status||"loading"===Z.status?q():T(),"error"===Z.status&&(D(Z.error,{variant:"error"}),(0,k.IC)(j)),function(){}}),[r.token,C.status,r.status,Z.status,Z.error,D,j]),(0,i.useEffect)((function(){return"idle"===Z.status&&G(),function(){}}),[r.token,Z.status]),(0,w.jsxs)(l.Z,{m:"20px",mt:"0",width:"100%",children:[(0,w.jsx)(h.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:E,children:(0,w.jsx)(g.Z,{color:"inherit"})}),(0,w.jsx)(b.Z,{title:"BLUE TICK REQUESTS",subtitle:"Managing the requests for blue tick verification"}),(0,w.jsx)(l.Z,{m:"40px 0 0 0",height:"75vh",sx:{"& .MuiDataGrid-root":{border:"none"},"& .MuiDataGrid-cell":{borderBottom:"none"},"& .name-column--cell":{color:t.greenAccent[300]},"& .MuiDataGrid-columnHeaders":{backgroundColor:t.blueAccent[700],borderBottom:"none"},"& .MuiDataGrid-virtualScroller":{backgroundColor:t.primary[400]},"& .MuiDataGrid-footerContainer":{borderTop:"none",backgroundColor:t.blueAccent[700]},"& .MuiCheckbox-root":{color:"".concat(t.greenAccent[200]," !important")}},children:"success"===Z.status&&(0,w.jsx)(d._,{rows:Z.results,columns:z,rowCount:Z.totalPages*Z.limit,pagination:!0,paginationMode:"server",pageSize:Z.limit,rowsPerPageOptions:[Z.limit],page:S,onPageChange:P,disableSelectionOnClick:!0,getRowId:function(e){return e._id},loading:"loading"===Z.status})})]})}))}}]);
//# sourceMappingURL=812.a8270512.chunk.js.map