package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JDBCLink {

    
    //HIVE
    public static Connection getConnection_YZU_HIVE() 
    {
        try
        {
            Class.forName(Config.HIVE_IMPALA_DRIVER);//載入驅動
            return DriverManager.getConnection(Config.YZU_HIVE_CONECTION(),Config.YZU_HIVE_USER, Config.YZU_HIVE_PW);//建立連線
        } 
        catch (ClassNotFoundException ex)//取得錯誤資訊
        {
            Logger.getLogger(JDBCLink.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        catch (SQLException ex)//取得錯誤資訊
        {
            Logger.getLogger(JDBCLink.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
}
