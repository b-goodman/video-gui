interface AuthTokenResponse {
    token: string;
    status: number,
    result: {
        _id: string,
        name: string,
        password: string,
        __v: number
    }
}

export default AuthTokenResponse;
