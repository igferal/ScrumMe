export interface IAuthentication {

    signUp(email: string, password: string);

    login(email: string, password: string);

    logout();
    
    getUser(): any;

}