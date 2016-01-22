/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var setting = {
    edit: {
        enable: true,
        showRemoveBtn: true,
        showRenameBtn: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        onRightClick: OnRightClick,
        onDrop: myOnDrop,
        onRemove: onRemove,
				onRename: onRename
    }
};

function beforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    return targetNode ? targetNode.drop !== false : true;
}

function OnRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}

var addCount = 1;
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type == "root") {
        $("#m_del").hide();
    } else {
        $("#m_del").show();
    }
    rMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"});

    $("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
    if (rMenu)
        rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility": "hidden"});
    }
}

function addTreeNode() {
    hideRMenu();
    var newNode = {name: "增加" + (addCount++)};
    if (zTree.getSelectedNodes()[0]) {
        newNode.checked = zTree.getSelectedNodes()[0].checked;
        zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
    } else {
        zTree.addNodes(null, newNode);
    }
}
function removeTreeNode() {
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "是否確認將連同的子節點一起删掉?";
            if (confirm(msg) == true) {              
                zTree.removeNode(nodes[0]);
            }
        } else {
            zTree.removeNode(nodes[0]);
        }
    }
}

var zTree, rMenu;
$(document).ready(function () {
//----------------get data----------------------
    //InitialData();
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    $.fn.zTree.init($("#treeDemo2"), setting, zNodes2);

    setCheck();
    $("#copy").bind("change", setCheck);
    $("#move").bind("change", setCheck);
    $("#prev").bind("change", setCheck);
    $("#inner").bind("change", setCheck);
    $("#next").bind("change", setCheck);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
     zTree2 = $.fn.zTree.getZTreeObj("treeDemo2");
    rMenu = $("#rMenu");
});

function setCheck() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            isCopy = $("#copy").attr("checked"),
            isMove = $("#move").attr("checked"),
            prev = $("#prev").attr("checked"),
            inner = $("#inner").attr("checked"),
            next = $("#next").attr("checked");
    //zTree.setting.edit.drag.isCopy = isCopy;
//    zTree.setting.edit.drag.isMove = isMove;
    showCode(1, ['setting.edit.drag.isCopy = ' + isCopy, 'setting.edit.drag.isMove = ' + isMove]);

    zTree.setting.edit.drag.prev = prev;
    zTree.setting.edit.drag.inner = inner;
    zTree.setting.edit.drag.next = next;
    showCode(2, ['setting.edit.drag.prev = ' + prev, 'setting.edit.drag.inner = ' + inner, 'setting.edit.drag.next = ' + next]);
}
function showCode(id, str) {
    var code = $("#code" + id);
    code.empty();
    for (var i = 0, l = str.length; i < l; i++) {
        code.append("<li>" + str[i] + "</li>");
    }
}

