package com.project.market.properties;

import java.io.*;
import java.util.Properties;

public class ReadTokenProperties {

    public static String getAccessToken() throws IOException {
        System.out.println(System.getProperty("user.dir"));
        InputStream input = new FileInputStream(System.getProperty("user.dir")
                + File.separator + "src"
                + File.separator + "main"
                + File.separator + "resources"
                + File.separator + "token.properties");
        Properties prop = new Properties();
        prop.load(input);
        return prop.getProperty("access.token.secret");
    }

    public static long getValidityTime() throws IOException {
        System.out.println(System.getProperty("user.dir"));
        InputStream input = new FileInputStream(System.getProperty("user.dir")
                + File.separator + "src"
                + File.separator + "main"
                + File.separator + "resources"
                + File.separator + "token.properties");
        Properties prop = new Properties();
        prop.load(input);
        return Long.parseLong(prop.getProperty("access.token.validity"));
    }

}
