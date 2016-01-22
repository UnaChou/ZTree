package Mapping;

import com.google.gson.Gson;
import config.JDBCLink;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

public class Mapping {

    public static <T> ArrayList<T> TABLEMAPPING(Class<T> _class, String SQL) {
        try
        {
            //建立資料庫連線
            Connection con = JDBCLink.getConnection_YZU_HIVE();
            Statement stmt = con.createStatement();
            
            //執行SQL語法
            ResultSet rs = stmt.executeQuery(SQL);
            
            //取得回傳欄位資訊
            ResultSetMetaData rsmd = rs.getMetaData();
            
            //建立一個List物件
            ArrayList<T> listOfT = new ArrayList<T>();
            while (rs.next()) 
            {
                //建立JSON物件
                JSONObject mJSONObject = new JSONObject();
                
                for (int i = 1; i <= rsmd.getColumnCount(); i++) 
                {
                    //欄位名稱當KeyValue,欄位資料PUT進Json物件
                    mJSONObject.put(rsmd.getColumnLabel(i), rs.getString(i));
                }
                
                //利用GOSN 直接將JOSN物件綁入Model
                listOfT.add(new Gson().fromJson(mJSONObject.toString(), _class));
                
                //清空JSON物件
                mJSONObject = null;
            }
            rs.close();
            con.close();
            return listOfT;
        } 
        catch (SQLException | JSONException ex)
        {
            Logger.getLogger(Mapping.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
}
