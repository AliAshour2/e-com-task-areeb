export interface SignUpData {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

export interface User {
    name: string;
    email: string;
    role: string;
}

export interface SignUpResponse {
    message: string;
    user: User;
    token: string;

}