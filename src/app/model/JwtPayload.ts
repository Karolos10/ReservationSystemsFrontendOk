export interface JwtPayload {
    sub: string;
    roles: string[];
    idUser: number;
    iat?: number; 
    exp?: number;
}