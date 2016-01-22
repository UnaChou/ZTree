/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package code;

import Mapping.Mapping;
import Model.*;
import com.google.gson.Gson;
import java.util.List;

/**
 *
 * @author Chad
 */
public class test {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        List<TreeMain> tmlist;
        tmlist = Mapping.TABLEMAPPING(TreeMain.class, "SELECT  `Name` AS name,s.ID AS id, `Parent` AS pId FROM  OpenSpecs.S s join OpenSpecs.Tree t on  s.ID=t.Parent");
//        tmlist.stream().forEach((tmlist1) -> {
//            List<children> clist;
//            clist = Mapping.TABLEMAPPING(children.class, "SELECT `Order` as title FROM OpenSpecs.Tree WHERE `Parent`=" + tmlist1.getM_Id());
//            tmlist1.setChildren(clist);
//        });
        Gson g = new Gson();
        System.out.println(g.toJson(tmlist));
    }

}
