export interface IMusic{
    nome: string;
    autor: string;
}

export interface IPlaylist {
    id: any;
    icone: string
    titulo: string;
    descricao: string;
    musicas: IMusic[]
}