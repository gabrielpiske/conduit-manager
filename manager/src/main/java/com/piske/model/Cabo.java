package com.piske.model;

public class Cabo {

    private int id;
    private String nome;
    private String tipo;
    private int comprimento;
    private int quantidadeEstoque;
    private double bitola;
    private double tensaoNominal;

    public Cabo(String nome, String tipo, int comprimento, int quantidadeEstoque, double bitola, double tensaoNominal) {
        this.nome = nome;
        this.tipo = tipo;
        this.comprimento = comprimento;
        this.quantidadeEstoque = quantidadeEstoque;
        this.bitola = bitola;
        this.tensaoNominal = tensaoNominal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getComprimento() {
        return comprimento;
    }

    public void setComprimento(int comprimento) {
        this.comprimento = comprimento;
    }

    public int getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(int quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public double getBitola() {
        return bitola;
    }

    public void setBitola(double bitola) {
        this.bitola = bitola;
    }

    public double getTensaoNominal() {
        return tensaoNominal;
    }

    public void setTensaoNominal(double tensaoNominal) {
        this.tensaoNominal = tensaoNominal;
    }
}
