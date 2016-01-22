/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

/**
 *
 * @author Chad
 */
public class TreeMain
{
//    private  boolean sopen=true;
//    private  boolean expanded=false;
//    private  List<children> children;
    
    private  int id=0;
    private  int pId=0;
    private  String name="";
    

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getid() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public TreeMain()
    {
//        children=new ArrayList<>();
    }
}
