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
    id?: string,
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
    id: string,
    to: string,
    from: string,
    date: number | string,
    time: string,
    price: string,
    seats: string,
    author: IUserProfile,
    authorId?: string,
}

export interface IUserProfile {
    id: string,
    fullName: string,
    carModel: string,
    carPicture: string,
    carRegNo: string,
    carSmoking: string | boolean,
    facebook: string,
    mobile: string,
    profilePicture: string,
}

export interface IUserManagement {
    id: string,
    fullName: string,
    isBlocked: boolean;
    isAdmin: boolean;
}