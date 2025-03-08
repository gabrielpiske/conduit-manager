package com.piske;

import javax.swing.SwingUtilities;

import com.piske.view.TelaInicial;

public class Main {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(TelaInicial::new);
    }
}
