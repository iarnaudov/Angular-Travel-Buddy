export interface IRegisterModel {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
}

export interface ILoginModel {
    email: string,
    password: string
}

export interface IErrorMessage {
    showError: boolean,
    errorMessage: string
}

export interface IDriverPost {
    driverId: string,
    from: string,
    to: string,
    date: number,
    time: string,
    price: string,
    seats: string,
}

export interface IPassengerPost {
    passengerId: string,
    from: string,
    to: string,
    date: number,
    time: string,
}