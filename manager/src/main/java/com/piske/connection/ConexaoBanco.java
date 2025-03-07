package com.piske.connection;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.swing.JOptionPane;

public class ConexaoBanco {

    private String urlDB = "jdbc:mysql://127.0.0.1:3306/eletroduto";
    private String root = "root";
    private String password = "";

    public Connection getConnection() {
        try {
            return DriverManager.getConnection(urlDB, root, password);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Erro na Conexão: " + e);
            return null;
        }
    }
}
