package com.piske.connection;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.swing.JOptionPane;

public class ConexaoBanco {

    private static String URL = "jdbc:mysql://127.0.0.1:3306/eletroduto";
    private static String USER = "root";
    private static String PASSWORD = "12345";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Erro na Conexão: " + e);
            return null;
        }
    }
}
