export const eletrodutos = [
    { tipo: "Kanaflex", tamanhos: [
        { nome: "Kanaflex 1.1/4 30mm", area: Math.PI * Math.pow(31.5, 2) / 4 },
        { nome: "Kanaflex 1.1/2 40mm", area: Math.PI * Math.pow(43, 2) / 4 },
        { nome: "Kanaflex 2\" 50mm", area: Math.PI * Math.pow(50.8, 2) / 4 },
        { nome: "Kanaflex 3\" 75mm", area: Math.PI * Math.pow(75, 2) / 4 },
        { nome: "Kanaflex 4\" 100mm", area: Math.PI * Math.pow(103, 2) / 4 },
        { nome: "Kanaflex 5\" 125mm", area: Math.PI * Math.pow(128, 2) / 4 },
        { nome: "Kanaflex 6\" 150mm", area: Math.PI * Math.pow(155, 2) / 4 },
        { nome: "Kanaflex 7\" 175mm", area: Math.PI * Math.pow(176, 2) / 4 },
        { nome: "Kanaflex 8\" 200mm", area: Math.PI * Math.pow(205, 2) / 4 }
    ] },

    { tipo: "Corrugado", tamanhos: [
        { nome: "Corrugado 1/2 20mm", area: Math.PI * Math.pow(15.4, 2) / 4 },
        { nome: "Corrugado 3/4 25mm", area: Math.PI * Math.pow(19, 2) / 4 },
        { nome: "Corrugado 1\" 32mm", area: Math.PI * Math.pow(25, 2) / 4 }
    ] },

    { tipo: "Corrugado Reforçado", tamanhos: [
        { nome: "Corrugado 1/2 20mm", area: Math.PI * Math.pow(15.4, 2) / 4 },
        { nome: "Corrugado 3/4 25mm", area: Math.PI * Math.pow(19, 2) / 4 },
        { nome: "Corrugado 1\" 32mm", area: Math.PI * Math.pow(25, 2) / 4 }
    ] },

    { tipo: "PVC Rígido", tamanhos: [
        { nome: "PVC Rígido 1/2 20mm", area: Math.PI * Math.pow(16.4, 2) / 4 },
        { nome: "PVC Rígido 3/4 25mm", area: Math.PI * Math.pow(21.3, 2) / 4 },
        { nome: "PVC Rígido 1\" 32mm", area: Math.PI * Math.pow(27.5, 2) / 4 },
        { nome: "PVC Rígido 1.1/4 40mm", area: Math.PI * Math.pow(36.1, 2) / 4 },
        { nome: "PVC Rígido 1.1/2 50mm", area: Math.PI * Math.pow(41.4, 2) / 4 },
        { nome: "PVC Rígido 2\" 60mm", area: Math.PI * Math.pow(52.8, 2) / 4 },
        { nome: "PVC Rígido 2.1/2 75mm", area: Math.PI * Math.pow(67.1, 2) / 4 },
        { nome: "PVC Rígido 3\" 85mm", area: Math.PI * Math.pow(79.6, 2) / 4 },
        { nome: "PVC Rígido 4\" 110mm", area: Math.PI * Math.pow(103.1, 2) / 4 }
    ] }
];

