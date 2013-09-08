/**
* Implementation of chrome remote debugging protocol: 
* https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/index
* Console: Implemented
* Page: Implemented
* Runtime: Implemented
* Timeline: Implemented
* DOM: Implemented
*/
var WebSocket = require('ws');
var Q = require('q');


var rDebug = {
	openSocket:function(wsUrl) {
		var rDebugApi = {
			"version":0.1
			,ws:null
			,requestId:0
			,responses:{
			
			
			/**** PAGE API ****/
			},pageNavigate:function(pageUrl) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				console.log("navigating to:",pageUrl);
				rDebugApi.ws.send('{"id":'+rId+',"method": "Page.navigate","params": {"url": "'+pageUrl+'"}}');
				return deferred.promise;
			},pageReload:function(ignoreCache,scriptEval) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				console.log("navigating to:",pageUrl);
				var m = {
					"id":rId
					,"method":"Page.reload"
					,"params": {
					}
				}
				if (ignoreCache) m.params.ignoreCache = ignoreCache;
				if (scriptEval) m.params.scriptEval = scriptEval;
				
				rDebugApi.ws.send(JSON.stringify(m));
				return deferred.promise;
			},pageDisableEvents:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Page.disable"}');
				return deferred.promise;
			},pageEnableEvents:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Page.enable"}');
				return deferred.promise;
			
			
			/**** CONSOLE API ****/
			},consoleClearMessages:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Console.clearMessages"}');
				return deferred.promise;
			},consoleEnable:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Console.enable"}');
				return deferred.promise;
			},consoleDisable:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Console.disable"}');
				return deferred.promise;
				
			/**** DOM API ****/
			
			},domGetAttributes:function(nodeId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.getAttributes"
					,"params":{
						"nodeId":nodeId
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domGetDocument:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "DOM.getDocument"}');
				return deferred.promise;
			},domGetOuterHTML:function(nodeId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "DOM.getOuterHTML","params":{"nodeId":'+nodeId+'}}');
				return deferred.promise;
			},domHideHighlight:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.hideHighlight"
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domHighlightNode:function(nodeId,highlightConfig) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.highlightNode"
					,"params":{
						"nodeId":nodeId
						,"highlightConfig":highlightConfig
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domHighlighRect:function(x,y,width,height,color,outlineColor) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.highlightRect"
					,"params":{
						"x":x
						,"y":y
						,"width":width
						,"height":height
						"color":color
						"outlineColor":outlineColor
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domMoveTo:function(nodeId,targetNodeId,insertBeforeNodeId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.moveTo"
					,"params":{
						"nodeId":nodeId
						,"targetNodeId":targetNodeId
						,"insertBeforeNodeId":insertBeforeNodeId
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domQuerySelector:function(nodeId,selector) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.querySelector"
					,"params":{
						"nodeId":nodeId
						,"selector":selector
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domQuerySelectorAll:function(nodeId,selector) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.querySelectorAll"
					,"params":{
						"nodeId":nodeId
						,"selector":selector
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domRemoveAttribute:function(nodeId,name) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.removeAttribute"
					,"params":{
						"nodeId":nodeId
						,"name":name
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domRemoveNode:function(nodeId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.removeNode"
					,"params":{
						"nodeId":nodeId
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domRequestChildNodes:function(nodeId,html) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.requestChildNodes"
					,"params":{
						"nodeId":nodeId
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domRequestNode:function(objectId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.requestNode"
					,"params":{
						"objectId":objectId
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domResolveNode:function(nodeId,objectGroup) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.resolveNode"
					,"params":{
						"nodeId":nodeId
						,"objectGroup":objectGroup
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domSetAttributeValue:function(nodeId,name,value) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.setAttributeValue"
					,"params":{
						"nodeId":nodeId
						,"name":name
						,"value":value
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},setAttributesAsText:function(nodeId,text,name) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.setAttributesAsText"
					,"params":{
						"nodeId":nodeId
						,"text":text
						,"name":name
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},setNodeName:function(nodeId,name) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.setNodeName"
					,"params":{
						"nodeId":nodeId
						,"name":name
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},setNodeValue:function(nodeId,value) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.setNodeValue"
					,"params":{
						"nodeId":nodeId
						,"value":value
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},domSetOuterHTML:function(nodeId,html) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"DOM.setOuterHTML"
					,"params":{
						"nodeId":nodeId
						,"outerHTML":html
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			
			
			/**** Runtime API ****/
			},runtimeCallFunctionOn:function(objectId,fn,args,retByVal) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"Runtime.callFunctionOn"
					,"params":{
						"objectId":nodeId
						,"functionDeclaration":fn
						,"arguments":JSON.stringify(args)
						,"returnByValue":retByVal
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},runtimeEvaluate:function(expression,objectGroup,retByVal) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"Runtime.evaluate"
					,"params":{
						"expression":expression
						,"objectGroup":objectGroup
						,"returnByValue":retByVal
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},runtimeGetProperties:function(objectId) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"Runtime.getProperties"
					,"params":{
						"objectId":objectId
						,"ownProperties":ownProperties
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},runtimeReleaseObject:function(objectId,ownProperties) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"Runtime.releaseObject"
					,"params":{
						"objectId":objectId
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
			},runtimeReleaseObjectGroup:function(objectGroup) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				var req = {
					"id":rId
					,"method":"Runtime.releaseObjectGroup"
					,"params":{
						"objectGroup":objectGroup
					}
				}
				rDebugApi.ws.send(JSON.stringify(req));
				return deferred.promise;
				
			/**** Timeline API ****/	
			},timelineStart:function(maxCallStackDepth) {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Timeline.start","params":{"maxCallStackDepth":'+maxCallStackDepth+'}}');
				return deferred.promise;
			},timelineEnd:function() {
				var deferred = Q.defer();
				var rId = rDebugApi.requestId++;
				rDebugApi.responses[rId] = deferred;
				rDebugApi.ws.send('{"id":'+rId+',"method": "Timeline.End"}');
				return deferred.promise;
			}
		}
		rDebugApi.ws = new WebSocket(wsUrl, {protocolVersion: 8, origin: 'http://localhost/'});
		rDebugApi.ws.on('message',function(mess) {
			var m;
			eval("m="+mess);
			if (rDebugApi.responses[m.id]) {
				if(m.error) {
					rDebugApi.responses[m.id].reject(m);
				} else {
					rDebugApi.responses[m.id].resolve(m.result);
				}
			} else {
				if (m.error) {
					console.log("error:"+err.error.code+" "+err.error.message);
				}
			}
		});		
		return rDebugApi;
	}
};

exports.rDebug = rDebug;