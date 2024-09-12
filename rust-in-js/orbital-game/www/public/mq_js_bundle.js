"use strict";const{isArray:A}=Array;var _=2,c=document.querySelector('#glcanvas'),d,B=null,f=[],G,H,I=!1,J=!1,q={counter:1,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],timerQueries:[],contexts:{},programInfos:{},getNewId:function(bX){var bY=q.counter++;for(var i=bX.length;i<bY;i++)bX[i]=null;return bY},validateGLObjectID:function(bZ,cA,cB,cC){if(cA!=0)if(bZ[cA]===null)console.error(cB+' called with an already deleted '+cC+' ID '+cA+'!');else !bZ[cA]&&console.error(cB+' called with an invalid '+cC+' ID '+cA+'!')},getSource:function(cD,cE,cF,cG){var cH='';for(var i=0;i<cE;++i){var _G=cG==0?void 0:m(cG+i*4,Uint32Array,1)[0];cH+=N(m(cF+i*4,Uint32Array,1)[0],_G)}return cH},populateUniformTable:function(cI){q.validateGLObjectID(q.programs,cI,'populateUniformTable','program');var p=q.programs[cI],cJ=q.programInfos[cI]={uniforms:{},maxUniformLength:0,maxAttributeLength:-1,maxUniformBlockNameLength:-1},cK=cJ.uniforms,cL=d.getProgramParameter(p,0x8b86);for(var i=0;i<cL;++i){var u=d.getActiveUniform(p,i),_H=u.name;cJ.maxUniformLength=Math.max(cJ.maxUniformLength,_H.length+1);_H.slice(-1)==']'&&(_H=_H.slice(0,_H.lastIndexOf('[')));var cM=d.getUniformLocation(p,_H);if(cM){var _J=q.getNewId(q.uniforms);cK[_H]=[u.size,_J];q.uniforms[_J]=cM;for(var j=1;j<u.size;++j){var n=_H+'['+j+']';cM=d.getUniformLocation(p,n);_J=q.getNewId(q.uniforms);q.uniforms[_J]=cM}}}}},U,Y=11,z=12,aA=13,aB=1,aC=2,aD=4,aE=8,aL={env:{console_debug:function(dK){console.debug(N(dK))},console_log:function(dL){console.log(N(dL))},console_info:function(dM){console.info(N(dM))},console_warn:function(dN){console.warn(N(dN))},console_error:function(dO){console.error(N(dO))},set_emscripten_shader_hack:function(dP){aK=dP},sapp_set_clipboard:function(dQ,dR){B=N(dQ,dR)},dpi_scale:aH,rand:function(){return ~~Math.random()*2147483647},now:function(){return Date.now()/1000.0},canvas_width:function(){return ~~c.width},canvas_height:function(){return ~~c.height},glClearDepthf:function(dS){d.clearDepth(dS)},glClearColor:function(r,g,b,a){d.clearColor(r,g,b,a)},glClearStencil:function(s){d.clearStencil(s)},glColorMask:function(dT,dU,dV,dW){d.colorMask(dT,dU,dV,dW)},glScissor:function(x,y,w,h){d.scissor(x,y,w,h)},glClear:function(dX){d.clear(dX)},glGenTextures:function(n,dY){R(n,dY,'createTexture',q.textures,'glGenTextures')},glActiveTexture:function(dZ){d.activeTexture(dZ)},glBindTexture:function(eA,eB){q.validateGLObjectID(q.textures,eB,'glBindTexture','texture');d.bindTexture(eA,q.textures[eB])},glTexImage2D:function(eC,eD,eE,eF,eG,eH,eI,eJ,eK){d.texImage2D(eC,eD,eE,eF,eG,eH,eI,eJ,eK?m(eK,Uint8Array,aI(eE,eF,eG)):null)},glTexSubImage2D:function(eL,eM,eN,eO,eP,eQ,eR,eS,eT){d.texSubImage2D(eL,eM,eN,eO,eP,eQ,eR,eS,eT?m(eT,Uint8Array,aI(eR,eP,eQ)):null)},glReadPixels:function(x,y,eU,eV,eW,eX,eY){d.readPixels(x,y,eU,eV,eW,eX,m(eY,Uint8Array,aI(eW,eU,eV)))},glTexParameteri:function(eZ,fA,fB){d.texParameteri(eZ,fA,fB)},glUniform1fv:function(fC,fD,fE){q.validateGLObjectID(q.uniforms,fC,'glUniform1fv','location');l((fE&3)==0,'Pointer to float data passed to glUniform1fv must be aligned to four bytes!');d.uniform1fv(q.uniforms[fC],m(fE,Float32Array,1*fD,))},glUniform2fv:function(fF,fG,fH){q.validateGLObjectID(q.uniforms,fF,'glUniform2fv','location');l((fH&3)==0,'Pointer to float data passed to glUniform2fv must be aligned to four bytes!');d.uniform2fv(q.uniforms[fF],m(fH,Float32Array,2*fG,))},glUniform3fv:function(fI,fJ,fK){q.validateGLObjectID(q.uniforms,fI,'glUniform3fv','location');l((fK&3)==0,'Pointer to float data passed to glUniform3fv must be aligned to four bytes!');d.uniform3fv(q.uniforms[fI],m(fK,Float32Array,3*fJ,))},glUniform4fv:function(fL,fM,fN){q.validateGLObjectID(q.uniforms,fL,'glUniform4fv','location');l((fN&3)==0,'Pointer to float data passed to glUniform4fv must be aligned to four bytes!');d.uniform4fv(q.uniforms[fL],m(fN,Float32Array,4*fM,))},glUniform1iv:function(fO,fP,fQ){q.validateGLObjectID(q.uniforms,fO,'glUniform1fv','location');l((fQ&3)==0,'Pointer to i32 data passed to glUniform1iv must be aligned to four bytes!');d.uniform1iv(q.uniforms[fO],m(fQ,Int32Array,1*fP))},glUniform2iv:function(fR,fS,fT){q.validateGLObjectID(q.uniforms,fR,'glUniform2fv','location');l((fT&3)==0,'Pointer to i32 data passed to glUniform2iv must be aligned to four bytes!');d.uniform2iv(q.uniforms[fR],m(fT,Int32Array,2*fS))},glUniform3iv:function(fU,fV,fW){q.validateGLObjectID(q.uniforms,fU,'glUniform3fv','location');l((fW&3)==0,'Pointer to i32 data passed to glUniform3iv must be aligned to four bytes!');d.uniform3iv(q.uniforms[fU],m(fW,Int32Array,3*fV))},glUniform4iv:function(fX,fY,fZ){q.validateGLObjectID(q.uniforms,fX,'glUniform4fv','location');l((fZ&3)==0,'Pointer to i32 data passed to glUniform4iv must be aligned to four bytes!');d.uniform4iv(q.uniforms[fX],m(fZ,Int32Array,4*fY))},glBlendFunc:function(gA,gB){d.blendFunc(gA,gB)},glBlendEquationSeparate:function(gC,gD){d.blendEquationSeparate(gC,gD)},glDisable:function(gE){d.disable(gE)},glDrawElements:function(gF,gG,gH,gI){d.drawElements(gF,gG,gH,gI)},glGetIntegerv:function(gJ,p){S(gJ,p,'EM_FUNC_SIG_PARAM_I')},glUniform1f:function(gK,gL){q.validateGLObjectID(q.uniforms,gK,'glUniform1f','location');d.uniform1f(q.uniforms[gK],gL)},glUniform1i:function(gM,gN){q.validateGLObjectID(q.uniforms,gM,'glUniform1i','location');d.uniform1i(q.uniforms[gM],gN)},glGetAttribLocation:function(gO,gP){return d.getAttribLocation(q.programs[gO],N(gP))},glEnableVertexAttribArray:function(gQ){d.enableVertexAttribArray(gQ)},glDisableVertexAttribArray:function(gR){d.disableVertexAttribArray(gR)},glVertexAttribPointer:function(gS,gT,gU,gV,gW,gX){d.vertexAttribPointer(gS,gT,gU,!!gV,gW,gX)},glVertexAttribIPointer:function(gY,gZ,hA,hB,hC){d.vertexAttribIPointer(gY,gZ,hA,hB,hC)},glGetUniformLocation:function(hD,hE){q.validateGLObjectID(q.programs,hD,'glGetUniformLocation','program');hE=N(hE);var hF=0;if(hE[hE.length-1]==']'){var hG=hE.lastIndexOf('[');hF=hE[hG+1]!=']'?parseInt(hE.slice(hG+1)):0;hE=hE.slice(0,hG)}var hH=q.programInfos[hD]&&q.programInfos[hD].uniforms[hE];if(hH&&hF>=0&&hF<hH[0])return hH[1]+hF;return -1},glUniformMatrix4fv:function(hI,hJ,hK,hL){q.validateGLObjectID(q.uniforms,hI,'glUniformMatrix4fv','location');l((hL&3)==0,'Pointer to float data passed to glUniformMatrix4fv must be aligned to four bytes!');d.uniformMatrix4fv(q.uniforms[hI],!!hK,m(hL,Float32Array,16,))},glUseProgram:function(hM){q.validateGLObjectID(q.programs,hM,'glUseProgram','program');d.useProgram(q.programs[hM])},glGenVertexArrays:function(n,hN){R(n,hN,'createVertexArray',q.vaos,'glGenVertexArrays')},glGenFramebuffers:function(n,hO){R(n,hO,'createFramebuffer',q.framebuffers,'glGenFramebuffers')},glBindVertexArray:function(hP){d.bindVertexArray(q.vaos[hP])},glBindFramebuffer:function(hQ,hR){q.validateGLObjectID(q.framebuffers,hR,'glBindFramebuffer','framebuffer');d.bindFramebuffer(hQ,q.framebuffers[hR])},glGenBuffers:function(n,hS){R(n,hS,'createBuffer',q.buffers,'glGenBuffers')},glBindBuffer:function(hT,hU){q.validateGLObjectID(q.buffers,hU,'glBindBuffer','buffer');d.bindBuffer(hT,q.buffers[hU])},glBufferData:function(hV,hW,hX,hY){d.bufferData(hV,hX?m(hX,Uint8Array,hW):hW,hY)},glBufferSubData:function(hZ,iA,iB,iC){d.bufferSubData(hZ,iA,iC?m(iC,Uint8Array,iB):iB)},glEnable:function(iD){d.enable(iD)},glFlush:function(){d.flush()},glFinish:function(){d.finish()},glDepthFunc:function(iE){d.depthFunc(iE)},glBlendFuncSeparate:function(iF,iG,iH,iI){d.blendFuncSeparate(iF,iG,iH,iI)},glViewport:function(x,y,iJ,iK){d.viewport(x,y,iJ,iK)},glDrawArrays:function(iL,iM,iN){d.drawArrays(iL,iM,iN)},glDrawBuffers:function(n,iO){d.drawBuffers(m(iO,Int32Array,n))},glCreateProgram:function(){var iP=q.getNewId(q.programs),iQ=d.createProgram();iQ.name=iP;q.programs[iP]=iQ;return iP},glAttachShader:function(iR,iS){q.validateGLObjectID(q.programs,iR,'glAttachShader','program');q.validateGLObjectID(q.shaders,iS,'glAttachShader','shader');d.attachShader(q.programs[iR],q.shaders[iS])},glDetachShader:function(iT,iU){q.validateGLObjectID(q.programs,iT,'glDetachShader','program');q.validateGLObjectID(q.shaders,iU,'glDetachShader','shader');d.detachShader(q.programs[iT],q.shaders[iU])},glLinkProgram:function(iV){q.validateGLObjectID(q.programs,iV,'glLinkProgram','program');d.linkProgram(q.programs[iV]);q.populateUniformTable(iV)},glPixelStorei:function(iW,iX){d.pixelStorei(iW,iX)},glFramebufferTexture2D:function(iY,iZ,jA,jB,jC){q.validateGLObjectID(q.textures,jB,'glFramebufferTexture2D','texture');d.framebufferTexture2D(iY,iZ,jA,q.textures[jB],jC)},glGetProgramiv:function(jD,jE,p){l(p);q.validateGLObjectID(q.programs,jD,'glGetProgramiv','program');if(jD>=q.counter){console.error('GL_INVALID_VALUE in glGetProgramiv');return}var jF=q.programInfos[jD];if(!jF){console.error('GL_INVALID_OPERATION in glGetProgramiv(program='+jD+', pname='+jE+', p=0x'+p.toString(16)+'): The specified GL object name does not refer to a program object!');return}if(jE==0x8b84){var jG=d.getProgramInfoLog(q.programs[jD]);l(jG!==null);m(p,Int32Array,1)[0]=jG.length+1}else{if(jE==0x8b87){console.error('unsupported operation');return}if(jE==0x8b8a){console.error('unsupported operation');return}else if(jE==0x8a35){console.error('unsupported operation');return}else m(p,Int32Array,1)[0]=d.getProgramParameter(q.programs[jD],jE)}},glCreateShader:function(jH){var jI=q.getNewId(q.shaders);q.shaders[jI]=d.createShader(jH);return jI},glStencilFuncSeparate:function(jJ,jK,jL,jM){d.stencilFuncSeparate(jJ,jK,jL,jM)},glStencilMaskSeparate:function(jN,jO){d.stencilMaskSeparate(jN,jO)},glStencilOpSeparate:function(jP,jQ,jR,jS){d.stencilOpSeparate(jP,jQ,jR,jS)},glFrontFace:function(jT){d.frontFace(jT)},glCullFace:function(jU){d.cullFace(jU)},glCopyTexImage2D:function(jV,jW,jX,x,y,jY,jZ,kA){d.copyTexImage2D(jV,jW,jX,x,y,jY,jZ,kA)},glShaderSource:function(kB,kC,kD,kE){q.validateGLObjectID(q.shaders,kB,'glShaderSource','shader');var kF=q.getSource(kB,kC,kD,kE);if(aK){kF=kF.replaceAll('#extension GL_OES_standard_derivatives : enable','');kF=kF.replaceAll('#extension GL_EXT_shader_texture_lod : enable','');var kG='';kF.indexOf('gl_FragColor')!=-1&&(kG+='out mediump vec4 GL_FragColor;\n',kF=kF.replaceAll('gl_FragColor','GL_FragColor'));kF.indexOf('attribute')!=-1?(kF=kF.replaceAll('attribute','in'),kF=kF.replaceAll('varying','out')):(kF=kF.replaceAll('varying','in'));kF=kF.replaceAll('textureCubeLodEXT','textureCubeLod');kF=kF.replaceAll('texture2DLodEXT','texture2DLod');kF=kF.replaceAll('texture2DProjLodEXT','texture2DProjLod');kF=kF.replaceAll('texture2DGradEXT','texture2DGrad');kF=kF.replaceAll('texture2DProjGradEXT','texture2DProjGrad');kF=kF.replaceAll('textureCubeGradEXT','textureCubeGrad');kF=kF.replaceAll('textureCube','texture');kF=kF.replaceAll('texture1D','texture');kF=kF.replaceAll('texture2D','texture');kF=kF.replaceAll('texture3D','texture');kF=kF.replaceAll('#version 100',`#version 300 es
${kG}`)}d.shaderSource(q.shaders[kB],kF)},glGetProgramInfoLog:function(kH,kI,kJ,kK){q.validateGLObjectID(q.programs,kH,'glGetProgramInfoLog','program');var kL=d.getProgramInfoLog(q.programs[kH]);l(kL!==null);let kM=m(kK,Uint8Array,kI);for(var i=0;i<kI;i++)kM[i]=kL.charCodeAt(i)},glGetString:function(kN){var kO=`${d.getParameter(kN)}`,kP=kO.length+1,kQ=U.allocate_vec_u8(kP);var kR=new Uint8Array(G.buffer, kQ, kP);kR[kO.length]=0;o(kO,kR,0,kP);return kQ},glCompileShader:function(kS,kT,kU,kV){q.validateGLObjectID(q.shaders,kS,'glCompileShader','shader');d.compileShader(q.shaders[kS])},glGetShaderiv:function(kW,kX,p){l(p);q.validateGLObjectID(q.shaders,kW,'glGetShaderiv','shader');if(kX==0x8b84){var kY=d.getShaderInfoLog(q.shaders[kW]);l(kY!==null);m(p,Int32Array,1)[0]=kY.length+1}else if(kX==0x8b88){var kZ=d.getShaderSource(q.shaders[kW]),lA=kZ===null||kZ.length==0?0:kZ.length+1;m(p,Int32Array,1)[0]=lA}else m(p,Int32Array,1)[0]=d.getShaderParameter(q.shaders[kW],kX)},glGetShaderInfoLog:function(lB,lC,lD,lE){q.validateGLObjectID(q.shaders,lB,'glGetShaderInfoLog','shader');var lF=d.getShaderInfoLog(q.shaders[lB]);l(lF!==null);let lG=m(lE,Uint8Array,lC);for(var i=0;i<lC;i++)lG[i]=lF.charCodeAt(i)},glVertexAttribDivisor:function(lH,lI){d.vertexAttribDivisor(lH,lI)},glDrawArraysInstanced:function(lJ,lK,lL,lM){d.drawArraysInstanced(lJ,lK,lL,lM)},glDrawElementsInstanced:function(lN,lO,lP,lQ,lR){d.drawElementsInstanced(lN,lO,lP,lQ,lR)},glDeleteShader:function(lS){var lT=q.shaders[lS];if(lT==null)return;d.deleteShader(lT);q.shaders[lS]=null},glDeleteProgram:function(lU){var lV=q.programs[lU];if(lV==null)return;d.deleteProgram(lV);q.programs[lU]=null},glDeleteBuffers:function(n,lW){for(var i=0;i<n;i++){var lX=m(lW+i*4,Uint32Array,1)[0],lY=q.buffers[lX];if(!lY)continue;d.deleteBuffer(lY);lY.name=0;q.buffers[lX]=null}},glDeleteFramebuffers:function(n,lZ){for(var i=0;i<n;i++){var mA=m(lZ+i*4,Uint32Array,1)[0],mB=q.framebuffers[mA];if(!mB)continue;d.deleteFramebuffer(mB);mB.name=0;q.framebuffers[mA]=null}},glDeleteTextures:function(n,mC){for(var i=0;i<n;i++){var mD=m(mC+i*4,Uint32Array,1)[0],mE=q.textures[mD];if(!mE)continue;d.deleteTexture(mE);mE.name=0;q.textures[mD]=null}},glGenQueries:function(n,mF){R(n,mF,'createQuery',q.timerQueries,'glGenQueries')},glDeleteQueries:function(n,mG){for(var i=0;i<n;i++){var mH=m(textures+i*4,Uint32Array,1)[0],mI=q.timerQueries[mH];if(!mI)continue;d.deleteQuery(mI);mI.name=0;q.timerQueries[mH]=null}},glBeginQuery:function(mJ,mK){q.validateGLObjectID(q.timerQueries,mK,'glBeginQuery','id');d.beginQuery(mJ,q.timerQueries[mK])},glEndQuery:function(mL){d.endQuery(mL)},glGetQueryObjectiv:function(mM,mN,mO){q.validateGLObjectID(q.timerQueries,mM,'glGetQueryObjectiv','id');m(mO,Uint32Array,1)[0]=d.getQueryObject(q.timerQueries[mM],mN)},glGetQueryObjectui64v:function(mP,mQ,mR){q.validateGLObjectID(q.timerQueries,mP,'glGetQueryObjectui64v','id');let mS=d.getQueryObject(q.timerQueries[mP],mQ);let mT=m(mR,Uint32Array,2);mT[0]=mS;mT[1]=(mS-mT[0])/4294967296},glGenerateMipmap:function(mU){d.generateMipmap(mU)},setup_canvas_size:function(mV){window.high_dpi=mV;v(c)},run_animation_loop:function(mW){c.onmousemove=mZ=>{var nA=aJ(mZ.clientX,mZ.clientY),x=nA.x,y=nA.y;U.mouse_move(~~x,~~y);(mZ.movementX!=0||mZ.movementY!=0)&&U.raw_mouse_move(~~mZ.movementX,~~mZ.movementY)};c.onmousedown=nB=>{var nC=aJ(nB.clientX,nB.clientY);U.mouse_down(nC.x,nC.y,aF(nB.button))};c.addEventListener('wheel',function(nD){nD.preventDefault();U.mouse_wheel(-nD.deltaX,-nD.deltaY)});c.onmouseup=nE=>{var nF=aJ(nE.clientX,nE.clientY);U.mouse_up(nF.x,nF.y,aF(nE.button))};c.onkeydown=nG=>{var nH=aG(nG.code);switch(nH) {case 32:case 262:case 263:case 264:case 265:case 290:case 291:case 292:case 293:case 294:case 295:case 296:case 297:case 298:case 299:case 259:case 258:case 39:case 47:nG.preventDefault();break}var nI=0;nG.ctrlKey&&(nI|=aC);nG.shiftKey&&(nI|=aB);nG.altKey&&(nI|=aD);U.key_down(nH,nI,nG.repeat);(nH==32||nH==39||nH==47)&&U.key_press(nH)};c.onkeyup=nJ=>{var nK=0;nJ.ctrlKey&&(nK|=aC);nJ.shiftKey&&(nK|=aB);nJ.altKey&&(nK|=aD);U.key_up(aG(nJ.code),nK)};c.onkeypress=nL=>{var nM=aG(nL.code);let nN=nM==261||nL.ctrlKey;nN==!1&&U.key_press(nL.charCode)};c.addEventListener('touchstart',function(nO){nO.preventDefault();for(const nP of nO.changedTouches){let nQ=aJ(nP.clientX,nP.clientY);U.touch(X,nP.identifier,nQ.x,nQ.y)}});c.addEventListener('touchend',function(nR){nR.preventDefault();for(const nS of nR.changedTouches){let nT=aJ(nS.clientX,nS.clientY);U.touch(z,nS.identifier,nT.x,nT.y)}});c.addEventListener('touchcancel',function(nU){nU.preventDefault();for(const nV of nU.changedTouches){let nW=aJ(nV.clientX,nV.clientY);U.touch(aA,nV.identifier,nW.x,nW.y)}});c.addEventListener('touchmove',function(nX){nX.preventDefault();for(const nY of nX.changedTouches){let nZ=aJ(nY.clientX,nY.clientY);U.touch(Y,nY.identifier,nZ.x,nZ.y)}});window.onresize=()=>v(c,U.resize);window.addEventListener('copy',function(e){B!=null&&(event.clipboardData.setData('text/plain',B),event.preventDefault())});window.addEventListener('cut',function(e){B!=null&&(event.clipboardData.setData('text/plain',B),event.preventDefault())});window.addEventListener('paste',function(e){e.stopPropagation();e.preventDefault();var oA=e.clipboardData||window.clipboardData,oB=oA.getData('Text');if(oB!=void 0&&oB!=null&&oB.length!=0){var oC=new TextEncoder().encode(oB).length,oD=U.allocate_vec_u8(oC);var oE=new Uint8Array(G.buffer, oD, oC);o(oB,oE,0,oC);U.on_clipboard_paste(oD,oC)}});window.ondragover=e=>e.preventDefault();window.ondrop=async function(e){e.preventDefault();U.on_files_dropped_start();for(let file of e.dataTransfer.files){var oF=file.name.length,oG=U.allocate_vec_u8(oF),oJ=oI.byteLength,oK=U.allocate_vec_u8(oJ);var oH=new Uint8Array(G.buffer, oG, oF);o(file.name,oH,0,oF);var oI=await file.arrayBuffer();var oL=new Uint8Array(G.buffer, oK, oJ);oL.set(new Uint8Array(oI),0);U.on_file_dropped(oG,oF,oK,oJ)}U.on_files_dropped_finish()};let mX=document.hasFocus();var mY=function(){let oM=document.hasFocus();mX==oM&&(U.focus(oM),mX=oM)};document.addEventListener('visibilitychange',mY);window.addEventListener('focus',mY);window.addEventListener('blur',mY);window.blocking_event_loop=mW;window.requestAnimationFrame(W)},fs_load_file:function(oN,oO){var oP=P.unique_id;P.unique_id+=1;var oQ=new XMLHttpRequest();oQ.open('GET',N(oN,oO),!0);oQ.responseType='arraybuffer';oQ.onreadystatechange=function(){if(this.readyState===4)if(this.status===200){var oR=new Uint8Array(this.response);P.loaded_files[oP]=oR;U.file_loaded(oP)}else{P.loaded_files[oP]=null;U.file_loaded(oP)}};oQ.send();return oP},fs_get_buffer_size:function(oS){if(P.loaded_files[oS]==null)return -1;return P.loaded_files[oS].length},fs_take_buffer:function(oT,oU,oV){var oW=P.loaded_files[oT];console.assert(oW.length<=oV);var oX=new Uint8Array(G.buffer, oU, oV);for(var i=0;i<oW.length;i++)oX[i]=oW[i];delete P.loaded_files[oT]},sapp_set_cursor_grab:function(oY){oY?c.requestPointerLock():document.exitPointerLock()},sapp_set_cursor:function(oZ,pA){c.style.cursor=N(oZ,pA)},sapp_is_fullscreen:function(){let pB=document.fullscreenElement;return pB!=null&&pB.id==c.id},sapp_set_fullscreen:function(pC){!pC?document.exitFullscreen():c.requestFullscreen()},sapp_set_window_size:function(pD,pE){c.width=pD;c.height=pE;v(c,U.resize)},sapp_schedule_update:function(){H&&window.cancelAnimationFrame(H);H=window.requestAnimationFrame(W)},init_webgl:k}};function k(C){if(C==1){d=c.getContext('webgl');function _a(_A){var _B=_A.getExtension('OES_vertex_array_object');_B?(_A['createVertexArray']=()=>_B['createVertexArrayOES'](),_A['deleteVertexArray']=vao=>_B['deleteVertexArrayOES'](vao),_A['bindVertexArray']=vao=>_B['bindVertexArrayOES'](vao),_A['isVertexArray']=vao=>_B['isVertexArrayOES'](vao)):(alert('Unable to get OES_vertex_array_object extension'))}function _b(E){var aS=E.getExtension('ANGLE_instanced_arrays');aS&&(E['vertexAttribDivisor']=(aT,aU)=>aS['vertexAttribDivisorANGLE'](aT,aU),E['drawArraysInstanced']=(aV,aW,_C,_d)=>aS['drawArraysInstancedANGLE'](aV,aW,_C,_d),E['drawElementsInstanced']=(aX,aY,aZ,_D,_e)=>aS['drawElementsInstancedANGLE'](aX,aY,aZ,_D,_e))}function _c(bA){var bB=bA.getExtension('EXT_disjoint_timer_query');bB&&(bA['createQuery']=()=>bB['createQueryEXT'](),bA['beginQuery']=(bC,bD)=>bB['beginQueryEXT'](bC,bD),bA['endQuery']=bE=>bB['endQueryEXT'](bE),bA['deleteQuery']=bF=>bB['deleteQueryEXT'](bF),bA['getQueryObject']=(bG,bH)=>bB['getQueryObjectEXT'](bG,bH))}function D(bI){var bJ=bI.getExtension('WEBGL_draw_buffers');bJ&&(bI['drawBuffers']=bufs=>bJ['drawBuffersWEBGL'](bufs))}try{d.getExtension('EXT_shader_texture_lod');d.getExtension('OES_standard_derivatives')}catch(e){console.warn(e)}_a(d);_b(d);_c(d);D(d);d.getExtension('WEBGL_depth_texture')==null&&alert('Cant initialize WEBGL_depth_texture extension')}else d=c.getContext('webgl2');d===null&&alert('Unable to initialize WebGL. Your browser or machine may not support it.')}c.focus();c.requestPointerLock=c.requestPointerLock||c.mozRequestPointerLock||function(){};document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||function(){};function l(bK,bL){bK==!1&&alert(bL)}function m(bM,bN,n){return new bN(G.buffer, bM, n)}function N(bO,bP){let bQ=new Uint8Array(G.buffer, bO);var bR=0,_E=bR+bP,F='';while (!(bR>=_E)) {var _g=bQ[bR++],_i=bQ[bR++]&63;if(!_g)return F;if(!(_g&0x80)){F+=String.fromCharCode(_g);continue}var _h=bQ[bR++]&63;if((_g&0xe0)==0xc0){F+=String.fromCharCode(((_g&31)<<6)|_h);continue}if((_g&0xf0)==0xe0)_g=((_g&15)<<12)|(_h<<6)|_i;else{(_g&0xf8)!=0xf0&&console.warn(`Invalid UTF-8 leading byte 0x${_g.toString(16)} encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!`);_g=((_g&7)<<18)|(_h<<12)|(_i<<6)|(bQ[bR++]&63)}if(_g<0x10000)F+=String.fromCharCode(_g);else{var _j=_g-0x10000;F+=String.fromCharCode(0xd800|(_j>>10),0xdc00|(_j&0x3ff))}}return F}function o(bS,bT,bU,bV){var bW=bU,_f=bU+bV;for(var i=0;i<bS.length;++i){var u=bS.charCodeAt(i);if(u>=0xd800&&u<=0xdfff){var _I=bS.charCodeAt(++i);u=(0x10000+((u&0x3ff)<<10))|(_I&0x3ff)}if(u<=0x7f){if(bU>=_f)break;bT[bU++]=u}else if(u<=0x7ff){if(bU+1>=_f)break;bT[bU++]=0xc0|(u>>6);bT[bU++]=0x80|(u&63)}else if(u<=0xffff){if(bU+2>=_f)break;bT[bU++]=0xe0|(u>>12);bT[bU++]=0x80|((u>>6)&63);bT[bU++]=0x80|(u&63)}else{if(bU+3>=_f)break;u>=0x200000&&console.warn(`Invalid Unicode code point 0x${u.toString(16)} encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).`);bT[bU++]=0xf0|(u>>18);bT[bU++]=0x80|((u>>12)&63);bT[bU++]=0x80|((u>>6)&63);bT[bU++]=0x80|(u&63)}}return bU-bW}var P={loaded_files:[],unique_id:0};function R(n,cN,cO,cP,cQ){for(var i=0;i<n;i++){var cR=d[cO](),cS=cR&&q.getNewId(cP);cR?(cR.name=cS,cP[cS]=cR):(console.error('GL_INVALID_OPERATION'),q.recordError(0x0502),alert('GL_INVALID_OPERATION in '+cQ+': GLctx.'+cO+' returned null - most likely GL context is lost!'));m(cN+i*4,Int32Array,1)[0]=cS}}function S(cT,p,cU){if(!p){console.error('GL_INVALID_VALUE in glGet'+cU+'v(name='+cT+': Function called with null out pointer!');q.recordError(0x501);return}var cV;switch(cT) {case 0x8dfa:cV=1;break;case 0x8df8:(cU!='EM_FUNC_SIG_PARAM_I'&&cU!='EM_FUNC_SIG_PARAM_I64')&&(q.recordError(0x500),err(`GL_INVALID_ENUM in glGet${cU}v(GL_SHADER_BINARY_FORMATS): Invalid parameter type!`));return;case 0x87fe:case 0x8df9:cV=0;break;case 0x86a2:var cW=d.getParameter(0x86a3);cV=cW?cW.length:0;break;case 0x821d:l(!1,'unimplemented');break;case 0x821b:case 0x821c:l(!1,'unimplemented');break}if(cV===void 0){var _F=d.getParameter(cT);switch(typeof _F) {case 'number':cV=_F;break;case 'boolean':cV=_F?1:0;break;case 'string':q.recordError(0x500);console.error('GL_INVALID_ENUM in glGet'+cU+'v('+cT+') on a name which returns a string!');return;case 'object':if(_F===null)switch(cT) {case 0x8894:case 0x8b8d:case 0x8895:case 0x8ca6:case 0x8ca7:case 0x8069:case 0x85b5:case 0x8919:case 0x8e25:case 0x8514:cV=0;break;default:q.recordError(0x500);console.error('GL_INVALID_ENUM in glGet'+cU+'v('+cT+') and it returns null!');return}else{if(_F instanceof Float32Array||_F instanceof Uint32Array||_F instanceof Int32Array||A(_F)){for(var i=0;i<_F.length;++i)l(!1,'unimplemented');return}try{cV=_F.name|0}catch(e){q.recordError(0x500);console.error('GL_INVALID_ENUM in glGet'+cU+'v: Unknown object returned from WebGL getParameter('+cT+')! (error: '+e+')');return}}break;default:q.recordError(0x500);console.error('GL_INVALID_ENUM in glGet'+cU+'v: Native code calling glGet'+cU+'v('+cT+') and it returns '+_F+' of type '+typeof _F+'!');return}}switch(cU) {case 'EM_FUNC_SIG_PARAM_I64':m(p,Int32Array,1)[0]=cV;case 'EM_FUNC_SIG_PARAM_I':m(p,Int32Array,1)[0]=cV;break;case 'EM_FUNC_SIG_PARAM_F':m(p,Float32Array,1)[0]=cV;break;case 'EM_FUNC_SIG_PARAM_B':m(p,Int8Array,1)[0]=cV?1:0;break;default:throw `internal glGet error, bad type: ${cU}`}}var t;function v(cX,cY){var cZ=aH(),dA=cX.clientWidth*cZ,dB=cX.clientHeight*cZ;if(cX.width!=dA||cX.height!=dB){cX.width=dA;cX.height=dB;cY!=void 0&&cY(~~dA,~~dB)}}function W(){U.frame();if(!window.blocking_event_loop){H&&window.cancelAnimationFrame(H);H=window.requestAnimationFrame(W)}}var X=10;function aF(dC){switch(dC) {case 0:return 0;case 1:return 2;case 2:return 1;default:return dC}}function aG(dD){switch(dD) {case 'Space':return 32;case 'Quote':return 222;case 'Comma':return 44;case 'Minus':return 45;case 'Period':return 46;case 'Slash':return 189;case 'Digit0':return 48;case 'Digit1':return 49;case 'Digit2':return 50;case 'Digit3':return 51;case 'Digit4':return 52;case 'Digit5':return 53;case 'Digit6':return 54;case 'Digit7':return 55;case 'Digit8':return 56;case 'Digit9':return 57;case 'Semicolon':return 59;case 'Equal':return 61;case 'KeyA':return 65;case 'KeyB':return 66;case 'KeyC':return 67;case 'KeyD':return 68;case 'KeyE':return 69;case 'KeyF':return 70;case 'KeyG':return 71;case 'KeyH':return 72;case 'KeyI':return 73;case 'KeyJ':return 74;case 'KeyK':return 75;case 'KeyL':return 76;case 'KeyM':return 77;case 'KeyN':return 78;case 'KeyO':return 79;case 'KeyP':return 80;case 'KeyQ':return 81;case 'KeyR':return 82;case 'KeyS':return 83;case 'KeyT':return 84;case 'KeyU':return 85;case 'KeyV':return 86;case 'KeyW':return 87;case 'KeyX':return 88;case 'KeyY':return 89;case 'KeyZ':return 90;case 'BracketLeft':return 91;case 'Backslash':return 92;case 'BracketRight':return 93;case 'Backquote':return 96;case 'Escape':return 256;case 'Enter':return 257;case 'Tab':return 258;case 'Backspace':return 259;case 'Insert':return 260;case 'Delete':return 261;case 'ArrowRight':return 262;case 'ArrowLeft':return 263;case 'ArrowDown':return 264;case 'ArrowUp':return 265;case 'PageUp':return 266;case 'PageDown':return 267;case 'Home':return 268;case 'End':return 269;case 'CapsLock':return 280;case 'ScrollLock':return 281;case 'NumLock':return 282;case 'PrintScreen':return 283;case 'Pause':return 284;case 'F1':return 290;case 'F2':return 291;case 'F3':return 292;case 'F4':return 293;case 'F5':return 294;case 'F6':return 295;case 'F7':return 296;case 'F8':return 297;case 'F9':return 298;case 'F10':return 299;case 'F11':return 300;case 'F12':return 301;case 'F13':return 302;case 'F14':return 303;case 'F15':return 304;case 'F16':return 305;case 'F17':return 306;case 'F18':return 307;case 'F19':return 308;case 'F20':return 309;case 'F21':return 310;case 'F22':return 311;case 'F23':return 312;case 'F24':return 313;case 'Numpad0':return 320;case 'Numpad1':return 321;case 'Numpad2':return 322;case 'Numpad3':return 323;case 'Numpad4':return 324;case 'Numpad5':return 325;case 'Numpad6':return 326;case 'Numpad7':return 327;case 'Numpad8':return 328;case 'Numpad9':return 329;case 'NumpadDecimal':return 330;case 'NumpadDivide':return 331;case 'NumpadMultiply':return 332;case 'NumpadSubtract':return 333;case 'NumpadAdd':return 334;case 'NumpadEnter':return 335;case 'NumpadEqual':return 336;case 'ShiftLeft':return 340;case 'ControlLeft':return 341;case 'AltLeft':return 342;case 'OSLeft':return 343;case 'ShiftRight':return 344;case 'ControlRight':return 345;case 'AltRight':return 346;case 'OSRight':return 347;case 'ContextMenu':return 348}console.log('Unsupported keyboard key: ',dD)}function aH(){if(I)return window.devicePixelRatio||1.0;return 1.0}function aI(dE,dF,dG){if(dE==d.ALPHA)return dF*dG;if(dE==d.RGB)return dF*dG*3;if(dE==d.RGBA)return dF*dG*4;return dF*dG*3}function aJ(dH,dI){var dJ=c.getBoundingClientRect(),x=(dH-dJ.left)*aH(),y=(dI-dJ.top)*aH();return{x,y}}var aK=!1;function aM(pF){if(pF==void 0)return;for(var i=0;i<pF.length;i++)(pF[i].register_plugin!=void 0&&pF[i].register_plugin!=null)&&pF[i].register_plugin(aL)}function aN(pG){if(pG==void 0)return;for(var i=0;i<pG.length;i++){(pG[i].on_init!=void 0&&pG[i].on_init!=null)&&pG[i].on_init();if(pG[i].name==void 0||pG[i].name==null||pG[i].version==void 0||pG[i].version==null){console.warn('Some of the registred plugins do not have name or version');console.warn('Probably old version of the plugin used')}else{var pH=pG[i].name+'_crate_version';if(U[pH]==void 0)console.log('Plugin '+pG[i].name+' is present in JS bundle, but is not used in the rust code.');else{var pI=U[pH]();pG[i].version!=pI&&console.error('Plugin '+pG[i].name+' version mismatch'+'js version: '+pG[i].version+', crate version: '+pI)}}}}function aO(pJ){f.push(pJ)}function aP(pK){var pL=WebAssembly.Module.imports(pK);for(const i in pL)aL['env'][pL[i].name]==void 0&&(console.warn('No '+pL[i].name+' function in gl.js'),aL['env'][pL[i].name]=()=>console.warn('Missed function: '+pL[i].name))}function aQ(pM){var pN=fetch(pM);aM(f);typeof WebAssembly.compileStreaming==='function'?WebAssembly.compileStreaming(pN).then(pO=>(aP(pO),WebAssembly.instantiate(pO,aL))).then(pP=>{G=pP.exports.memory;U=pP.exports;var pQ=U.crate_version();_!=pQ&&console.error('Version mismatch: gl.js version is: '+_+', miniquad crate version is: '+pQ);aN(f);pP.exports.main()}).catch(pR=>console.error(pR)):pN.then(x=>x.arrayBuffer()).then(pS=>WebAssembly.compile(pS)).then(pT=>(aP(pT),WebAssembly.instantiate(pT,aL))).then(pU=>{G=pU.exports.memory;U=pU.exports;var pV=U.crate_version();_!=pV&&console.error('Version mismatch: gl.js version is: '+_+', rust sapp-wasm crate version is: '+pV);aN(f);pU.exports.main()}).catch(pW=>{console.error('WASM failed to load, probably incompatible gl.js version');console.error(pW)})}function aR(){d=void 0;f=[];G=void 0}