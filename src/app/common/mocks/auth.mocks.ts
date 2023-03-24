export const SIGN_IN_MOCK = {
    success: [{
        accessToken: 'ACCESS',
        refreshToken: 'REFRESH',
        expiresIn: 600,
        refreshExpiresIn: 720
    }],
    failures: [{}]
};

export const REVOCATION_MOCK = {
    success: [{}],
    failures: [{
        code: 0,
        errorMessage: 'FAILURE'
    }],
};
