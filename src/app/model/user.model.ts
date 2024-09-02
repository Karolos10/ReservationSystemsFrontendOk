export interface User {
    names: string;
    lastName: string;
    phone: string;
    username: string;
    email: string;
    password: string;
}

export class DefaultUser implements User {
    names = '';
    lastName = '';
    phone = '';
    username = '';
    email = '';
    password = '';
}