export const fios = [
    {
        tipo: "PVC",
        tamanhos: [
            { nome: "Cabo 1,5mm²", area: 17 },
            { nome: "Cabo 2,5mm²", area: 21 },
            { nome: "Cabo 4mm²", area: 30 },
            { nome: "Cabo 6mm²", area: 38 },
            { nome: "Cabo 10mm²", area: 61 },
            { nome: "Cabo 16mm²", area: 78 },
            { nome: "Cabo 25mm²", area: 126 },
            { nome: "Cabo 35mm²", area: 162 }
        ]
    },

    { 
        tipo: "EPR/XLPE 1KV UNIFILAR", 
        tamanhos: [
            { nome: "Cabo 1,5mm²", area: Math.PI * Math.pow(4.78, 2) / 4 },
            { nome: "Cabo 2,5mm²", area: Math.PI * Math.pow(5.20, 2) / 4 },
            { nome: "Cabo 4mm²", area: Math.PI * Math.pow(5.75, 2) / 4 },
            { nome: "Cabo 6mm²", area: Math.PI * Math.pow(6.49, 2) / 4 },
            { nome: "Cabo 16mm²", area: Math.PI * Math.pow(8.20, 2) / 4 },
            { nome: "Cabo 25mm²", area: Math.PI * Math.pow(10, 2) / 4 },
            { nome: "Cabo 35mm²", area: Math.PI * Math.pow(5.75, 2) / 4 },
            { nome: "Cabo 50mm²", area: Math.PI * Math.pow(12.7, 2) / 4 },
            { nome: "Cabo 70mm²", area: Math.PI * Math.pow(14.2, 2) / 4 },
            { nome: "Cabo 95mm²", area: Math.PI * Math.pow(16.1, 2) / 4 },
            { nome: "Cabo 120mm²", area: Math.PI * Math.pow(17.7, 2) / 4 },
            { nome: "Cabo 240mm²", area: Math.PI * Math.pow(24.4, 2) / 4 },
            { nome: "Cabo 300mm²", area: Math.PI * Math.pow(27.3, 2) / 4 },
            { nome: "Cabo 400mm²", area: Math.PI * Math.pow(30.9, 2) / 4 },
            { nome: "Cabo 500mm²", area: Math.PI * Math.pow(34.6, 2) / 4 },
        ]
    },

    { 
        tipo: "EPR/XLPE 1KV MULTIFILAR 2 VIAS", 
        tamanhos: [
            { nome: "Cabo 1,5mm²", area: Math.PI * Math.pow(7.95, 2) / 4 },
            { nome: "Cabo 2,5mm²", area: Math.PI * Math.pow(8.79, 2) / 4 },
            { nome: "Cabo 4mm²", area: Math.PI * Math.pow(10.1, 2) / 4 },
            { nome: "Cabo 6mm²", area: Math.PI * Math.pow(11.2, 2) / 4 },
            { nome: "Cabo 10mm²", area: Math.PI * Math.pow(12.8, 2) / 4 }
        ]
    },

    { 
        tipo: "EPR/XLPE 1KV MULTIFILAR 3 VIAS", 
        tamanhos: [
            { nome: "Cabo 1,5mm²", area: Math.PI * Math.pow(8.43, 2) /4 },
            { nome: "Cabo 2,5mm²", area: Math.PI * Math.pow(9.53, 2) /4 },
            { nome: "Cabo 4mm²", area: Math.PI * Math.pow(10.7, 2) /4 },
            { nome: "Cabo 6mm²", area: Math.PI * Math.pow(11.9, 2) /4 },
            { nome: "Cabo 10mm²", area: Math.PI * Math.pow(13.6, 2) /4 },
            { nome: "Cabo 16mm²", area: Math.PI * Math.pow(16, 2) /4 },
            { nome: "Cabo 25mm²", area: Math.PI * Math.pow(19.6, 2) /4 },
            { nome: "Cabo 35mm²", area: Math.PI * Math.pow(22.4, 2) /4 },
            { nome: "Cabo 50mm²", area: Math.PI * Math.pow(25.6, 2) /4 },
            { nome: "Cabo 70mm²", area: Math.PI * Math.pow(29, 2) /4 },
            { nome: "Cabo 95mm²", area: Math.PI * Math.pow(32.9, 2) /4 },
            { nome: "Cabo 120mm²", area: Math.PI * Math.pow(38.8, 2) /4 },
            { nome: "Cabo 150mm²", area: Math.PI * Math.pow(42.2, 2) /4 },
            { nome: "Cabo 185mm²", area: Math.PI * Math.pow(47.1, 2) /4 },
            { nome: "Cabo 240mm²", area: Math.PI * Math.pow(53.4, 2) / 4}
        ]
    },

    {
        tipo: "EPR/XLPE 1KV MULTIFILAR 4 VIAS",
        tamanhos: [
            { nome: "Cabo 1.5mm²", area: Math.PI * Math.pow(9.4, 2) / 4},
            { nome: "Cabo 2.5mm²", area: Math.PI * Math.pow(10.4, 2) / 4},
            { nome: "Cabo 4mm²", area: Math.PI * Math.pow(11.8, 2) / 4},
            { nome: "Cabo 6mm²", area: Math.PI * Math.pow(13.3, 2) / 4},
            { nome: "Cabo 10mm²", area: Math.PI * Math.pow(15, 2) / 4},
            { nome: "Cabo 16mm²", area: Math.PI * Math.pow(17.6, 2) / 4},
            { nome: "Cabo 25mm²", area: Math.PI * Math.pow(22, 2) / 4},
            { nome: "Cabo 35mm²", area: Math.PI * Math.pow(24.9, 2) / 4},
            { nome: "Cabo 50mm²", area: Math.PI * Math.pow(28.5, 2) / 4},
            { nome: "Cabo 70mm²", area: Math.PI * Math.pow(32.3, 2) / 4},
            { nome: "Cabo 95mm²", area: Math.PI * Math.pow(36.6, 2) / 4},
            { nome: "Cabo 120mm²", area: Math.PI * Math.pow(43.1, 2) / 4},
            { nome: "Cabo 150mm²", area: Math.PI * Math.pow(46.9, 2) / 4},
            { nome: "Cabo 185mm²", area: Math.PI * Math.pow(52.4, 2) / 4},
            { nome: "Cabo 240mm²", area: Math.PI * Math.pow(59.3, 2) / 4}
        ]
    }
];