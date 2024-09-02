export interface JwtPayload {
    sub: string;
    roles: string[];
    idUser: number;
    username?: string;
    iat?: number;
    exp?: number;
}