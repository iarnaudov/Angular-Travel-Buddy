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
    authorId: string,
    from: string,
    to: string,
    date: number,
    time: string,
    price: string,
    seats: string,
}

export interface IPassengerPost {
    authorId: string,
    from: string,
    to: string,
    date: number,
    time: string,
}

export interface IDriverPostCard {
    profilePicture: string,
    driverFullName: string,
    to: string,
    from: string,
    date: string,
    time: string,
}