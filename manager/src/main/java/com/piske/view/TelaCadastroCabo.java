package com.piske.view;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

import com.piske.dao.CaboDAO;
import com.piske.model.Cabo;

public class TelaCadastroCabo extends JFrame {

    private JTextField txtNome, txtTipo, txtComprimento, txtBitola, txtTensao, txtQuantidade;
    private JButton btnSalvar;

    public TelaCadastroCabo() {
        setTitle("Cadastro de Cabos");
        setSize(400, 300);
        setLayout(null);
        setLocationRelativeTo(null);

        JLabel lblNome = new JLabel("Nome:");
        lblNome.setBounds(20, 20, 100, 20);
        add(lblNome);

        txtNome = new JTextField();
        txtNome.setBounds(130, 20, 200, 20);
        add(txtNome);

        JLabel lblTipo = new JLabel("Tipo:");
        lblTipo.setBounds(20, 50, 100, 20);
        add(lblTipo);

        txtTipo = new JTextField();
        txtTipo.setBounds(130, 50, 200, 20);
        add(txtTipo);

        JLabel lblComprimento = new JLabel("Comprimento:");
        lblComprimento.setBounds(20, 80, 100, 20);
        add(lblComprimento);

        txtComprimento = new JTextField();
        txtComprimento.setBounds(130, 80, 200, 20);
        add(txtComprimento);

        JLabel lblBitola = new JLabel("Bitola:");
        lblBitola.setBounds(20, 110, 100, 20);
        add(lblBitola);

        txtBitola = new JTextField();
        txtBitola.setBounds(130, 110, 200, 20);
        add(txtBitola);

        JLabel lblTensao = new JLabel("Tensão Nominal:");
        lblTensao.setBounds(20, 140, 100, 20);
        add(lblTensao);

        txtTensao = new JTextField();
        txtTensao.setBounds(130, 140, 200, 20);
        add(txtTensao);

        JLabel lblQuantidade = new JLabel("Quantidade:");
        lblQuantidade.setBounds(20, 170, 100, 20);
        add(lblQuantidade);

        txtQuantidade = new JTextField();
        txtQuantidade.setBounds(130, 170, 200, 20);
        add(txtQuantidade);

        btnSalvar = new JButton("Salvar");
        btnSalvar.setBounds(130, 210, 100, 30);
        add(btnSalvar);

        btnSalvar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                CaboDAO dao = new CaboDAO();
                Cabo cabo = new Cabo(
                        txtNome.getText(),
                        txtTipo.getText(),
                        Integer.parseInt(txtComprimento.getText()),
                        Integer.parseInt(txtQuantidade.getText()),
                        Double.parseDouble(txtBitola.getText()),
                        Double.parseDouble(txtTensao.getText())
                );
                dao.salvar(cabo);
                JOptionPane.showMessageDialog(null, "Cabo cadastrado com sucesso!");
            }
        });
    }
}