function InitialData() {
    $.ajax({
        type: "POST",
        url: "datajsp/treemain.jsp",
        cache: false,
        success: function (response) {
            $("#treedata").val(response);
            var ChartJSON = $.parseJSON($("#treedata").val());
            if (ChartJSON != null) {               
                $.fn.zTree.init($("#treeDemo"), setting, ChartJSON);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("error");
        }
    });
}

var zNodes = [
    {id: 1, pId: 0, name: "随意拖拽 1", open: true},
    {id: 11, pId: 1, name: "随意拖拽 1-1"},
    {id: 12, pId: 1, name: "随意拖拽 1-2", open: true},
    {id: 121, pId: 12, name: "随意拖拽 1-2-1"},
    {id: 122, pId: 12, name: "随意拖拽 1-2-2"},
    {id: 123, pId: 12, name: "随意拖拽 1-2-3"},
    {id: 13, pId: 1, name: "禁止拖拽 1-3", open: true, drag: false},
    {id: 131, pId: 13, name: "禁止拖拽 1-3-1", drag: false},
    {id: 132, pId: 13, name: "禁止拖拽 1-3-2", drag: false},
    {id: 133, pId: 13, name: "随意拖拽 1-3-3"},
    {id: 2, pId: 0, name: "随意拖拽 2", open: true},
    {id: 21, pId: 2, name: "随意拖拽 2-1"},
    {id: 22, pId: 2, name: "禁止拖拽到我身上 2-2", open: true, drop: false},
    {id: 221, pId: 22, name: "随意拖拽 2-2-1"},
    {id: 222, pId: 22, name: "随意拖拽 2-2-2"},
    {id: 223, pId: 22, name: "随意拖拽 2-2-3"},
    {id: 23, pId: 2, name: "随意拖拽 2-3"}
];

var zNodes2 = [
//    {id: 1, pId: 0, name: "父节点 1", open: true},
//    {id: 11, pId: 1, name: "叶子节点 1-1"},
//    {id: 12, pId: 1, name: "叶子节点 1-2"},
//    {id: 13, pId: 1, name: "叶子节点 1-3"},
//    {id: 2, pId: 0, name: "父节点 2", open: true},
//    {id: 21, pId: 2, name: "叶子节点 2-1"},
//    {id: 22, pId: 2, name: "叶子节点 2-2"},
//    {id: 23, pId: 2, name: "叶子节点 2-3"},
//    {id: 3, pId: 0, name: "父节点 3", open: true},
//    {id: 31, pId: 3, name: "叶子节点 3-1"},
//    {id: 32, pId: 3, name: "叶子节点 3-2"},
//    {id: 33, pId: 3, name: "叶子节点 3-3"}
];

function myOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    
    var itemNode = targetNode;		  
    console.log(JSON.stringify(targetNode));
//		    while (itemNode.children !== null) {
//		        console.log("id:" + itemNode.tId + " ; pid:" + itemNode.parentTId);	
//                        itemNode = JSON.parse(JSON.stringify(itemNode.children[0]));
//		    }	
                    
//    alert("tid:" + treeId + ",treeNodes:" + treeNodes.tId + (targetNode ? (targetNode.tId + ", " + targetNode.name) : "isRoot"));
}
;

function fontCss(treeNode) {
			var aObj = $("#" + treeNode.tId + "_a");
			aObj.removeClass("copy").removeClass("cut");
			if (treeNode === curSrcNode) {
				if (curType == "copy") {
					aObj.addClass(curType);
				} else {
					aObj.addClass(curType);
				}			
			}
		}

var curSrcNode, curType;
		function setCurSrcNode(treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                       
			if (curSrcNode) {
				delete curSrcNode.isCur;
				var tmpNode = curSrcNode;
				curSrcNode = null;
				fontCss(tmpNode);
			}
			curSrcNode = treeNode;
			if (!treeNode) return;

			curSrcNode.isCur = true;
                        
                  
			zTree.cancelSelectedNode();
                      
			fontCss(curSrcNode);
                        hideRMenu();
		}
                
function copy(e) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getSelectedNodes();
			 if (nodes.length == 0) {
				alert("Please select one node at first...");
				return;
                            }
			curType = "copy";
			setCurSrcNode(nodes[0]);
		}
		function cut(e) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			nodes = zTree.getSelectedNodes();
                  if (nodes.length == 0) {
				alert("Please select one node at first...");
				return;
                            }
			curType = "cut";
			setCurSrcNode(nodes[0]);
		}
		function paste(e) {
			if (!curSrcNode) {
				alert("Please select one node to copy or cut at first...");
				return;
			}
                        
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                                   zTree2 = $.fn.zTree.getZTreeObj("treeDemo2");
                     
			var nodes = zTree.getSelectedNodes();		
                     
              
               var targetNode = nodes.length>0? nodes[0]:null;
                
			if (curSrcNode === targetNode) {
				alert("Can't move, the same source node and destination node.");
				return;
			} else if (curType === "cut" && ((!!targetNode && curSrcNode.parentTId === targetNode.tId) || (!targetNode && !curSrcNode.parentTId))) {
				alert("Can't move, source node is the target node's child.");
				return;
			} else if (curType === "copy") {
                            targetNode = zTree.copyNode(targetNode, curSrcNode, "inner");                          
			} else if (curType === "cut") {
				targetNode = zTree.moveNode(targetNode, curSrcNode, "inner");                           
				if (!targetNode) {
					alert("Cutting failure, source node is the target node's parent.");
				}
				targetNode = curSrcNode;
			}
			setCurSrcNode();
			delete targetNode.isCur;
                        
                        zTree.selectNode(targetNode);
                    
		}

	function onRemove(e, treeId, treeNode) {
            console.log(JSON.stringify(treeNode));			
		}
                
	function onRename(e, treeId, treeNode, isCancel) {
            console.log(JSON.stringify(treeNode));			
		}