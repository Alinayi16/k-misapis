export interface allKdrama {
    kdrama: Kdrama[];
}

export interface Kdrama {
    _id?:                string;
    titulo:             string;
    genero:             string[];
    anoEstreno:         number;
    paisOrigen:         string;
    actoresPrincipales: string[];
    sinopsis:           string;
    
}
