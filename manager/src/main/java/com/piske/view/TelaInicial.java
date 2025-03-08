package com.piske.view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class TelaInicial extends JFrame {

    private JLabel titulo;
    private JPanel painelImagem, painelBotoes, painelCentral;
    private JButton btnCadastroCabo, btnCadastroEletroduto, btnCalculo;
    private Image imagemFundo;

    public TelaInicial() {
        setTitle("Sistema de Gestão de Cabos e Eletrodutos");
        setSize(1280, 720);
        setMinimumSize(new Dimension(800, 600)); // responsividade
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        carregarImagem();

        // Painel da imagem
        painelImagem = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                if (imagemFundo != null) {
                    g.drawImage(imagemFundo, 0, 0, getWidth(), getHeight(), this);
                }
            }
        };
        painelImagem.setPreferredSize(new Dimension(1280, 200));
        add(painelImagem, BorderLayout.NORTH);

        // Título estilizado
        titulo = new JLabel("Gestão de Cabos e Eletrodutos", SwingConstants.CENTER);
        titulo.setFont(new Font("Arial", Font.BOLD, 30));
        titulo.setForeground(Color.WHITE);
        titulo.setOpaque(true);
        titulo.setBackground(new Color(0, 70, 140));
        titulo.setPreferredSize(new Dimension(getWidth(), 60));
        add(titulo, BorderLayout.CENTER);

        // Painel Central para os botões
        painelCentral = new JPanel(new BorderLayout());
        painelCentral.setBackground(Color.LIGHT_GRAY);
        painelCentral.setBorder(BorderFactory.createEmptyBorder(30, 50, 30, 50));

        // Painel de botões estilizado
        painelBotoes = new JPanel(new GridLayout(3, 1, 20, 20));
        painelBotoes.setBackground(Color.WHITE);
        painelBotoes.setBorder(BorderFactory.createEmptyBorder(30, 100, 30, 100));

        btnCadastroCabo = criarBotao("Cadastro de Cabos");
        btnCadastroEletroduto = criarBotao("Cadastro de Eletrodutos");
        btnCalculo = criarBotao("Cálculo de Capacidade");
        btnCadastroCabo.addActionListener(e -> new TelaCadastroCabo().setVisible(true));
        btnCadastroEletroduto.addActionListener(e -> new TelaCadastroEletroduto().setVisible(true));
        btnCalculo.addActionListener(e -> new TelaCalculo().setVisible(true));

        painelBotoes.add(btnCadastroCabo);
        painelBotoes.add(btnCadastroEletroduto);
        painelBotoes.add(btnCalculo);

        painelCentral.add(painelBotoes, BorderLayout.CENTER);
        add(painelCentral, BorderLayout.SOUTH);

        setVisible(true);
    }

    // Carregar a imagem
    private void carregarImagem() {
        try {
            File arquivoImagem = new File("manager/src/main/java/com/piske/view/img/senaiLogo.png");
            if (arquivoImagem.exists()) {
                Image original = ImageIO.read(arquivoImagem);
                imagemFundo = original.getScaledInstance(1280, 200, Image.SCALE_SMOOTH);
            } else {
                System.err.println("Imagem não encontrada!");
            }
        } catch (IOException e) {
            System.err.println("Erro ao carregar imagem: " + e.getMessage());
        }
    }

    // Criação de Botões
    private JButton criarBotao(String texto) {
        JButton botao = new JButton(texto);
        botao.setFont(new Font("Arial", Font.BOLD, 22));
        botao.setBackground(new Color(0, 120, 215));
        botao.setForeground(Color.WHITE);
        botao.setFocusPainted(false);
        botao.setPreferredSize(new Dimension(250, 60));
        botao.setBorder(BorderFactory.createRaisedBevelBorder());
        return botao;
    }
}
