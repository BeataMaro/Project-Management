"use strict";(self.webpackChunkproject_management_app=self.webpackChunkproject_management_app||[]).push([[791],{6791:(H,U,t)=>{t.r(U),t.d(U,{UserLoginModule:()=>W});var d=t(6895),v=t(529),l=t(7337),m=t(9989),c=t(4650);const L=[{path:"",component:m.r}];let S=(()=>{class s{}return s.\u0275fac=function(h){return new(h||s)},s.\u0275mod=c.oAB({type:s}),s.\u0275inj=c.cJS({imports:[l.Bz.forChild(L),l.Bz]}),s})();var $=t(2020),F=t(4006),i=t(9653),r=t(493),e=t(5495);const G=(0,i.ZF)("users"),y=((0,i.P1)(G,s=>s.users),(0,i.Lq)({users:[],isLoggedIn:!1},(0,i.on)(e.pH,(s,{token:o})=>({...s,isLoggedIn:!!o})),(0,i.on)(e.B_,(s,{users:o})=>({...s,isLoggedIn:!0,users:o})),(0,i.on)(e.Nq,(s,{user:o})=>({...s,isLoggedIn:!0,user:o})),(0,i.on)(e.h8,(s,{userId:o})=>({...s,isLoggedIn:!1,userId:o}))));var u=t(3900),g=t(4004),f=t(262),p=t(9646),B=t(5577),z=t(9175);let E=(()=>{class s{constructor(h,j,C){this.actions$=h,this.store=j,this.authService=C,this.fetchUsers$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(e.p_),(0,u.w)(()=>this.authService.getUsers().pipe((0,g.U)(n=>(0,e.B_)({users:n})),(0,f.K)(()=>(0,p.of)((0,e.oO)())))))),this.registerUser$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(e.bi),(0,u.w)(({user:n})=>this.authService.signUp(n).pipe((0,g.U)(a=>(0,e.bi)({user:a})),(0,f.K)(a=>(0,p.of)((0,e.qS)({error:a.message}))))))),this.deleteUser$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(e.h8),(0,B.z)(({userId:n})=>this.authService.deleteUser(n).pipe((0,g.U)(()=>(0,e.h8)({userId:n})),(0,f.K)(a=>(0,p.of)((0,e.GE)({error:a.message}))))))),this.loginUser$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(e.pH),(0,u.w)(({login:n})=>this.authService.logIn(n).pipe((0,g.U)(({token:a})=>(0,e.pH)({token:a})))))),this.updateUser$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(e.Nq),(0,u.w)(({user:n})=>this.authService.updateUser(n).pipe((0,g.U)(({login:a,name:R,password:A})=>(0,e.Nq)({user:{name:R,login:a,password:A}}))))))}}return s.\u0275fac=function(h){return new(h||s)(c.LFG(r.eX),c.LFG(i.yh),c.LFG(z.e))},s.\u0275prov=c.Yz7({token:s,factory:s.\u0275fac}),s})();var I=t(3298);let W=(()=>{class s{}return s.\u0275fac=function(h){return new(h||s)},s.\u0275mod=c.oAB({type:s}),s.\u0275inj=c.cJS({imports:[I.CoreModule,d.ez,$.q,F.UX,v.JF,S,l.Bz,i.Aw.forFeature("users",y),r.sQ.forFeature([E])]}),s})()}}]);