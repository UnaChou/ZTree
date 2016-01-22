<%@ page contentType="text/html;"  pageEncoding="Big5" language="java" %>
<jsp:useBean id="jb" class="code.treemain" />
<%
   
    String json = jb.treevalue();  
    out.print(json);

%>