package config;

public class Config {
     
     public static String HIVE_IMPALA_DRIVER="com.mysql.jdbc.Driver";  //驅動程式
    
    //HIVE
    private static String YZU_HIVE_IP="192.168.0.103";             //IP
    private static String YZU_HIVE_PORT="3306";                   //port 
    public static String YZU_HIVE_USER="sian";                     //使用者名稱
    public static String YZU_HIVE_PW="MaxzZ-1011";           //密碼
    private static String YZU_HIVE_DATABASE="OpenSpecs";         //資料庫名稱
    public static String YZU_HIVE_CONECTION()
    {
        return "jdbc:mysql://"+YZU_HIVE_IP+":"+YZU_HIVE_PORT+"/"+YZU_HIVE_DATABASE+"?useUnicode=true&characterEncoding=utf-8";
    }
}
