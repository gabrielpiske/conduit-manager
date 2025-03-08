package com.piske.model;

public class Eletroduto {

    private int id;
    private String nome;
    private String material;
    private double diametro;

    public Eletroduto(double diametro, int id, String material, String nome) {
        this.diametro = diametro;
        this.id = id;
        this.material = material;
        this.nome = nome;
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

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public double getDiametro() {
        return diametro;
    }

    public void setDiametro(double diametro) {
        this.diametro = diametro;
    }

}
