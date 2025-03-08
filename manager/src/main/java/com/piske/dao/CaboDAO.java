package com.piske.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JOptionPane;

import com.piske.connection.ConexaoBanco;
import com.piske.model.Cabo;

public class CaboDAO {

    public void salvar(Cabo cabo) {
        String sql = "INSERT INTO cabo (nome, tipo, comprimento, quantidade_estoque, bitola, tensao_nominal)"
                + "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConexaoBanco.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cabo.getNome());
            stmt.setString(2, cabo.getTipo());
            stmt.setInt(3, cabo.getComprimento());
            stmt.setInt(4, cabo.getQuantidadeEstoque());
            stmt.setDouble(5, cabo.getBitola());
            stmt.setDouble(6, cabo.getTensaoNominal());
            stmt.execute();

        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Erro ao salvar o Cabo: " + e);
        }
    }

    public List<Cabo> listar() {
        List<Cabo> cabos = new ArrayList<>();
        String sql = "SELECT * FROM cabo";

        try (Connection conn = ConexaoBanco.getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Cabo cabo = new Cabo(
                        rs.getString("nome"),
                        rs.getString("tipo"),
                        rs.getInt("comprimento"),
                        rs.getInt("quantidade_estoque"),
                        rs.getDouble("bitola"),
                        rs.getDouble("tensao_nominal")
                );
                cabo.setId(rs.getInt("id"));
                cabos.add(cabo);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Erro ao Listar cabos: " + e);
        }
        return cabos;
    }
}
